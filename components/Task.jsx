export default function Task({ message }) {
    return (
        <div className="bg-blue-200 w-64 h-32 flex justify-center items-center">
            {console.log(message)}
            <h2 className="text-gray-800 text-lg font-semibold">{message}</h2>
        </div>
    );
}
