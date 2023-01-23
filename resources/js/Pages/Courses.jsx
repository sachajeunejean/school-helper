export default function Courses( { courses } ) {
    return (
        <div>
            <nav className="p-10">
                <ul className="flex flex-row">
                    <a className="m-5" href="/courses">Courses</a>
                    <a className="m-5" href="/courses/new">New Course</a>
                    <a className="m-5" href="/register">Register</a>
                    <a className="m-5" href="/login">Login</a>
                </ul>
            </nav>

            <div className="p-10">
                {courses.map((course, key) => (
                    <div className="mb-5" key={key}>
                        <a href={ "/courses/" + course.formatted_title }>Title: {course.title}</a>
                        <p>Desc: {course.description}</p>
                        <p>Category: {course.category}</p>
                        <p>Status: {course.status}</p>
                        <p>Preview image: </p>
                        <img src={"http://127.0.0.1:5174/resources/images/" + course.preview_image} alt={course.preview_image} />
                    </div>
                ))}
            </div>
        </div>
    );
}
