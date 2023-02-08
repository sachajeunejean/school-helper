import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import {
    IoBookOutline,
    IoReaderOutline,
    IoPersonOutline,
} from "react-icons/io5";
import Dropdown from "./Dropdown";

import { BiAlignLeft } from "react-icons/bi";

export default function Card({
    formatted_title,
    title,
    description,
    category,
    imgSrc,
    status,
}) {
    return (
        <div className="mt-6 mb-6 max-w-[400px] mx-5 shadow-xl hover:scale-[1.025] transition duration-500">
            <div
                className={`w-full shadow-xl h-36  bg-[url(${imgSrc})]  bg-cover relative flex items-center before:absolute before:bg-[rgba(0,0,0,0.7)] before:top-0 before:right-0 before:bottom-0 before:left-0`}
            >
                <h3 className="text-white text-xl font-bold z-10 px-6 mr-[10%] max-h-fit first-letter:capitalize line-clamp-4">
                    {title}
                </h3>
            </div>
            <div className="mb-4 mt-8 space-y-6 px-6 h-32">
                <div className="flex space-x-3 items-center ">
                    <span>
                        <IoReaderOutline size={24} color="rgb(67 56 202)" />
                    </span>

                    <p className="capitalize">{category}</p>
                </div>
                <div className="flex space-x-3 items-center">
                    <span>
                        <IoBookOutline size={24} color="rgb(67 56 202)" />
                    </span>
                    <p className="line-clamp-4">{description}</p>
                </div>
            </div>
            <div className="flex justify-center">
                <a href={`/courses/${formatted_title}`}>
                    <PrimaryButton className="w-full my-4">
                        See more
                    </PrimaryButton>
                </a>
            </div>
        </div>
    );
}
