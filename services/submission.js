import Submission from "../models/submission";
import Assignment from "../models/assignments";

/**
 * Submits an assignment by creating a submission record and updating the submitted array of the assignment.
 * @param {Object} params - Parameters for submitting an assignment.
 * @param {string} params.assignment_id - The ID of the assignment to submit.
 * @param {string} params.student_id - The ID of the student submitting the assignment.
 * @param {string} params.url - The URL of the submitted assignment..
 * @throws {Error} - If there's an error while saving the submission or updating the assignment.
 */

export async function submitAssignment({ assignment_id, student_id, url }) {
  try {
    // Creating an instance of the submission model with the provided data
    const submitAssignment = new Submission({
      assignment: assignment_id,
      student: student_id,
      urlSubmission: url,
      grade: 0,
      feedback: null
    });

    // Save the submission to the database and await the operation
    const submitted = await submitAssignment.save();

    // Adding the student ID to the submitted array of the assignment
    await Assignment.findByIdAndUpdate(
      assignment_id,
      { $push: { submitted: student_id } },
      { new: true, useFindAndModify: false }
    );

    // Return the saved submission object if needed
    return submitted;
  } catch (error) {
    // Throw the error to be caught and handled by the caller
    throw error;
  }
}
