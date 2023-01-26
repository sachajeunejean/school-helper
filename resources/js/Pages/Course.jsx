import {router, useForm, usePage} from "@inertiajs/react";
import {useRef, useState} from "react";
import ContentEditable from "react-contenteditable";

export default function Course( { course, chapters, sessionUser, isLiked, likes, isFollowed } ) {

    const { comments } = usePage().props;

    const { data, setData, post} = useForm({
        com_content_up: '',

        _method: 'patch'
    });

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

    const onDeleteComment = (id) => {
        //console.log('/courses/' + course.formatted_title + '/' + id + '/delete')
        router.delete('/courses/' + course.formatted_title + '/delete-comment/' + id);
    }

    const updateComment = (e, id) => {
        e.preventDefault()

        post('/courses/' + course.formatted_title + '/update-comment/' + id, {
            forceFormData: true,
        });
    }

    const likeCourse = (e) => {
        e.preventDefault()

        router.post('/courses/' + course.formatted_title + '/like/' + sessionUser.id);
    }

    const deleteLike = (e) => {
        e.preventDefault()

        router.delete('/courses/' + course.formatted_title + '/delete-like/' + sessionUser.id);
    }

    const followCourse = (e) => {
        e.preventDefault()

        router.post('/courses/' + course.formatted_title + '/follow/' + sessionUser.id);
    }

    const deleteFollow = (e) => {
        e.preventDefault()

        router.delete('/courses/' + course.formatted_title + '/delete-follow/' + sessionUser.id);
    }

    return (
        <div>
            <div className="p-10">
                <h2 className="underline">Course:</h2>
                <p>likes: {likes}</p>
                <form onSubmit={likeCourse} className={sessionUser ? "flex" : "hidden"} >
                    <button type="submit" name="like-btn" disabled={isLiked}>Like</button>
                </form>
                <form onSubmit={deleteLike} className={sessionUser ? "flex" : "hidden"} >
                    <button type="submit" name="delete-like-btn" disabled={!isLiked}>Delete Like</button>
                </form>
                <p>isFollowed : {isFollowed ? 'yes' : 'no'}</p>
                <form onSubmit={followCourse} className={sessionUser ? "flex" : "hidden"} >
                    <button type="submit" name="like-btn" disabled={isFollowed}>Follow</button>
                </form>
                <form onSubmit={deleteFollow} className={sessionUser ? "flex" : "hidden"} >
                    <button type="submit" name="like-btn" disabled={!isFollowed}>Unfollow</button>
                </form>
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

                            <form onSubmit={(e) => updateComment(e, comment.id)} className={sessionUser ? (sessionUser.username === comment.username ? "flex flex-col" : "hidden" ) : "hidden 1"}>
                                <input type="text" name="com_content_up" onChange={ (e) => setData('com_content_up', e.target.value) } defaultValue={comment.content} />
                                <div>
                                    <button type="submit">EDIT</button>
                                    <br />
                                    <button onClick={() => onDeleteComment(comment.id)} type="button">DELETE</button>
                                </div>
                            </form>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
