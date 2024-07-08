import Assignment from '../models/assignments';

/**
 * Creates a new assignment document in the database.
 * @param {string} title - The title of the assignment.
 * @param {string} description - The description or instructions for the assignment.
 * @param {Date} dueDate - The due date of the assignment.
 * @throws {Error} - If there's an error while saving the assignment.
 */
export const createAssignment = async ({title, description, dueDate , teacherEmail}) => {
  try {
    // Create a new instance of the Assignment model with the provided data
    const newAssignment = new Assignment({
      title,
      description,
      dueDate,
      teacherEmail
    });

    // Save the new assignment to the database and await the operation
    const assignment = await newAssignment.save();
    
    // Return the saved assignment object
    return assignment;
  } catch (error) {
    // Throw the error to be caught and handled by the caller
    throw error;
  }
};
