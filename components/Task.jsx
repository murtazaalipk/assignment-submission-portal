export default function Task({ message, date, deadline, title }) {
    return (
        <div className="bg-blue-200 w-64 h-40 p-4 flex flex-col justify-center items-start rounded-lg shadow-lg">
            <h2 className="text-gray-800 text-xl font-bold mb-2">{message}</h2>
            <h4 className="text-gray-700 text-md mb-1">Assignment Title: {title}</h4>
            <h4 className="text-gray-600 text-sm mb-1">Posted On: {date}</h4>
            <h4 className="text-gray-600 text-sm">Deadline: {deadline}</h4>
        </div>
    );
}
