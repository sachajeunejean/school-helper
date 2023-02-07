import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import General from "@/Layouts/GeneralLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import EditorEdit from "@/Components/EditorEdit";
import { useState } from "react";

export default function UpdateChapter({ auth }) {
    const { chapter } = usePage().props;

    const { data, setData, post } = useForm({
        title: chapter.title,
        description: chapter.description,
        chap_content: chapter.content,

        _method: "patch",
    });

    const [chapterContent, setChapterContent] = useState(
        JSON.parse(chapter.content)
    );

    function submit(e) {
        e.preventDefault();
        setData("chap_content", JSON.stringify(chapterContent));
        post(
            "/courses/" +
                chapter.course.formatted_title +
                "/" +
                chapter.formatted_title +
                "/update",
            {
                forceFormData: true,
            }
        );
    }
    return (
        <General auth={auth}>
            <Head title={`${chapter.title} - Edit`} />
            <div className="bg-gray-100 min-h-[calc(100vh-125px)] ">
                <form
                    onSubmit={submit}
                    className="p-10 space-y-10 md:w-3/4 mx-auto"
                >
                    <h2 className="capitalize text-2xl pt-5 pb-5 text-center font-bold">
                        {`${chapter.title} - Edit`}
                    </h2>
                    <div className="relative">
                        <TextInput
                            handleChange={(e) =>
                                setData("title", e.target.value)
                            }
                            type="text"
                            name="title"
                            value={data.title}
                        />
                        <InputLabel forInput="title" value="Title" />
                    </div>
                    <div className="relative">
                        <TextInput
                            handleChange={(e) =>
                                setData("description", e.target.value)
                            }
                            type="text"
                            name="description"
                            value={data.description}
                        />
                        <InputLabel
                            forInput="description"
                            value="Description"
                        />
                    </div>
                    <div className="border-2 rounded-lg shadow-lg bg-gray-100 px-5">
                        <EditorEdit
                            setData={setData}
                            setChapterContent={setChapterContent}
                            chapterContent={chapterContent}
                        />
                    </div>
                    <div className="flex justify-between">
                        <a
                            href={`/courses/${chapter.course.formatted_title}/${chapter.formatted_title}`}
                        >
                            <SecondaryButton type="button">
                                Cancel
                            </SecondaryButton>
                        </a>
                        <PrimaryButton type="submit">Edit</PrimaryButton>
                    </div>
                </form>
            </div>
        </General>
    );
}
