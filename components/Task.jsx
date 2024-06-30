export default function Task({ message }) {
    return (
        <div className="bg-blue-200 w-64 h-40 p-4 flex flex-col justify-center items-start rounded-lg shadow-lg">
            <h2 className="text-gray-800 text-xl font-bold mb-2">{message}</h2>
        </div>
    );
}
