import User from '../models/user'; // Update the path as needed
import Class from '../models/classes'; // Update the path as needed

/**
 * Adds a student to a class by CNIC and classId.
 * @param {string} params.cnic - CNIC (or any identifier) of the student.
 * @param {string} params.classId - ID of the class to add the student to.
 * @returns {Object} An object indicating the result of the operation.
 * @throws {Error} If the user or class is not found, or if there's an error updating the database.
 */
export const addStudent = async ({ cnic, classId }) => {
    try {
        // Step 1: Find the user by CNIC
        const user = await User.findOne({ cnic });
        if (!user) {
            throw new Error('User not found');
        }

        // Step 2: Add classId to the user's courses array if not already present
        if (!user.courses.includes(classId)) {
            user.courses.push(classId);
            await user.save();
        }

        // Step 3: Find the class by classId
        const classToUpdate = await Class.findById(classId);
        if (!classToUpdate) {
            throw new Error('Class not found');
        }

        // Step 4: Add the user's ID to the class's students array if not already present
        if (!classToUpdate.students.includes(user._id)) {
            classToUpdate.students.push(user._id);
            await classToUpdate.save();
        }

        return { message: 'Student added to class successfully' };
    } catch (error) {
        throw error;
    }
};
