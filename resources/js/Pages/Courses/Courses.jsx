import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";
import Swiper from "@/Components/SwiperSlider";

export default function Courses() {
    return (
        <General>
            <Head title="Courses" />

            <div className="bg-gray-200 py-4">
                <h2 className="text-center text-4xl underline underline-offset-2 text-gray-800">
                    Courses recently added
                </h2>
            </div>
            <Swiper />
        </General>
    );
}
