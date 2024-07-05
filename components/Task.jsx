export default function Task({ message, submitted }) {
  const notSubmittedClass = "bg-red-400 text-red-800";
  const submittedClass = "bg-green-300 text-green-900";

  return (
    <div className="bg-slate-100 cursor-pointer h-40 p-4 flex flex-col justify-center items-start rounded-lg shadow-md hover:shadow-lg transition-all">
      <h2 className="text-gray-800 text-xl font-bold mb-2">{message}</h2>
      <span className={`text-sm`}>
        <strong>Expire:</strong> Date10-July-2024
      </span>
      <span
        className={`${
          submitted ? submittedClass : notSubmittedClass
        } mt-2 px-2 py-1 rounded-full text-[10px]`}
      >
        {submitted ? "Submitted" : "Not Submitted"}
      </span>
    </div>
  );
}
