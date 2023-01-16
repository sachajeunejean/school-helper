export default function Courses( { courses } ) {

    return (
        <div>
            <nav className="p-10">
                <ul className="flex flex-row">
                    <a className="m-5" href="/courses">Courses</a>
                    <a className="m-5" href="/courses/new">New Course</a>
                </ul>
            </nav>

            <div className="p-10">
                {courses.map((course, key) => (
                    <div className="mb-5" key={key}>
                        <li>{course.title}</li>
                        <li>{course.category}</li>
                        <li>{course.status}</li>
                    </div>
                ))}
            </div>
        </div>
    );
}
