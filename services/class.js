import Class from "../models/classes"; // Make sure this path points to your Class model

/**
 * Creates a new class document in the database.
 * 
 * @param {Object} params - The parameters for creating a new class.
 * @param {string} params.title - The title of the class.
 * @param {mongoose.Types.ObjectId} params.teacherId - The ID of the teacher for the class.
 * @param {number} params.batch - The batch number for the class.
 * @param {string} params.city - The city where the class is located.
 * @param {string} params.days - The days the class is held.
 * 
 * @returns {Promise<Object>} The newly created class object.
 * @throws {Error} If there's an error while saving the class.
 */
export const createClass = async ({ title, teacherId, batch, city, days }) => {
  try {
    // Creating a new instance of the Class model with the provided data
    const newClass = new Class({
      title,
      teacher: teacherId,
      batch,
      city,
      days
    });

    // Save the new class to the database and await the operation
    const new_class = await newClass.save();

    // Return the saved class object
    return new_class;
  } catch (error) {
    // Throw the error to be caught and handled by the caller
    throw error;
  }
};
