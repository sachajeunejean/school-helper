import Card from "@/Components/Card";
import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";
import { get } from "lodash";
import React from "react";

export default function Search({ auth, courses }) {
    const getSearchFormattedTitle = () => {
        return window.location.href.split("?")[1];
    };

    const searchQuery = getSearchFormattedTitle();

    const fixedSearchQuery = decodeURIComponent(searchQuery);

    console.log(searchQuery, fixedSearchQuery);

    return (
        <General auth={auth} courses={courses}>
            <Head title={`Search`} />
            <div className=" bg-gradient-to-l from-white to-gray-200 min-h-[calc(100vh-125px)]">
                <div
                    className="w-3/4 mx-auto relative flex justify-between"
                    data-aos="fade-right"
                >
                    <h3 className="text-center text-medium pt-8 text-3xl text-gray-700">
                        {`Result for : ${fixedSearchQuery
                            .split("-")
                            .join(" ")}`}
                    </h3>
                </div>
                <div
                    data-aos="fade-up"
                    className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-5 gap-8 lg:p-8"
                >
                    {" "}
                    {courses.map((course) => {
                        // only working with perfect match ... includes,

                        if (course.formatted_title.includes(fixedSearchQuery) && course.status !== 'pending') {
                            return (
                                <div key={course.id}>
                                    <Card
                                        title={course.title}
                                        description={course.description}
                                        category={course.category
                                            .split("_")
                                            .join(" ")}
                                        formatted_title={course.formatted_title}
                                    />
                                </div>
                            );
                        } else {
                            return;
                        }
                    })}
                </div>
            </div>
        </General>
    );
}
