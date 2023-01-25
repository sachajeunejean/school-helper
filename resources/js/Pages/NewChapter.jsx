import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import General from "@/Layouts/GeneralLayout";
import { Head, router } from "@inertiajs/react";

export default function NewChapter({ auth }) {
    const getCourseFormattedTitle = () => {
        return window.location.href.split("/")[4];
    };

    // get error for handle not a function, creating a dummy function
    const onHandleChange = () => {
        return;
    };

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
            <div className="w-full md:w-3/4 lg:w-1/2 mx-auto py-10">
                <h3 className="text-3xl text-center mb-6">
                    <span className="text-indigo-700">Upload</span> a{" "}
                    <span className="text-indigo-700">chapter</span> for
                    everybody.
                </h3>
                <form
                    className="p-10 space-y-10"
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
                            handleChange={onHandleChange}
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
                            handleChange={onHandleChange}
                        />
                        <InputLabel
                            forInput="description"
                            value="Description"
                        />
                    </div>
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

                    <div className="flex justify-between">
                        {/* Link to the previous page */}
                        {/* <a href={`/courses/${getCourseFormattedTitle(title)}`}> */}
                        <SecondaryButton type="button">Cancel</SecondaryButton>
                        {/* </a> */}
                        <PrimaryButton className="text-sm">
                            Create a new course
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </General>
    );
}
