import Class from "../models/classes";
import Assignment from "../models/assignments";

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
export const createAssignment = async ({
  classId,
  title,
  description,
  dueDate,
  teacherEmail,
}) => {
  try {
    // Create a new instance of the Assignment model with the provided data
    const newAssignment = new Assignment({
      title,
      description,
      dueDate,
      teacherEmail,
    });

    // Save the new assignment to the database and await the operation
    const assignment = await newAssignment.save();

    // Find the existing class by ID and add the assignment reference to the assignments array
    const existingClass = await Class.findByIdAndUpdate(
      classId,
      { $push: { assignments: assignment._id } },
      { new: true }
    );

    // Check if the class was found and updated
    if (!existingClass) {
      throw new Error("Class not found");
    }

    // Return the saved assignment object
    return assignment;
  } catch (error) {
    // Throw the error to be caught and handled by the caller
    throw error;
  }
};

/**
 * Retrieves assignments from the database for a specific teacher.
 * @param {string} teacherEmail - The email of the teacher whose assignments are to be retrieved.
 * @returns {Array} - An array of assignment documents.
 * @throws {Error} - If there's an error while fetching the assignments.
 */
export const getAssignments = async ({ teacherEmail }) => {
  try {
    // Fetch assignments from the database where the teacherEmail matches the provided email
    const assignments = await Assignment.find({ teacherEmail });

    // Return the fetched assignments
    return assignments;
  } catch (error) {
    // Throw the error to be caught and handled by the caller
    throw error;
  }
};
