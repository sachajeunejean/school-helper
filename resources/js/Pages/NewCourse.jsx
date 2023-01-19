import { useState } from 'react'
import { router } from '@inertiajs/react'

export default function NewCourse() {

    function submit(e) {
        e.preventDefault();

        const data = new FormData(e.target);

        router.post('/courses/new', data);
    }

    return (
        <div>
            <nav className="p-10">
                <ul className="flex flex-row">
                    <a className="m-5" href="/courses">Courses</a>
                    <a className="m-5" href="/courses/new">New Course</a>
                </ul>
            </nav>

            <form className="p-10" onSubmit={submit} method="post" encType="multipart/form-data">
                <div className="flex flex-col mb-5">
                    <label htmlFor="title">Title : </label>
                    <input type="text" name="title" defaultValue="Web Development" />
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="description">Description : </label>
                    <textarea name="description" defaultValue="A course about" />
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="title">Category : </label>
                    <select name="category">
                        <option value="computer_science">Computer Science</option>
                        <option value="math">Math</option>
                        <option value="french">French</option>
                    </select>
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="preview_image">Preview Image Course : </label>
                    <input type="file" id="preview_image" name="preview_image" />
                </div>
                <button className="border-2 border-black p-2" type="submit">Create a new course</button>
            </form>
        </div>
    );
}
