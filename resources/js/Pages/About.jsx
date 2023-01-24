import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";

export default function About({ auth }) {
    return (
        <General auth={auth}>
            <Head title="About" />
            <div className="bg-slate-300 overflow py-4">
                <div className="text-center text-gray-900">About</div>
            </div>
        </General>
    );
}
