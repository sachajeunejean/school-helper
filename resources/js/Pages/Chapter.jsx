import { router } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";
import { IoSettingsOutline } from "react-icons/io5";

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

    return (
        <General auth={auth}>
            <Head title={`${chapter.title}`} />

            <div className="w-[90%] mx-auto py-10 space-y-4 min-h-[calc(100vh-125px)]">
                {owner === sessionUser.username && (
                    <div className="absolute right-10">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="hover:text-indigo-700 transition ease-in-out duration-150"
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

                <h3 className="text-3xl text-center">{chapter.title}</h3>
                <p className="text-center">{chapter.description}</p>
                <div dangerouslySetInnerHTML={createChapterHtmlContent()}></div>

                {/* NEXT AND PREVIOUS CHAPTER */}
                {/* IF ID PREV = NUL, DONT SHOW PREV */}
                {/* IF ID NEXT = NUL, DONT SHOW NEXT */}
            </div>
        </General>
    );
}
