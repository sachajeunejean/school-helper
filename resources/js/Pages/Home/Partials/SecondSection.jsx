import PrimaryButton from "@/Components/PrimaryButton";
import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";
import { Player } from "@lottiefiles/react-lottie-player";
import { IoArrowRedoOutline, IoFileTrayFull, IoMail } from "react-icons/io5";
import { useEffect } from "react";
import AOS from "aos";

import "aos/dist/aos.css";

export default function FirstSection({
    background,
    title,
    subtitle,
    text,
    img,
    hrefBtn,
    textBtn,
    iconBtn,
    hrefBtnBis,
    textBtnBis,
    iconBtnBis,
}) {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div
            className={`flex justify-center items-center pb-8 2xl:py-36 ${background} min-h-[100vh]`}
        >
            <div className="CONTAINER grid xl:grid-cols-2 w-11/12 lg:w-3/4 mx-auto items-center">
                <div
                    className="w-11/12 mx-auto hidden xl:flex"
                    data-aos="fade-right"
                >
                    {img}
                </div>
                <div
                    className="flex  flex-col justify-center items-center text-center w-11/12 mx-auto"
                    data-aos="fade-left"
                >
                    <h3 className="text-medium pt-10 pb-6 text-5xl text-gray-700">
                        {title}
                    </h3>
                    <h3 className="text-medium pb-10 text-3xl text-gray-700">
                        {subtitle}
                    </h3>
                    <p className=" text-gray-500 leading-8">{text}</p>
                    <div className="hidden xl:flex  justify-center gap-20">
                        <a href={hrefBtn} className="flex items-center">
                            <PrimaryButton className="mr-5 my-8 xl:my-14">
                                {iconBtn}
                                {textBtn}
                            </PrimaryButton>
                        </a>
                        <a href={hrefBtnBis} className="flex items-center">
                            <PrimaryButton className="mr-5 xl:my-14">
                                {iconBtnBis}
                                {textBtnBis}
                            </PrimaryButton>
                        </a>
                    </div>
                </div>
                <div className="mx-auto flex xl:hidden" data-aos="fade-right">
                    {img}
                </div>
                <div className="flex flex-col justify-center gap-4 my-8 mx-auto md:flex-row xl:hidden">
                    <a href={hrefBtn} className="flex items-center">
                        <PrimaryButton className="w-full">
                            {iconBtn}
                            <p className="mr-4 ml-1">{textBtn}</p>
                        </PrimaryButton>
                    </a>
                    <a href={hrefBtnBis} className="flex items-center">
                        <PrimaryButton>
                            {iconBtnBis}
                            {textBtnBis}
                        </PrimaryButton>
                    </a>
                </div>
            </div>
        </div>
    );
}
