import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import General from "@/Layouts/GeneralLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function UpdateCourse({ auth }) {
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

    const { course } = usePage().props;

    const { data, setData, post } = useForm({
        title: course.title,
        description: course.description,
        category: course.category,

        _method: "patch",
    });

    const [errorField, setErrorField] = useState("");
    const [showErrorField, setShowErrorField] = useState(false);
    
    function hasSpecialChar(str) {
        const regex = /^[a-zA-Z0-9\u00C0-\u00FF\u00E7]+$/;
        return !regex.test(str);
    }

    function submit(e) {
        e.preventDefault();
        
        if (data.title.length > 60) {
            setErrorField('The course title is too long.');
            setShowErrorField(true);
            return;
        } else if (data.description.length > 180) {
            setErrorField('The course description is too long.');
            setShowErrorField(true);
            return;
        } else if (data.category === null) {
            setErrorField('The category field has to be filled.')
            setShowErrorField(true);
            return;
        } else if (data.title.length === 0 || data.description.length === 0) {
                setErrorField('All the fields has to be filled.');
                setShowErrorField(true);
                return;
        }

        post("/courses/" + course.formatted_title + "/update", {
            forceFormData: true,
        });
    }

    return (
        <General auth={auth}>
            <div className={showErrorField ? "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" : "hidden"} role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{errorField}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setShowErrorField(false)}>
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </div>
            <Head title={`${course.title} - Edit`} />
            <div className="bg-gray-100 min-h-[calc(100vh-125px)] ">
                <form
                    onSubmit={submit}
                    className="flex flex-col p-10 mx-auto w-10/12 lg:w-3/5 xl:w-1/2 space-y-10"
                >
                    <h2 className="capitalize text-2xl pt-5 pb-5 text-center font-bold">
                        {`${course.title} - Edit`}
                    </h2>
                    <div className="relative">
                        <TextInput
                            handleChange={(e) =>
                                setData("title", e.target.value)
                            }
                            name="title"
                            type="text"
                            value={data.title}
                        />
                        <InputLabel forInput="title" value="Title" />
                    </div>
                    <div className="relative">
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
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
                                    className="w-full rounded-md bg-gray-100 border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-indigo-700  focus:ring-indigo-700"
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                    value={data.category}
                                >
                                    <option selected disabled hidden >
                                        {course.category}
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

                        </div>

                    <div className="flex justify-between">
                        <a href={`/courses/${course.formatted_title}`}>
                            <SecondaryButton type="button">
                                Cancel
                            </SecondaryButton>
                        </a>
                        <PrimaryButton>Edit</PrimaryButton>
                    </div>
                </form>
            </div>
        </General>
    );
}
