import PrimaryButton from "./PrimaryButton";
import {
    IoBookOutline,
    IoReaderOutline,
    IoPersonOutline,
} from "react-icons/io5";

export default function Card({ title, author, chapter, category, imgSrc }) {
    return (
        <div className="mt-6 mb-16 bg-gray-300 mx-auto max-w-sm rounded-xl shadow-xl hover:scale-[1.025] transition duration-500 cursor-grab active:cursor-grabbing">
            <div
                className={`w-full rounded-t-xl shadow-xl h-36  bg-[url('${imgSrc}')] bg-cover relative flex items-center before:absolute before:bg-[rgba(0,0,0,0.7)] before:top-0 before:right-0 before:bottom-0 before:left-0 before:rounded-t-xl`}
            >
                <h3 className="text-white text-xl font-bold z-10 px-6">
                    {title}
                </h3>
            </div>
            <div className="mb-4 mt-8 space-y-6 px-6">
                <div className="flex space-x-3 items-center ">
                    <span>
                        <IoReaderOutline size={24} color="rgb(67 56 202)" />
                    </span>
                    {/* Change icon for each category */}
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
                    <p>{author}</p>
                </div>
            </div>
            <div className="flex justify-center">
                <PrimaryButton className="w-3/4 my-4">See more</PrimaryButton>
            </div>
        </div>
    );
}
