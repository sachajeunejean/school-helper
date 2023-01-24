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
import { entries } from "lodash";

export default function Courses({ auth, courses }) {
    // search query
    const [formattedQuery, setFormattedQuery] = useState();

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
    // pagination

    // const nextPage = () => {
    //     setFirstValue(firstValue + 8);
    //     setSecondValue(secondValue + 8);
    // };

    // const previousPage = () => {
    //     setFirstValue(firstValue - 8);
    //     setSecondValue(secondValue - 8);
    // };

    // AOS
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <General
            auth={auth}
            courses={courses}
            formattedQuery={formattedQuery}
            setFormattedQuery={setFormattedQuery}
        >
            <Head title="Courses" />

            <main className="">
                <div className=" bg-gradient-to-r from-white to-gray-200">
                    <div
                        className="w-3/4 mx-auto relative flex justify-between"
                        data-aos="fade-right"
                    >
                        <h3 className="text-center text-medium pt-8 text-3xl text-gray-700">
                            {formattedQuery === undefined
                                ? "All courses"
                                : `Result for : ${formattedQuery}`}
                        </h3>
                        <p className="text-center text-medium pt-8 text-3xl text-gray-700">
                            FILTER
                        </p>
                        {/* <a href="/courses/new">
                            <PrimaryButton className="absolute top-7 -right-4 lg:-right-10 text-2xl rounded-full px-3 py-1 !tracking-normal">
                                +
                            </PrimaryButton>
                        </a> */}
                    </div>
                    <div
                        data-aos="fade-up"
                        className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-5 gap-8 lg:p-8"
                    >
                        {/* {courses
                            .slice(firstValue, secondValue)
                            .map((course, key) => (
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
                                        formatted_title={course.formatted_title}
                                    />
                                </div>
                            ))} */}

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
                {/* Pagination */}
                {/* <div className="w-2/3 mx-auto flex justify-around items-center mb-8 text-lg lg:text-2xl">
                    <div
                        className={`flex items-center gap-4 cursor-pointer ${
                            firstValue > 1 ? "flex" : "hidden"
                        }`}
                        onClick={previousPage}
                    >
                        <IoArrowBackCircleOutline />

                        <p>Previous</p>
                    </div>
                    <div
                        className={`flex items-center gap-4 cursor-pointer ${
                            secondValue > courses.length ? "hidden" : "flex"
                        }`}
                        onClick={nextPage}
                    >
                        <p>Next</p>
                        <IoArrowForwardCircleOutline />
                    </div>
                </div> */}
            </main>
        </General>
    );
}
