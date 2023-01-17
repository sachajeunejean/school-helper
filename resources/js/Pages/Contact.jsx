import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";

export default function Contact() {
    return (
        <General>
            <Head title="Contact" />
            <div className="bg-slate-300 overflow py-4">
                <div className="text-center text-gray-900">Contact</div>
            </div>
        </General>
    );
}
