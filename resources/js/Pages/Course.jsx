import Dropdown from "@/Components/Dropdown";
import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";

export default function Course({ auth, course, chapters }) {
    return (
        <General auth={auth}>
            <Head title={`${course.title}`} />
            {/* <p>{course.status}</p> */}
            <div className="p-10">
                <div className="">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button
                                type="button"
                                className="absolute -bottom-3 right-0 rounded-md  text-3xl  hover:text-red-400 focus:outline-none transition ease-in-out duration-150"
                            >
                                ...
                            </button>
                        </Dropdown.Trigger>

                        <div className>
                            <Dropdown.Content>
                                <Dropdown.Link
                                    href={`/courses/${course.formatted_title}/edit`}
                                >
                                    Edit
                                </Dropdown.Link>

                                <Dropdown.Link>Delete</Dropdown.Link>
                            </Dropdown.Content>
                        </div>
                    </Dropdown>
                </div>
                <div>
                    <h2 className="capitalize text-2xl pb-5">{course.title}</h2>
                    <p className="capitalize px-3 py-1 mb-5 bg-gray-500 text-gray-100 w-fit rounded-full">
                        {course.category.split("_").join(" ")}
                    </p>
                    <p>{course.description}</p>
                    <img
                        src={
                            "http://127.0.0.1:5174/resources/images/" +
                            course.preview_image
                        }
                        alt={course.preview_image}
                    ></img>
                </div>
            </div>
            <div className="p-10">
                <h3 className="underline">Chapters:</h3>
                {chapters.map((chapter, key) => (
                    <div key={key}>
                        <a
                            href={
                                "/courses/" +
                                course.formatted_title +
                                "/" +
                                chapter.formatted_title
                            }
                        >
                            {chapter.title}
                        </a>
                    </div>
                ))}
            </div>
        </General>
    );
}
