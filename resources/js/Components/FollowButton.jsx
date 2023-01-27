import { router } from "@inertiajs/react";
import React from "react";
import { IoBookmark } from "react-icons/io5";

export default function FollowButton({ isFollowed, course, sessionUser }) {
    const followCourse = (e) => {
        e.preventDefault();

        router.post(
            "/courses/" + course.formatted_title + "/follow/" + sessionUser.id
        );
    };

    const deleteFollow = (e) => {
        e.preventDefault();

        router.delete(
            "/courses/" +
                course.formatted_title +
                "/delete-follow/" +
                sessionUser.id
        );
    };
    return (
        <div>
            {isFollowed ? (
                <form onSubmit={deleteFollow}>
                    <button
                        className="w-32 mx-auto flex text-white items-center justify-center cursor-pointer py-2 space-x-4 rounded-md bg-indigo-700 transition-all"
                        type="submit"
                        name="follow-btn"
                    >
                        <IoBookmark
                            size={20}
                            className="top-1 right-1 stroke-[20px] stroke-white fill-yellow-400"
                        />
                        <p>Unfollow</p>
                    </button>
                </form>
            ) : (
                <form onSubmit={followCourse}>
                    <button
                        className="w-32 mx-auto text-white flex items-center justify-center cursor-pointer py-2 space-x-4 rounded-md bg-indigo-700 transition-all"
                        type="submit"
                        name="follow-btn"
                    >
                        <IoBookmark
                            size={20}
                            className="top-1 right-1 stroke-[20px] stroke-white fill-transparent"
                        />
                        <p>Follow</p>
                    </button>
                </form>
            )}
        </div>
    );
}
