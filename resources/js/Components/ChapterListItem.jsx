import React from "react";

export default function ChapterListItem({ title, description, number }) {
    let newNumber;
    if (number < 10) {
        newNumber = "0" + number;
    } else {
        newNumber = number;
    }

    return (
        <div className="flex justify-start items-center mt-10 bg-[#f3f4f6] rounded-xl shadow-[-20px_20px_60px_#cfcfd1,20px_-20px_60px_#ffff] p-3 hover:bg-gray-300  transition-all">
            <p className="text-xl text-gray-800 bg-transparent border-2 border-gray-500 rounded-full px-4 py-3 lg:ml-5">
                {newNumber}
            </p>
            <div className="h-12 bg-gray-500 w-px mx-5 lg:ml-10"></div>
            <div className="flex flex-col gap-1 lg:gap-3">
                <h4 className="text-gray-800 text-md sm:text-lg font-bold cursor-pointer hover:underline hover:underline-offset-4">
                    {title}
                </h4>
                <p className="text-gray-600 text-sm line-clamp-2">
                    {description}
                </p>
            </div>
        </div>
    );
}
