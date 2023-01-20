import {router} from "@inertiajs/react";

export default function UpdateCourse( { course } ) {

    function submit(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        router.put('/courses/' + course.formatted_title + '/edit', data);
    }

    return (
        <div>
            <div className="flex flex-col p-10">
                <h2 className="underline">Course:</h2>
                <input type="text" defaultValue={course.title} />
                <input type="text" defaultValue={course.category} />
                <input type="text" defaultValue={course.status} />
                <input type="file" />
                <img src={"http://127.0.0.1:5174/resources/images/" + course.preview_image} alt={course.preview_image}></img>
            </div>

            <form method="put" onSubmit={submit} className="p-10">
                <button type="submit" className="bg-red-500 text-amber-50 p-5">CHANGE THE COURSE</button>
            </form>
        </div>
    )
}
