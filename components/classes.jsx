export default function Classes({title,days,batch,timings}) {
    return (
        <div className="bg-blue-200 w-64 h-40 p-4 flex flex-col justify-center items-center rounded-lg shadow-lg">
            <h2 className="text-gray-800 text-xl font-bold mb-2">{title}</h2>
            <h4 className="text-gray-700 text-md mb-1">Days: {days}</h4>
            <h4 className="text-gray-700 text-md mb-1">Timings: {timings}</h4>
            <h5 className="text-gray-600 text-sm mb-1">Batch No: {batch}</h5>
            <h5 className="text-gray-600 text-sm">Created At: 19-Jan-2024</h5>
        </div>
    );
}
