import User from "../models/user";
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

/**
 * Retrieves all classes for a given teacher's email.
 * 
 * @param {Object} params - The parameters for retrieving classes.
 * @param {string} params.email - The email of the teacher whose classes are to be retrieved.
 * 
 * @returns {Promise<Array>} The list of classes for the teacher.
 * @throws {Error} If the teacher does not exist or there is an error during retrieval.
 */
export const getClass = async ({ email }) => {
  try {
    // Find the teacher by email
    const getTeacher = await User.findOne({ email });
    
    // If the teacher does not exist, throw an error
    if (!getTeacher) {
      throw new Error("Teacher doesn't exist with this email");
    }
    
    // Find the classes for the teacher by their ID
    const classes = await Class.find({ teacher: getTeacher._id });

    
    // Return the list of classes
    return classes;
  } catch (error) {
    // Throw the error to be caught and handled by the caller
    throw error;
  }
};
