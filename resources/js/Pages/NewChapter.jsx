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

    function submit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        router.post(
            "/courses/" + getCourseFormattedTitle() + "/new-chapter",
            data
        );
    }

    return (
        <General auth={auth}>
            <Head title="New Chapter" />
            <div className="w-full py-10 min-h-[calc(100vh-125px)] bg-gray-100">
                <h3 className="text-3xl text-center mb-6">
                    <span className="text-indigo-700">Upload</span> a{" "}
                    <span className="text-indigo-700">chapter</span> for
                    everybody.
                </h3>
                <form
                    className="p-10 space-y-10 md:w-3/4 lg:w-1/2 mx-auto"
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
                            // function is required for the component textinputcc
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
                            // function is required for the component textinput
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
                            className="peer p-4 h-36 w-full rounded-md shadow-md bg-gray-100 border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-indigo-700  focus:ring-indigo-700"
                        ></textarea>
                        <InputLabel forInput="chap_content" value="Content" />
                    </div>
                    {/* Editor JS */}
                    <div className="border-2 rounded-lg shadow-lg bg-gray-50 p-5 h-fit">
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
