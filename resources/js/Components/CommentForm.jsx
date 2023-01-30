import { router } from "@inertiajs/react";
import React, { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function CommentForm({ sessionUser, course }) {
    const [text, setText] = useState("");

    const submitComment = (e) => {
        e.preventDefault();

        let data = new FormData(e.target);

        data.append("id_course", course.id);
        data.append("formatted_title", course.formatted_title);

        router.post(
            "/courses/" + course.formatted_title + "/new-comment",
            data
        );
        setText("");
    };

    return (
        <>
            {sessionUser ? (
                <form
                    onSubmit={submitComment}
                    className={sessionUser ? "mx-auto space-y-5" : "hidden"}
                    method="post"
                >
                    <textarea
                        type="text"
                        name="com_content"
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                        placeholder="Write a comment..."
                        className="h-24 py-2 px-4 bg-[#f3f4f6] shadow-[-20px_20px_60px_#cfcfd1,20px_-20px_60px_#ffff] rounded-lg border-gray-600 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-indigo-700"
                    />
                    <PrimaryButton type="submit" className="w-42 ">
                        Post comment
                    </PrimaryButton>
                </form>
            ) : (
                ""
            )}
        </>
    );
}
