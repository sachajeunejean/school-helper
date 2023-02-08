import { router } from "@inertiajs/react";
import React from "react";
import { IoHeart } from "react-icons/io5";

export default function LikeButton({ course, isLiked, sessionUser, likes }) {
    const likeCourse = (e) => {
        e.preventDefault();
        router.post(
            "/courses/" + course.formatted_title + "/like/" + sessionUser.id
        );
    };

    const deleteLike = (e) => {
        e.preventDefault();

        router.delete(
            "/courses/" +
                course.formatted_title +
                "/delete-like/" +
                sessionUser.id
        );
    };

    let formattedLikes;
    if (likes < 1000) {
        formattedLikes = likes;
    } else {
        formattedLikes = likes / 1000;
        formattedLikes = formattedLikes.toFixed(1) + " k";
    }

    return (
        <div>
            {isLiked ? (
                <form onSubmit={deleteLike}>
                    <button
                        className="w-32 mx-auto flex text-white items-center justify-center cursor-pointer py-2 space-x-4  bg-indigo-700 transition-all"
                        type="submit"
                        name="follow-btn"
                    >
                        <IoHeart
                            size={20}
                            className={`top-1 right-1 stroke-[20px] stroke-white  ${
                                isLiked ? "fill-red-700" : "fill-transparent"
                            }`}
                        />
                        <p>{formattedLikes}</p>
                    </button>
                </form>
            ) : (
                <form onSubmit={likeCourse}>
                    <button
                        className="w-32 mx-auto flex text-white items-center justify-center cursor-pointer py-2 space-x-4  bg-indigo-700 transition-all"
                        type="submit"
                        name="follow-btn"
                    >
                        <IoHeart
                            size={20}
                            className={`top-1 right-1 stroke-[20px] stroke-white  ${
                                isLiked ? "fill-red-700" : "fill-transparent"
                            }`}
                        />
                        <p>{formattedLikes}</p>
                    </button>
                </form>
            )}
        </div>
    );
}
