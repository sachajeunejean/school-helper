import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import General from "@/Layouts/GeneralLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function UpdateCourse({ auth }) {
    const { course } = usePage().props;

    const { data, setData, post } = useForm({
        title: course.title,
        description: course.description,
        category: course.category,
        preview_image: course.preview_image,
        last_preview_image: course.preview_image,

        _method: "patch",
    });

    function submit(e) {
        e.preventDefault();

        post("/courses/" + course.formatted_title + "/update", {
            forceFormData: true,
        });
    }

    return (
        <General auth={auth}>
            <Head title={`${course.title}`} />
            <div className="pt-5 px-5 md:pt-10 md:px-10 min-h-[calc(100vh-185px)] md:min-h-[calc(100vh-125px)]">
                <h2 className="capitalize text-2xl pt-5 pb-5 w-3/4 mx-auto text-center font-bold">
                    {course.title}
                </h2>
                <form
                    onSubmit={submit}
                    className="flex flex-col space-y-5 w-9/12 mx-auto"
                >
                    <TextInput
                        onChange={(e) => setData("title", e.target.value)}
                        name="title"
                        type="text"
                        value={course.title}
                    />
                    <textarea
                        onChange={(e) => setData("description", e.target.value)}
                        name="description"
                        defaultValue={course.description}
                        className="peer p-4 h-80 w-full rounded-md shadow-md bg-gray-100 border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-indigo-700  focus:ring-indigo-700"
                    />

                    <input
                        className="hidden"
                        name="category"
                        type="text"
                        defaultValue={course.category}
                    />

                    <PrimaryButton type="submit">
                        CHANGE THE COURSE
                    </PrimaryButton>
                </form>
            </div>
        </General>
    );
}
