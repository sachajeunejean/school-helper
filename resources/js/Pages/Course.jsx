import { router } from "@inertiajs/react";

export default function Course( { course, chapters, comments, sessionUser } ) {

    const submitComment = (e) => {
        e.preventDefault()

        let data = new FormData(e.target);

        data.append('id_course', course.id)
        data.append('formatted_title', course.formatted_title)

        router.post('/courses/' + course.formatted_title + '/new-comment', data);
    }

    const onDelete = (e) => {
        e.preventDefault()

        router.delete('/courses/' + course.formatted_title + '/' + 'delete')
    }

    return (
        <div>
            <div className="p-10">
                <h2 className="underline">Course:</h2>
                <p>{course.title}</p>
                <p>{course.description}</p>
                <p>{course.category}</p>
                <p>{course.status}</p>
                <img src={"http://127.0.0.1:5174/resources/images/" + course.preview_image} alt={course.preview_image}></img>
            </div>

            <div className={ (sessionUser ? sessionUser.username === course.owner : false) ? "flex flex-col p-10" : "hidden" }>
                <a className="w-1/12 bg-red-500 text-amber-50 p-5 mb-5" href={'/courses/' + course.formatted_title + '/' + 'edit'}>EDIT</a>
                <br />
                <br />
                <br />
                <button onClick={onDelete} type="button" className="w-1/12 bg-red-500 text-amber-50 p-5">DELETE</button>
            </div>

            <div className="p-10">
                <h3 className="underline">Chapters:</h3>
                {
                    chapters.map((chapter, key) => (
                        <div key={key}>
                            <a href={'/courses/' + course.formatted_title + '/' + chapter.formatted_title}>{chapter.title}</a>
                        </div>
                    ))
                }
            </div>

            <form
                onSubmit={submitComment}
                className={
                    sessionUser ?
                        "flex p-10" :
                        "hidden"
                }
                method="post"
            >
                <input type="text" name="com_content" placeholder="Add a comment..." />
                <button className="p-5 cursor-pointer border-2" type="submit">Add</button>
            </form>

            <div>
                {
                    comments.map((comment, key) => (
                        <div key={key}>
                            <h3 className="font-bold underline">{comment.username}</h3>
                            <p>{comment.content}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
