import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";

export default function Contact({ auth }) {
    return (
        <General auth={auth}>
            <Head title="Contact" />
            <div className="bg-slate-300 overflow py-4 min-h-[calc(100vh-185px)] md:min-h-[calc(100vh-125px)]">
                <div className="text-center text-gray-900">Contact</div>
            </div>
        </General>
    );
}
