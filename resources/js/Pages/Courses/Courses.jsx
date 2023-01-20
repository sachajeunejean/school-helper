import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";
import Swiper from "@/Components/SwiperSlider";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Card from "@/Components/Card";
import {
    IoArrowBackCircleOutline,
    IoArrowForwardCircleOutline,
} from "react-icons/io5";

export default function Courses() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <General>
            <Head title="Courses" />

            <main className="">
                <div className=" bg-gradient-to-r from-white to-gray-200">
                    <div className="w-3/4 mx-auto">
                        <h3 className="text-center text-medium pt-10 pb-6 text-3xl text-gray-700">
                            All courses
                        </h3>
                        <p className="text-center text-gray-500 pb-6">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Tempora, eum!
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-5 gap-8 lg:p-8">
                        <Card
                            title={"A title : Introduction to that topic."}
                            category={"A short category"}
                            imgSrc={"/assets/img/WebDev.jpg"}
                        />
                        <Card
                            title={
                                "A long long long long long long long title, please be aware that's a long title  that's a long title that's a long title that's a long title that's a long title"
                            }
                            category={"A long long long long long category"}
                            imgSrc={"/assets/img/Languages.jpg"}
                        />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
                <div className="w-2/3 mx-auto flex justify-around items-center mb-8 text-lg lg:text-2xl">
                    <div className="flex items-center gap-4">
                        <IoArrowBackCircleOutline />

                        <p>Previous</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <p>Next</p>
                        <IoArrowForwardCircleOutline />
                    </div>
                </div>
            </main>
        </General>
    );
}
