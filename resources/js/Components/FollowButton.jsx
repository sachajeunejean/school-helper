import React from "react";
import { IoBookmark } from "react-icons/io5";

export default function FollowButton({ onClick, isLiked }) {
    return (
        <div
            onClick={onClick}
            className="w-9/12 max-w-xs mx-auto  flex items-center justify-center space-x-4 mt-7 py-2 cursor-pointer bg-indigo-700 text-white rounded-md shadow-lg hover:bg-indigo-800 hover:ring-2 hover:ring-offset-2 hover:ring-indigo-700  transition-all"
        >
            <IoBookmark
                size={20}
                className={`top-1 right-1 stroke-[20px] stroke-white fill-transparent ${
                    isLiked ? "fill-yellow-400" : "fill-transparent"
                }`}
            />
            <p>Follow</p>
        </div>
    );
}
