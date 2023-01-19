export default function Chapter( { chapter } ) {

    console.log(chapter);

    return (
        <div>
            <div className="p-10">
                <h2 className="underline">Chapter:</h2>
                <p>{chapter.title}</p>
                <p>{chapter.description}</p>
                <p>{chapter.content}</p>
            </div>
        </div>
    )
}
