import Card from "@/Components/Card";
import PrimaryButton from "@/Components/PrimaryButton";
import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";
import {
    IoArrowBackCircleOutline,
    IoArrowForwardCircleOutline,
} from "react-icons/io5";
import AOS from "aos";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Courses({ auth, courses }) {
    // pagination
    const [firstValue, setFirstValue] = useState(0);
    const [secondValue, setSecondValue] = useState(16);

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

    useEffect(() => {
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
                                                    "/assets/img/" +
                                                    course.category +
                                                    ".jpg"
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
                                                    "/assets/img/" +
                                                    course.category +
                                                    ".jpg"
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
