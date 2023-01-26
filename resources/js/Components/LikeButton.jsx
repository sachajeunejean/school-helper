import React from "react";
import { IoHeart } from "react-icons/io5";

export default function LikeButton({ onClick, isLiked }) {
    return (
        <div
            onClick={onClick}
            className="w-9/12 max-w-xs mx-auto  flex items-center justify-center space-x-4 mt-7 py-2 cursor-pointer bg-indigo-700 text-white rounded-md shadow-lg hover:bg-indigo-800 hover:ring-2 hover:ring-offset-2 hover:ring-indigo-700  transition-all"
        >
            <IoHeart
                size={20}
                className={`top-1 right-1 stroke-[20px] stroke-white  ${
                    isLiked ? "fill-red-700" : "fill-transparent"
                }`}
            />
            <p>Like</p>
        </div>
    );
}