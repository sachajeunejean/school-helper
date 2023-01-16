import {router} from "@inertiajs/react";

export default function NewCourse() {

    function submit(e) {
        e.preventDefault()
        const values = {
            'title' : e.target[0].value,
            'category' : e.target[1].value,
        }
        router.post('/courses/new', values);
    }

    return (
        <form className="p-10" onSubmit={submit}>
            <div className="mb-5">
                <label htmlFor="title">Title : </label>
                <input type="text" name="title" defaultValue="Web Development" />
            </div>
            <div className="mb-5">
                <label htmlFor="title">Category : </label>
                <select name="category">
                    <option value="computer_science">Computer Science</option>
                    <option value="math">Math</option>
                    <option value="french">French</option>
                </select>
            </div>
            <button className="border-2 border-black p-5" type="submit">Create a new course</button>
        </form>
    );
}
