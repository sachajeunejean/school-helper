import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import General from "@/Layouts/GeneralLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";

export default function UpdateCourse({ auth }) {
    const { course } = usePage().props;

    const { data, setData, post } = useForm({
        title: course.title,
        description: course.description,
        category: course.category,

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
