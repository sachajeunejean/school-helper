import { router } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";
import {
    IoSettingsOutline,
    IoArrowForward,
    IoArrowBack,
} from "react-icons/io5";
import "../../css/chapter-content-style.css";

export default function Chapter({ chapter, auth, owner, sessionUser, course }) {
    const onDelete = (e) => {
        e.preventDefault();

        router.delete(
            "/courses/" +
                course.formatted_title +
                "/" +
                chapter.formatted_title +
                "/delete"
        );
    };

    // return the chapter content in a good way
    function createChapterHtmlContent() {
        return { __html: chapter.content };
    }

    console.log(chapter);

    return (
        <General auth={auth}>
            <Head title={`${chapter.title}`} />
            <div className="w-3/4 mx-auto py-10 space-y-4 min-h-[calc(100vh-125px)]">
                {owner === sessionUser.username && (
                    <div className="absolute right-5 top-[84px] md:top-[88px]">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="hover:text-indigo-700 text-gray-600 transition ease-in-out duration-150"
                                >
                                    <IoSettingsOutline size={32} />
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content width="40">
                                <Dropdown.Link
                                    href={
                                        "/courses/" +
                                        course.formatted_title +
                                        "/" +
                                        chapter.formatted_title +
                                        "/edit"
                                    }
                                >
                                    Edit
                                </Dropdown.Link>
                                <Dropdown.Button
                                    onClick={onDelete}
                                    type="button"
                                >
                                    Delete
                                </Dropdown.Button>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                )}

                <h3 className="font-bold text-4xl text-gray-900 text-center">
                    {chapter.title}
                </h3>
                <p className="text-2xl text-gray-500 text-center pb-8">
                    {chapter.description}
                </p>
                <hr className="border-b-[1px] border-b-[rgb(100,100,100)] w-3/4 mx-auto" />
                <section
                    className="chapter-content__section py-8"
                    dangerouslySetInnerHTML={createChapterHtmlContent()}
                />

                {chapter.id_next !== null && chapter.id_previous !== null && (
                    <div className="flex justify-between">
                        <a
                            href="/"
                            className="flex items-center gap-2 sm:gap-8"
                        >
                            <IoArrowBack />
                            <p>Previous</p>
                        </a>
                        <button
                            href="/"
                            className="flex items-center gap-2 sm:gap-8"
                        >
                            <p>Next</p>
                            <IoArrowForward />
                        </button>
                    </div>
                )}
                {chapter.id_next === null && chapter.id_previous != null && (
                    <div className="flex justify-center">
                        <a
                            href="/"
                            className="flex items-center gap-2 sm:gap-8"
                        >
                            <IoArrowBack />
                            <p>Previous</p>
                        </a>
                    </div>
                )}

                {chapter.id_previous === null && chapter.id_next != null && (
                    <div className="flex justify-center">
                        <a
                            href="/"
                            className="flex items-center gap-2 sm:gap-8"
                        >
                            <p>Next</p>
                            <IoArrowForward />
                        </a>
                    </div>
                )}

                {chapter.id_previous === null && chapter.id_next === null && (
                    <a
                        href={`/courses/${course.formatted_title}`}
                        className="flex justify-center"
                    >
                        Back to the course
                    </a>
                )}
            </div>
        </General>
    );
    div;
    div;
}
