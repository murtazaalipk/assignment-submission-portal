export default function Cart({ title, batch, city, days, status }) {
  const completeClass = "bg-[#def1f7] text-blue-800 font-bold";
  const inProgressClass = "bg-green-200 text-green-800";
  return (
    <main className=" font-signika cursor-pointer w-[360px] p-4 flex flex-col justify-center items-start rounded-lg shadow-md hover:shadow-lg hover:bg-[#def1f7] transition-all">
      <h1 className=" font-[500] text-[16px] ">{title}</h1>
      <div className="flex gap-10 py-4 text-[16px]">
        <div className="flex flex-col">
          <div>
            {" "}
            Batch: <span className="text-[#959595]"> {batch}</span>
          </div>
          <div>
            {" "}
            Days: <span className="text-[#959595]"> {days}</span>
          </div>
        </div>
        <div className="flex flex-coll">
          <div>
            City:<span className="text-[#959595]"> {city}</span>
          </div>
        </div>
      </div>
      <div
        className={`${
          status ? completeClass : inProgressClass
        } mt-2 px-2 font-bold py-1 rounded-full text-[10px]`}
      >
        {status ? "Complete" : "InProgress"}
      </div>
    </main>
  );
}
