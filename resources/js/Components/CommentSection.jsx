import React from "react";
import CommentForm from "@/Components/CommentForm";
import { router, useForm, usePage } from "@inertiajs/react";

export default function CommentSection({ sessionUser, course }) {
    const { comments } = usePage().props;

    const { data, setData, post } = useForm({
        com_content_up: "",

        _method: "patch",
    });

    const onDelete = (e) => {
        e.preventDefault();

        router.delete("/courses/" + course.formatted_title + "/" + "delete");
    };

    const onDeleteComment = (id) => {
        //console.log('/courses/' + course.formatted_title + '/' + id + '/delete')
        router.delete(
            "/courses/" + course.formatted_title + "/delete-comment/" + id
        );
    };

    const updateComment = (e, id) => {
        e.preventDefault();

        post("/courses/" + course.formatted_title + "/update-comment/" + id, {
            forceFormData: true,
        });
    };

    console.log(comments);
    return (
        <div className="my-8 space-y-4">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ml-4">
                Comments ({comments.length})
            </h2>

            <CommentForm sessionUser={sessionUser} course={course} />

            <div>
                {comments.map((comment, key) => (
                    <div className="py-3" key={key}>
                        <div className="flex items-end space-x-10">
                            <h3 className="font-bold text-xl underline text-gray-900">
                                {comment.username}
                            </h3>
                            <p className="text-sm text-gray-600">timestamp</p>
                        </div>
                        <p className="py-3">{comment.content}</p>
                        <hr className="border-gray-300" />

                        {/* <form
                            onSubmit={(e) => updateComment(e, comment.id)}
                            className={
                                sessionUser
                                    ? sessionUser.username === comment.username
                                        ? "flex flex-col"
                                        : "hidden"
                                    : "hidden 1"
                            }
                        >
                            <input
                                type="text"
                                name="com_content_up"
                                onChange={(e) =>
                                    setData("com_content_up", e.target.value)
                                }
                                defaultValue={comment.content}
                            />
                            <div>
                                <button type="submit">EDIT</button>
                                <br />
                                <button
                                    onClick={() => onDeleteComment(comment.id)}
                                    type="button"
                                >
                                    DELETE
                                </button>
                            </div>
                        </form> */}
                    </div>
                ))}
            </div>
        </div>
    );
}
