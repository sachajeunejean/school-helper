import {router} from "@inertiajs/react";

export default function NewChapter() {

    const getCourseFormattedTitle = () => {
        return window.location.href.split('/')[4];
    }

    function submit(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        router.post('/courses/' + getCourseFormattedTitle() + '/new-chapter', data);
    }

    return (
        <div>
            <form className="p-10" onSubmit={submit} method="post">
                <div className="flex flex-col mb-5">
                    <label htmlFor="title">Title : </label>
                    <input type="text" name="title" />
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="title">Description : </label>
                    <textarea name="description" />
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="title">Content : </label>
                    <textarea name="chap_content" />
                </div>
                <button className="border-2 border-black p-2" type="submit">Create a new chapter</button>
            </form>
        </div>
    );
}
