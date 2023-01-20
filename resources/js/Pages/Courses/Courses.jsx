import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";
import Swiper from "@/Components/SwiperSlider";
import { useEffect } from "react";
import AOS from "aos";

import "aos/dist/aos.css";

export default function Courses() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <General>
            <Head title="Courses" />

            <main className="h-[calc(100vh-125px)]">
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
                </div>
                <div data-aos="zoom-in" data-aos-duration="1250">
                    <Swiper />
                </div>
            </main>
        </General>
    );
}
