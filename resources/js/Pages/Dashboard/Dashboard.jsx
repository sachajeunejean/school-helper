import { Head } from '@inertiajs/react';
import General from "@/Layouts/GeneralLayout";
import Learner from "@/Pages/Dashboard/Partials/Learner";
import Teacher from './Partials/Teacher';
import Moderator from './Partials/Moderator';

export default function Dashboard( { auth, followedCourses, createdCourses } ) {
    return (
        <General auth={auth} className="flex">
            <Head title="Dashboard" />

            <div className="py-12">

                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 min-h-[calc(100vh-125px)]">
                    {
                        auth.user.role === 'learner' ? <Learner user={auth.user} followedCourses={followedCourses} /> : ""
                    }
                    {
                        auth.user.role === 'teacher' ? <Teacher user={auth.user} followedCourses={followedCourses} createdCourses={createdCourses} /> : ""
                    }
                    {
                        auth.user.role === 'moderator' ? <Moderator user={auth.user} followedCourses={followedCourses} createdCourses={createdCourses} /> : ""
                    }
                </div>
            </div>
        </General>
    );
}
