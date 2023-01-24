import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import General from "@/Layouts/GeneralLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Card from "@/Components/Card";
export default function NewCourse({ auth }) {
    const subjects = [
        "art",
        "biology",
        "chemistry",
        "computer_science",
        "economics",
        "engineering",
        "geography",
        "history",
        "human_sciences",
        "languages",
        "law",
        "literature",
        "marketing",
        "mathematics",
        "music",
        "philosophy",
        "physics",
        "technology",
    ];

    function submit(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        router.post("/courses/new", data);
    }

    // get error for handle not a function, creating a dummy function
    const onHandleChange = (e) => {
        return;
    };

    return (
        <General auth={auth}>
            <Head title="New course" />
            <div className="bg-gray-100">
                <div className="w-full md:w-3/4 lg:w-1/2 mx-auto py-10">
                    <h3 className="text-3xl text-center mb-6">
                        <span className="text-indigo-700">Upload</span> your{" "}
                        <span className="text-indigo-700">course</span> for
                        everybody.
                    </h3>
                    <form
                        className="p-10 space-y-10"
                        onSubmit={submit}
                        method="post"
                        encType="multipart/form-data"
                    >
                        <div className="relative">
                            <TextInput
                                id="title"
                                type="text"
                                name="title"
                                className="mt-1 block w-full"
                                placeholder="title"
                                handleChange={onHandleChange}
                            />
                            <InputLabel forInput="title" value="Title" />
                        </div>
                        {/* Switch to textarea */}
                        <div className="relative">
                            {/* <TextInput
                                id="description"
                                type="text"
                                name="description"
                                className="mt-1 block w-full"
                                placeholder="description"
                                handleChange={onHandleChange}
                            /> */}
                            <textarea
                                id="description"
                                name="description"
                                placeholder="description"
                                className="peer p-4 h-36 w-full rounded-md shadow-md bg-gray-100 border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-indigo-700  focus:ring-indigo-700"
                            />
                            <InputLabel
                                forInput="description"
                                value="Description"
                            />
                        </div>

                        <div className="relative">
                            <select
                                name="category"
                                className="rounded-md bg-gray-100 border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-indigo-700  focus:ring-indigo-700"
                            >
                                <option value="" selected disabled hidden>
                                    Choose the category
                                </option>
                                {subjects.map((subject, key) => (
                                    <option value={subject} key={key}>
                                        {subject.charAt(0).toUpperCase() +
                                            subject
                                                .slice(1)
                                                .split("_")
                                                .join(" ")}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <input
                                type="file"
                                id="preview_image"
                                name="preview_image"
                            />
                        </div>
                        <div className="flex justify-between">
                            <a href="/courses">
                                <SecondaryButton type="button">
                                    Cancel
                                </SecondaryButton>
                            </a>
                            <PrimaryButton className="text-sm">
                                Create a new course
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </General>
    );
}
