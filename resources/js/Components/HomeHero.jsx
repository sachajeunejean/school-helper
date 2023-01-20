import PrimaryButton from "@/Components/PrimaryButton";
import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";
import { Player } from "@lottiefiles/react-lottie-player";
import { IoArrowRedoOutline, IoFileTrayFull, IoMail } from "react-icons/io5";
import { useEffect } from "react";
import AOS from "aos";

import "aos/dist/aos.css";

export default function HomeHero({
    background,
    title,
    subtitle,
    text,
    img,
    hrefBtn,
    textBtn,
    iconBtn,
}) {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className={`pb-8 2xl:py-28 ${background}`}>
            <div className="CONTAINER grid xl:grid-cols-2 w-[90%] lg:w-3/4 mx-auto ">
                <div className="RIGHT w-3/4 mx-auto" data-aos="fade-right">
                    <h3 className="text-medium pt-10 pb-6 text-5xl text-gray-700">
                        {title}
                    </h3>
                    <h3 className="text-medium pb-10 text-3xl text-gray-700">
                        {subtitle}
                    </h3>
                    <p className=" text-gray-500 leading-8">{text}</p>
                    <div className="hidden xl:flex  justify-center">
                        <PrimaryButton className="mr-5 my-14">
                            <a href={hrefBtn} className="flex items-center">
                                {iconBtn}
                                {textBtn}
                            </a>
                        </PrimaryButton>
                    </div>
                </div>
                <div
                    className="flex mx-auto max-w-[700px] justify-center items-center"
                    data-aos="fade-left"
                >
                    {img}
                </div>
                <div className="flex flex-col justify-center gap-4 w-3/4 mx-auto sm:flex-row xl:hidden">
                    <PrimaryButton className="mr-5 my-14">
                        <a href={hrefBtn} className="flex items-center">
                            {iconBtn}
                            {textBtn}
                        </a>
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}
