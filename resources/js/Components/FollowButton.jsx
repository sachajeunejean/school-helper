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
        <div className="max-w-xs mx-auto  flex items-center justify-center space-x-4 mt-7 py-2 cursor-pointer bg-indigo-700 text-white rounded-md shadow-lg hover:bg-indigo-800 hover:ring-2 hover:ring-offset-2 hover:ring-indigo-700  transition-all">
            <IoBookmark
                size={20}
                className={`top-1 right-1 stroke-[20px] stroke-white fill-transparent ${
                    isFollowed ? "fill-yellow-400" : "fill-transparent"
                }`}
            />

            {isFollowed ? (
                <form
                    onSubmit={deleteFollow}
                    className={sessionUser ? "flex" : "hidden"}
                >
                    <button type="submit" name="follow-btn">
                        Unfollow
                    </button>
                </form>
            ) : (
                <form
                    onSubmit={followCourse}
                    className={sessionUser ? "flex" : "hidden"}
                >
                    <button type="submit" name="follow-btn">
                        Follow
                    </button>
                </form>
            )}
        </div>
    );
}
