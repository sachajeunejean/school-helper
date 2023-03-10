import { Head } from "@inertiajs/react";
import General from "@/Layouts/GeneralLayout";
import Learner from "@/Pages/Dashboard/Partials/Learner";
import Teacher from "@/Pages/Dashboard/Partials/Teacher";
import Moderator from "@/Pages/Dashboard/Partials/Moderator";

export default function Dashboard({
    auth,
    followedCourses,
    createdCourses,
    feedbacksGiven,
    coursesFeedbacks,
}) {
    return (
        <General auth={auth} className="flex">
            <Head title="Dashboard" />

            <div className="py-12 bg-gray-100">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 min-h-[calc(100vh-125px)] ">
                    {auth.user.role === "l" ? (
                        <Learner
                            user={auth.user}
                            followedCourses={followedCourses}
                        />
                    ) : (
                        ""
                    )}
                    {auth.user.role === "t" ? (
                        <Teacher
                            user={auth.user}
                            followedCourses={followedCourses}
                            createdCourses={createdCourses}
                            coursesFeedbacks={coursesFeedbacks}
                        />
                    ) : (
                        ""
                    )}
                    {auth.user.role === "m" ? (
                        <Moderator
                            user={auth.user}
                            followedCourses={followedCourses}
                            createdCourses={createdCourses}
                            feedbacksGiven={feedbacksGiven}
                            coursesFeedbacks={coursesFeedbacks}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </General>
    );
}
