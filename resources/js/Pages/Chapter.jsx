import {router} from "@inertiajs/react";

export default function Chapter( { chapter, course, owner, sessionUser } ) {

    const onDelete = (e) => {
        e.preventDefault()

        router.delete('/courses/' + course.formatted_title + '/' + 'delete')
    }

    return (
        <div>
            <div className="p-10">
                <h2 className="underline">Chapter:</h2>
                <p>{chapter.title}</p>
                <p>{chapter.description}</p>
                <p>{chapter.content}</p>
            </div>

            <div className={ (sessionUser ? sessionUser.username === owner : false) ? "flex flex-col p-10" : "hidden" }>
                <a className="w-1/12 bg-red-500 text-amber-50 p-5 mb-5" href={'/courses/' + course.formatted_title + '/' + chapter.formatted_title + '/edit'}>EDIT</a>
                <br />
                <br />
                <br />
                <button onClick={onDelete} type="button" className="w-1/12 bg-red-500 text-amber-50 p-5">DELETE</button>
            </div>
        </div>
    )
}
