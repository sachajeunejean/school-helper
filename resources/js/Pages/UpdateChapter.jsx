import {useForm, usePage} from "@inertiajs/react";

export default function UpdateChapter() {

    const { chapter } = usePage().props;

    const { data, setData, post} = useForm({
        title: chapter.title,
        description: chapter.description,
        chap_content: chapter.content,

        _method: 'patch'
    });

    function submit(e) {
        e.preventDefault();

        post('/courses/' + chapter.course.formatted_title + '/' + chapter.formatted_title + '/update', {
            forceFormData: true,
        });
    }

    return (
        <div>
            <form onSubmit={submit} className="p-10">
                <h2 className="underline">Chapter edit:</h2>
                <input onChange={e => setData('title', e.target.value)} type="text" name="title" defaultValue={chapter.title} />
                <input onChange={e => setData('description', e.target.value)} type="text" name="description" defaultValue={chapter.description} />
                <input onChange={e => setData('chap_content', e.target.value)} type="text" name="chap_content" defaultValue={chapter.content} />
                <button type="submit">UPDATE</button>
            </form>
        </div>
    )
}
