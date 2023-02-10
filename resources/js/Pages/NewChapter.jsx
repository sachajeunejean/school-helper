import { useMemo, useRef, useCallback, useState } from "react";
import { Head, router } from "@inertiajs/react";
import General from "@/Layouts/GeneralLayout";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import Editor from "@/Components/Editor";

export default function NewChapter({ auth }) {
    // get course title in the url
    const getCourseFormattedTitle = () => {
        return window.location.href.split("/")[4];
    };

    // put the html output of editorJs in textarea
    const [chapterContent, setChapterContent] = useState("");

    const [errorField, setErrorField] = useState("");
    const [showErrorField, setShowErrorField] = useState(false);

    function submit(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        data.delete("chap_content");
        data.append("chap_content", JSON.stringify(chapterContent));

        if (data.get("title").length > 120) {
            setErrorField("The chapter title is too long.");
            setShowErrorField(true);
            return;
        } else if (data.get("description").length > 180) {
            setErrorField("The chapter description is too long.");
            setShowErrorField(true);
            return;
        } else if (data.get("chap_content").length === 0) {
            setErrorField("The chapter content field has to be filled.");
            setShowErrorField(true);
            return;
        } else if (
            data.get("title").length === 0 ||
            data.get("description").length === 0
        ) {
            setErrorField("All the fields has to be filled.");
            setShowErrorField(true);
            return;
        }

        router.post(
            "/courses/" + getCourseFormattedTitle() + "/new-chapter",
            data
        );
    }

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
            <Head title="New Chapter" />
            <div className="w-full py-10 min-h-[calc(100vh-125px)] bg-gray-100">
                <h3 className="text-3xl text-center mb-6">
                    <span className="text-indigo-700">Upload</span> a{" "}
                    <span className="text-indigo-700">chapter</span> for
                    everybody.
                </h3>
                <form
                    className="p-10 space-y-10 md:w-3/4 mx-auto"
                    onSubmit={submit}
                    method="post"
                >
                    <div className="relative">
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            className="mt-1 block w-full"
                            placeholder="title"
                            handleChange={() => {
                                return;
                            }}
                        />
                        <InputLabel forInput="title" value="Title" />
                    </div>
                    <div className="relative">
                        <TextInput
                            id="description"
                            type="text"
                            name="description"
                            className="mt-1 block w-full"
                            placeholder="description"
                            handleChange={() => {
                                return;
                            }}
                        />
                        <InputLabel
                            forInput="description"
                            value="Description"
                        />
                    </div>

                    {/* Old form for the content chapter */}
                    <div className="relative">
                        <textarea
                            id="chap_content"
                            name="chap_content"
                            placeholder="chap_content"
                            value={chapterContent}
                            className="hidden"
                            readOnly
                        ></textarea>
                        <InputLabel forInput="chap_content" value="Content" />
                    </div>
                    {/* Editor JS */}
                    <div className="border-2 rounded-lg shadow-lg bg-gray-100 px-5">
                        <Editor
                            setChapterContent={setChapterContent}
                            chapterContent={chapterContent}
                        />
                    </div>
                    <div className="flex justify-between">
                        {/* Link to the previous page */}
                        <a href={`/courses/${getCourseFormattedTitle()}`}>
                            <SecondaryButton type="button">
                                Cancel
                            </SecondaryButton>
                        </a>

                        <PrimaryButton className="text-sm">
                            Create a new chapter
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </General>
    );
}
