import { Head } from '@inertiajs/react';
import General from "@/Layouts/GeneralLayout";

export default function Dashboard( { auth } ) {
    return (
        <General auth={auth} className="flex">
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">My followed courses</div>
                    </div>
                </div>
            </div>
        </General>
    );
}
