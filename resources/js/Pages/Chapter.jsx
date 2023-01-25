import Dropdown from "@/Components/Dropdown";
import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";
import { IoSettingsOutline } from "react-icons/io5";

export default function Chapter({ chapter, auth }) {
    console.log(chapter);

    return (
        <General auth={auth}>
            <Head title={`${chapter.title}`} />

            <div className="w-[90%] mx-auto py-10 space-y-4 min-h-[calc(100vh-125px)]">
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
                            <Dropdown.Link>Edit</Dropdown.Link>
                            <Dropdown.Link>Delete</Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>

                <h3 className="text-3xl text-center">{chapter.title}</h3>
                <p className="text-center">{chapter.description}</p>
                <p>{chapter.content}</p>

                {/* NEXT AND PREVIOUS CHAPTER */}
                {/* IF ID PREV = NUL, DONT SHOW PREV */}
                {/* IF ID NEXT = NUL, DONT SHOW NEXT */}
            </div>
        </General>
    );
}
