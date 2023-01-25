import ChapterListItem from "@/Components/ChapterListItem";
import Dropdown from "@/Components/Dropdown";
import FollowButton from "@/Components/FollowButton";
import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { IoBookmark, IoSettingsOutline } from "react-icons/io5";

export default function Course({ auth, course, chapters }) {
    const [isLiked, setIsLiked] = useState(false);
    const toggleLiked = () => {
        setIsLiked(!isLiked);
    };
    return (
        <General auth={auth}>
            <Head title={`${course.title}`} />
            {/* <p>{course.status}</p> */}
            <div className="min-h-[calc(100vh-125px)]">
                <div className="p-5 md:p-10">
                    <div className="absolute right-10">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="hover:text-indigo-700 transition ease-in-out duration-150"
                                >
                                    <IoSettingsOutline size={32} />
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content width="40">
                                <Dropdown.Link>Edit</Dropdown.Link>
                                <Dropdown.Link>Delete</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <div>
                        <h2 className="capitalize text-2xl pt-5 pb-5 text-center font-bold">
                            {course.title}
                        </h2>
                        {/* <img
                        src={
                            "http://127.0.0.1:5174/resources/images/" +
                            course.preview_image
                        }
                        alt={course.preview_image}
                        className="mx-auto"
                    ></img> */}
                        <p className="capitalize px-3 py-1 mb-5 bg-gray-500 text-gray-100 w-fit rounded-full mx-auto">
                            {course.category.split("_").join(" ")}
                        </p>
                        <p className="text-center">{course.description}</p>
                        <FollowButton onClick={toggleLiked} isLiked={isLiked} />
                    </div>
                </div>
                <div className="mb-5">
                    <h3 className="underline text-xl text-center">
                        {chapters.length > 0 ? "" : "No chapter"}
                    </h3>
                    <div>
                        <ol className="mx-auto w-10/12 lg:w-3/5 xl:w-1/2">
                            {chapters.map((chapter, key) => (
                                <li key={key}>
                                    <a
                                        href={
                                            "/courses/" +
                                            course.formatted_title +
                                            "/" +
                                            chapter.formatted_title
                                        }
                                        className="cursor-default"
                                    >
                                        <ChapterListItem
                                            title={chapter.title}
                                            description={chapter.description}
                                            id={chapter.id}
                                        />
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </General>
    );
}
