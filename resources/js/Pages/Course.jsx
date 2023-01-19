import {useEffect} from "react";

export default function Course( { course, chapters } ) {

    return (
        <div>
            <div className="p-10">
                <h2 className="underline">Course:</h2>
                <p>{course.title}</p>
                <p>{course.category}</p>
                <p>{course.status}</p>
                <p>{course.preview_image}</p>
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
        </div>
    )
}
