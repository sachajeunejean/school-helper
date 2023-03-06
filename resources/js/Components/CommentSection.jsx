import React, { useState } from "react";
import CommentForm from "@/Components/CommentForm";
import { router, useForm, usePage } from "@inertiajs/react";
import Dropdown from "./Dropdown";
import { BsThreeDots } from "react-icons/bs";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default function CommentSection({ sessionUser, course, auth }) {
    dayjs.extend(relativeTime);

    const { comments } = usePage().props;
    const [isEditing, setIsEditing] = useState(false);
    const [selectedComment, setSelectedComment] = useState(0);

    const toggleIsEditing = (id) => {
        setSelectedComment(id);

        setIsEditing(!isEditing);
    };

    const { data, setData, post } = useForm({
        com_content_up: "",

        _method: "patch",
    });

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

        setIsEditing(!isEditing);
    };

    return (
        <div className="mt-24 mb-8 space-y-4 2xl:w-3/4 2xl:mx-auto">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ml-4 relative z-40">
                Comments ({comments.length})
            </h2>

            <CommentForm sessionUser={sessionUser} course={course} />

            <div>
                {comments.map((comment, key) => (
                    <div className="py-3" key={key}>
                        {(sessionUser.username === comment.username || auth.user.role === 'm') && (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="absolute right-0 -top-1">
                                        <BsThreeDots />
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content width="">
                                    <Dropdown.Button
                                        onClick={() =>
                                            toggleIsEditing(comment.id)
                                        }
                                    >
                                        Edit
                                    </Dropdown.Button>
                                    <Dropdown.Button
                                        onClick={() =>
                                            onDeleteComment(comment.id)
                                        }
                                    >
                                        Delete
                                    </Dropdown.Button>
                                </Dropdown.Content>
                            </Dropdown>
                        )}
                        <div className="flex items-end space-x-10">
                            <p className="font-bold text-xl underline text-gray-900 whitespace-nowrap overflow-hidden overflow-ellipsis">
                                {comment.username}
                            </p>
                            <p className="text-sm text-gray-800">
                                {dayjs(comment.created_at).fromNow()}
                            </p>
                        </div>

                        {isEditing && selectedComment === comment.id ? (
                            <form
                                onSubmit={(e) => updateComment(e, comment.id)}
                                className="flex flex-col justify-between "
                            >
                                <input
                                    type="text"
                                    name="com_content_up"
                                    onChange={(e) =>
                                        setData(
                                            "com_content_up",
                                            e.target.value
                                        )
                                    }
                                    defaultValue={comment.content}
                                    autoFocus
                                    className="my-2 px-1 bg-gray-100 border-indigo-700 rounded-lg"
                                />

                                <div className="flex justify-between mb-2">
                                    <SecondaryButton
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </SecondaryButton>
                                    <PrimaryButton type="submit">
                                        Edit
                                    </PrimaryButton>
                                </div>
                            </form>
                        ) : (
                            <p className="py-3 text-gray-600">
                                {comment.content}
                            </p>
                        )}

                        <hr className="border-b-[1px] border-gray" />
                    </div>
                ))}
            </div>
        </div>
    );
}
