import {Head, router} from "@inertiajs/react";
import General from "@/Layouts/GeneralLayout";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";

export default function NewFeedback( { auth, pendingCourses } ) {

    function submit(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        router.post("/dashboard/feedbacks/new", data);
    }

    return (
        <General auth={auth} className="flex">
            <Head title="Give a new feedback" />

            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 min-h-[calc(100vh-125px)]">
                    <div className="flex justify-between bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Give a new feedback</div>
                        <a href="/dashboard" className={`inline-flex items-center justify-center mx-5 my-5 px-2 py-1 text-xs bg-indigo-800 border border-transparent font-semibold text-white uppercase tracking-widest hover:bg-indigo-700 focus:outline-none transition ease-in-out duration-150`}>BACK TO DASHBOARD</a>
                    </div>

                    <form
                        className="p-10 space-y-10"
                        onSubmit={submit}
                        method="post"
                    >

                        <div className="relative">
                            <select
                                name="course_title"
                                className="w-full rounded-md bg-gray-100 border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-indigo-700  focus:ring-indigo-700"
                            >
                                <option selected disabled hidden>
                                    Choose the course to give a feedback to
                                </option>
                                {pendingCourses.map((pendingCourse, key) => (
                                    <option value={pendingCourse.title} key={key}>
                                        {pendingCourse.title}
                                    </option>)
                                )}
                            </select>
                        </div>

                        <div className="relative">
                            <textarea
                                id="feedback_content"
                                name="feedback_content"
                                placeholder="Content"
                                className="peer p-4 h-36 w-full rounded-md shadow-md bg-gray-100 border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-indigo-700  focus:ring-indigo-700"
                            />
                            <InputLabel forInput="feedback_content" value="Content" />
                        </div>

                        <select
                                name="status"
                                className="w-full rounded-md bg-gray-100 border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-indigo-700  focus:ring-indigo-700"
                        >
                            <option selected disabled hidden>
                                Choose the new status of the course
                            </option>
                            <option value="accepted">
                                Accepted
                            </option>
                            <option value="refused">
                                Refused
                            </option>
                        </select>
                        
                        <PrimaryButton className="text-sm">
                                Send a feedback
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </General>
    )

}
