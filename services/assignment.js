import Class from "../models/classes";
import Assignment from "../models/assignments";
import User from "../models/user";

/**
 * 
 * Creates a new assignment document in the database.
 * @param {mongoose.Types.ObjectId} params.classId - The ID of the class the assignment belongs to.
 * @param {string} title - The title of the assignment.
 * @param {string} description - The description or instructions for the assignment.
 * @param {Date} dueDate - The due date of the assignment.
 * @param {string} teacherEmail - The email of the teacher who created the assignment.
 * @throws {Error} - If there's an error while saving the assignment.
 */
export const createAssignment = async ({ classId, title, description, dueDate }) => {
  try {
    const newAssignment = new Assignment({
      title,
      description,
      dueDate,
      classId,
    });

    const assignment = await newAssignment.save();

    const existingClass = await Class.findByIdAndUpdate(
      classId,
      { $push: { assignments: assignment._id } },
      { new: true }
    );

    if (!existingClass) {
      throw new Error("Class not found");
    }

    for (const studentId of existingClass.students) {
      await User.findByIdAndUpdate(
        studentId,
        { $push: { assignments: assignment._id } }
      );
    }

    return assignment;
  } catch (error) {
    throw new Error(`Failed to create assignment: ${error.message}`);
  }
};

/**
 * Retrieves assignments from the database for a specific teacher.
 * @param {string} teacherEmail - The email of the teacher whose assignments are to be retrieved.
 * @returns {Array} - An array of assignment documents.
 * @throws {Error} - If there's an error while fetching the assignments.
 */
export const getAssignments = async ({ classId }) => {
  try {
    //finding assignments of specific class using class Id
    const existingClass = await Class.findById(classId).populate('assignments');

    if (!existingClass) {
      throw new Error("Class not found");
    }

    // Return the fetched assignments
    return existingClass.assignments;
  } catch (error) {
    // Throw the error to be caught and handled by the caller
    throw error;
  }
};
