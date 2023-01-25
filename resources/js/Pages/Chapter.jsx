import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";

export default function Chapter({ chapter, auth }) {
    console.log(chapter);

    return (
        <General auth={auth}>
            <Head title={`${chapter.title}`} />
            <div>
                <div className="w-[90%] mx-auto py-10 space-y-4">
                    <h3 className="text-3xl text-center">{chapter.title}</h3>
                    <p className="text-center">{chapter.description}</p>
                    <p>{chapter.content}</p>
                </div>
            </div>
        </General>
    );
}
