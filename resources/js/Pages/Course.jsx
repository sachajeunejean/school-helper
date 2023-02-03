import ChapterListItem from "@/Components/ChapterListItem";
import CommentSection from "@/Components/CommentSection";
import Dropdown from "@/Components/Dropdown";
import FollowButton from "@/Components/FollowButton";
import LikeButton from "@/Components/LikeButton";
import General from "@/Layouts/GeneralLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { IoBookmark, IoSettingsOutline } from "react-icons/io5";

export default function Course({
    auth,
    course,
    chapters,
    sessionUser,
    isLiked,
    likes,
    isFollowed
}) {

    const onDelete = (e) => {
        e.preventDefault();

        router.delete("/courses/" + course.formatted_title + "/" + "delete");
    };

    return (
        <General auth={auth}>
            <Head title={`${course.title}`} />
            {/* <p>{course.status}</p> */}
            <div className="min-h-[calc(100vh-128px)]">
                <div className="relative px-5 md:px-10">
                    {course.owner === auth.user.username && (
                        <div className="absolute right-5 top-5">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="hover:text-indigo-700 text-gray-600 transition ease-in-out duration-150"
                                    >
                                        <IoSettingsOutline size={32} />
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content width="40">
                                    <Dropdown.Link
                                        href={
                                            "/courses/" +
                                            course.formatted_title +
                                            "/edit"
                                        }
                                    >
                                        Edit
                                    </Dropdown.Link>
                                    <Dropdown.Button
                                        type="button"
                                        onClick={onDelete}
                                    >
                                        Delete
                                    </Dropdown.Button>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    )}
                    <div className="xl:float-left xl:fixed xl:mt-6 xl:w-1/3">
                        <h2 className="capitalize text-2xl pt-5 pb-5 text-center font-bold mx-auto w-4/6 sm:w-5/6">
                            {course.title}
                        </h2>
                        <p className="capitalize px-3 py-1 mb-5 bg-gray-500 text-gray-100 w-fit rounded-full mx-auto">
                            {course.category.split("_").join(" ")}
                        </p>
                        <img
                            src="/assets/img/WebDev.jpg"
                            //     "http://127.0.0.1:5174/resources/images/" +
                            //     course.preview_image

                            // alt={course.preview_image}

                            className="w-full max-w-lg mx-auto mb-10"
                        />

                        <div className="flex justify-around mb-10 max-w-lg mx-auto">
                            <FollowButton
                                isFollowed={isFollowed}
                                course={course}
                                sessionUser={sessionUser}
                            />
                            <LikeButton
                                isLiked={isLiked}
                                course={course}
                                sessionUser={sessionUser}
                                likes={likes}
                            />
                        </div>

                        <p className="text-center text-xl">
                            {course.description}
                        </p>
                    </div>
                </div>
                <div className="mx-auto w-10/12 xl:w-1/2 xl:float-right xl:mr-14 2xl:w-7/12">
                    <h3 className="underline text-lg text-center pt-10 xl:pt-4">
                        {chapters.length > 0 ? "" : "No chapter"}
                    </h3>
                    <div>
                        <ol>
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
                                            number={key + 1}
                                        />
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <CommentSection sessionUser={sessionUser} course={course} />
                </div>
            </div>
        </General>
    );
}
