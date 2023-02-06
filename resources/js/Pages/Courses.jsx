import Card from "@/Components/Card";
import PrimaryButton from "@/Components/PrimaryButton";
import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";
import {
    IoArrowBackCircleOutline,
    IoArrowForwardCircleOutline,
} from "react-icons/io5";
import AOS from "aos";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { entries } from "lodash";

export default function Courses({ auth, courses }) {
    // pagination
    const [firstValue, setFirstValue] = useState(0);
    const [secondValue, setSecondValue] = useState(16);
    const [selectedCategory, setSelectedCategory] = useState();
    const [categoryList, setCategoryList] = useState([]);
    // infinite scroll
    const observer = useRef();
    const lastCourseElementRef = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    console.log(secondValue);
                    setSecondValue(secondValue + 8);
                    console.log(secondValue);
                    console.log(node);
                }
            });

            if (node) observer.current.observe(node);
        },
        [secondValue]
    );

    const defaultSubjects = [
        "art",
        "biology",
        "chemistry",
        "computer_science",
        "economics",
        "engineering",
        "geography",
        "history",
        "human_science",
        "languages",
        "law",
        "literature",
        "marketing",
        "mathematics",
        "music",
        "philosophy",
        "physics",
        "technology",
    ];

    function handleCategoryChange(e) {
        setSelectedCategory(e.target.value);
    }

    useEffect(() => {
        setCategoryList(defaultSubjects);
        // AOS
        AOS.init();
    }, []);
    return (
        <General auth={auth} courses={courses}>
            <Head title="Courses" />

            <main>
                <div className=" bg-gradient-to-r from-gray-50 to-gray-200 min-h-[calc(100vh-125px)]">
                    <div
                        className="w-3/4 mx-auto relative flex justify-between"
                        data-aos="fade-right"
                    >
                        <h3 className="text-center text-medium pt-8 text-3xl text-gray-700">
                            All courses
                        </h3>
                        {/* <select
                            onChange={handleCategoryChange}
                            className="text-medium mt-8 text-gray-700"
                        >
                            <option defaultValue value={""}>
                                Select Category
                            </option>
                            {defaultSubjects.map((subject, key) => (
                                <option value={subject} key={key}>
                                    {subject.charAt(0).toUpperCase() +
                                        subject.slice(1).split("_").join(" ")}
                                </option>
                            ))}
                        </select>
                    <p>{selectedCategory}</p> */}
                    </div>
                    <div
                        data-aos="fade-up"
                        className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-5 gap-8 lg:p-8"
                    >
                        {courses
                            .slice(firstValue, secondValue)
                            .map((course, key) => {
                                // infinite scroll
                                if (secondValue === key + 1) {
                                    return (
                                        <div
                                            key={key}
                                            ref={lastCourseElementRef}
                                        >
                                            <Card
                                                title={course.title}
                                                category={course.category
                                                    .split("_")
                                                    .join(" ")}
                                                imgSrc={
                                                    "http://127.0.0.1:5174/resources/images/" +
                                                    course.preview_image
                                                }
                                                description={course.description}
                                                formatted_title={
                                                    course.formatted_title
                                                }
                                            />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={key}>
                                            <Card
                                                title={course.title}
                                                category={course.category
                                                    .split("_")
                                                    .join(" ")}
                                                imgSrc={
                                                    "http://127.0.0.1:5174/resources/images/" +
                                                    course.preview_image
                                                }
                                                description={course.description}
                                                formatted_title={
                                                    course.formatted_title
                                                }
                                            />
                                        </div>
                                    );
                                }
                            })}
                    </div>
                </div>
            </main>
        </General>
    );
}
