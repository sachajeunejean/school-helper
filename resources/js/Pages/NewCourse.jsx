import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import General from "@/Layouts/GeneralLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Card from "@/Components/Card";
import { useEffect } from "react";

export default function NewCourse({ auth, errorMessage }) {
    const subjects = [
        "art",
        "biology",
        "chemistry",
        "computer_science",
        "economics",
        "engineering",
        "geography",
        "history",
        "human_science",
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

    const [errorField, setErrorField] = useState("");
    const [showErrorField, setShowErrorField] = useState(false);

    function submit(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        if (data.get("title").length > 120) {
            setErrorField("The course title is too long.");
            return;
        } else if (data.get("description").length > 180) {
            setErrorField("The course description is too long.");
            return;
        } else if (data.get("category") === null) {
            setErrorField("The category field has to be filled.");
            return;
        } else if (
            data.get("title").length === 0 ||
            data.get("description").length === 0
        ) {
            setErrorField("All the fields has to be filled.");
            return;
        }

        router.post("/courses/new", data);
    }

    // get error for handle not a function, creating a dummy function
    const onHandleChange = (e) => {
        return;
    };

    useEffect(() => {
        if (errorMessage) {
            setShowErrorField(true);
            setErrorField(errorMessage);
        }
    }, [errorMessage]);

    useEffect(() => {
        if (errorField.length > 0) {
            setShowErrorField(true);
        }
    }, [errorField]);

    return (
        <General auth={auth}>
            <div
                className={
                    showErrorField
                        ? "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        : "hidden"
                }
                role="alert"
            >
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{errorField}</span>
                <span
                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                    onClick={() => setShowErrorField(false)}
                >
                    <svg
                        className="fill-current h-6 w-6 text-red-500"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                </span>
            </div>
            <Head title="New course" />
            <div className="bg-gray-100 min-h-[calc(100vh-125px)]">
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
                        <div className="flex flex-col space-y-10 md:flex-row md:space-y-0 md:justify-between">
                            <div className="relative">
                                <select
                                    name="category"
                                    className="capitalize w-full rounded-md bg-gray-100 border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-indigo-700  focus:ring-indigo-700"
                                >
                                    <option defaultValue hidden>
                                        Choose the category
                                    </option>
                                    {subjects.map((subject, key) => (
                                        <option
                                            className="capitalize"
                                            value={subject}
                                            key={key}
                                        >
                                            {subject.split("_").join(" ")}
                                        </option>
                                    ))}
                                </select>
                            </div>
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
