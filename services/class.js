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
      days,
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

// updated Work for Student and Teacher Both

export const getClass = async ({ email }) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If the user does not exist, throw an error
    if (!user) {
      throw new Error("User doesn't exist with this email");
    }

    // console.log('User found:', user);

    let classes;

    if (user.role === "teacher") {
      // If the user is a teacher, find the classes where they are the teacher
      classes = await Class.find({ teacher: user._id });

      //console.log('Classes found for teacher:', classes);
    } else if (user.role === "student") {
      // If the user is a student, find the classes where they are in the 'students' array
      classes = await Class.find({ students: user._id });

      //console.log('Classes found for student:', classes);
    } else {
      throw new Error("Invalid user role");
    }

    // Return the list of classes
    return classes;
  } catch (error) {
    // Log and throw the error to be caught and handled by the caller
    console.error("Error:", error);
    throw error;
  }
  
};


/**
 * Retrieves all classes with their IDs, titles, batches, and teacher names.
 *
 * @returns {Promise<Array>} The list of all classes with teacher names.
 */
export const getAllClasses = async () => {
  try {
    // Fetch all classes
    const classes = await Class.find().populate('teacher', 'name'); // Populate teacher with only the name field
    return classes.map(cls => ({
      id: cls._id,
      name: cls.title,
      batch: cls.batch,
      teacherName: cls.teacher.name 
    }));
  } catch (error) {
    throw new Error('Error fetching classes');
  }
};