import {router, useForm, usePage} from "@inertiajs/react";

export default function UpdateCourse() {

    const { course } = usePage().props;

    const { data, setData, post} = useForm({
        title: course.title,
        description: course.description,
        category: course.category,
        preview_image: course.preview_image,
        last_preview_image: course.preview_image,

        // NOTE: When working with Laravel PUT/PATCH requests and FormData
        // you SHOULD send POST request and fake the PUT request like this.
        _method: 'PUT'
    });

    function submit(e) {
        e.preventDefault();

        post('/courses' + course.formatted_title + '/update');
        //router.post('/courses/' + course.formatted_title + '/update', data);
    }

    return (
        <div>
            <form onSubmit={submit} className="flex flex-col p-10">
                <h2 className="underline">Course:</h2>
                <input onChange={e => setData('title', e.target.value)} name="title" type="text" defaultValue={course.title} />
                <textarea onChange={e => setData('description', e.target.value)} name="description" defaultValue={course.description} />
                <input onChange={e => setData('category', e.target.value)} name="category" type="text" defaultValue={course.category} />
                <input onChange={e => setData('preview_image', e.target.value)} name="preview_image" type="file" />
                <img src={"http://127.0.0.1:5174/resources/images/" + course.preview_image} alt={course.preview_image}></img>
                <button type="submit" className="bg-red-500 text-amber-50 p-5">CHANGE THE COURSE</button>
            </form>
        </div>
    )
}
