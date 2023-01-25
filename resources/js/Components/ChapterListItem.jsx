import React from "react";

export default function ChapterListItem({ title, description, id }) {
    return (
        <div className="flex justify-start items-center mt-5 bg-indigo-700 rounded-xl shadow-lg p-3 hover:bg-indigo-800 hover:ring-2 hover:ring-offset-2 hover:ring-indigo-700  transition-all">
            <p className="text-xl text-white bg-transparent border-2 border-indigo-200 rounded-full px-4 py-2 lg:ml-5">
                {id}
            </p>
            <div className="h-12 bg-white w-px mx-5 lg:ml-10"></div>
            <div className="flex flex-col gap-1 lg:gap-3">
                <h4 className="text-white text-md sm:text-lg font-bold cursor-pointer hover:underline hover:underline-offset-4">
                    {title}
                </h4>
                <p className="text-white text-sm line-clamp-2">{description}</p>
            </div>
        </div>
    );
}
