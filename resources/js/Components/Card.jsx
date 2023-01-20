import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import {
    IoBookOutline,
    IoReaderOutline,
    IoPersonOutline,
    IoBookmark,
} from "react-icons/io5";

export default function Card({ title, likes, chapter, category, imgSrc }) {
    const [isLiked, setIsLiked] = useState(false);

    const toggleLiked = () => {
        setIsLiked(!isLiked);
    };

    return (
        <div className="mt-6 mb-6 bg-gray-300 mx-auto w-full rounded-xl shadow-xl hover:scale-[1.025] transition duration-500 ">
            <div
                className={`w-full rounded-t-xl shadow-xl h-36 bg-[url('${imgSrc}')]  bg-cover relative flex items-center before:absolute before:bg-[rgba(0,0,0,0.7)] before:top-0 before:right-0 before:bottom-0 before:left-0 before:rounded-t-xl`}
            >
                <IoBookmark
                    size={40}
                    className={` absolute top-1 right-1 stroke-[20px] stroke-white fill-transparent ${
                        isLiked ? "fill-indigo-700" : "fill-transparent"
                    }`}
                    onClick={toggleLiked}
                />

                <h3 className="text-white text-xl font-bold z-10 px-6 mr-[10%] max-h-fit">
                    {title}
                </h3>
            </div>
            <div className="mb-4 mt-8 space-y-6 px-6">
                <div className="flex space-x-3 items-center ">
                    <span>
                        <IoReaderOutline size={24} color="rgb(67 56 202)" />
                    </span>

                    <p>{category}</p>
                </div>
                <div className="flex space-x-3 items-center">
                    <span>
                        <IoBookOutline size={24} color="rgb(67 56 202)" />
                    </span>
                    <p>{chapter}</p>
                </div>
                <div className="flex space-x-3 items-center">
                    <span>
                        <IoPersonOutline size={24} color="rgb(67 56 202)" />
                    </span>
                    <p>{likes}</p>
                </div>
            </div>
            <div className="flex justify-center">
                <PrimaryButton className="w-3/4 my-4">See more</PrimaryButton>
            </div>
        </div>
    );
}
