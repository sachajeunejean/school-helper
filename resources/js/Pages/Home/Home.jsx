import { Head } from "@inertiajs/react";
import { Player } from "@lottiefiles/react-lottie-player";
import {
    IoInformationCircleOutline,
    IoFileTrayFull,
    IoMail,
    IoSearchOutline,
} from "react-icons/io5";
import FirstSection from "@/Pages/Home/Partials/FirstSection";
import SecondSection from "@/Pages/Home/Partials/SecondSection";
import ThirdSection from "@/Pages/Home/Partials/ThirdSection";
import PrimaryButton from "@/Components/PrimaryButton";
import General from "@/Layouts/GeneralLayout";

export default function Home({ auth }) {
    return (
        <General auth={auth}>
            <Head title="Home" />
            <main className="overflow-hidden ">
                <FirstSection
                    title={"School Helper"}
                    background={"bg-gradient-to-r from-white to-gray-200"}
                    subtitle={[
                        "A ",
                        <span
                            key={"subtitleSpanOne"}
                            className="text-indigo-700"
                        >
                            free
                        </span>,
                        " and ",
                        <span
                            key={"subtitleSpanTwo"}
                            className="text-indigo-700"
                        >
                            shared
                        </span>,
                        " digital plateform.",
                    ]}
                    text={
                        "School Helper is an innovative and dynamic online learning platform that provides free and accessible education for all. With a vast selection of courses spanning across various subjects, students and educators can easily find the resources they need to enhance their knowledge and skills."
                    }
                    img={
                        <Player
                            autoplay
                            loop
                            src="/assets/lottiefile-girl-laptop.json"
                        ></Player>
                    }
                    hrefBtn={route("courses")}
                    textBtn={<p className="text-sm">See all courses</p>}
                    iconBtn={<IoFileTrayFull size={20} className="mr-7" />}
                    textBtnBis={<p className="text-sm">Search course</p>}
                    iconBtnBis={<IoSearchOutline size={20} className="mr-7" />}
                />

                <hr className="h-[2px] bg-gray-200" />
                <SecondSection
                    background={"bg-gradient-to-l from-white to-gray-200"}
                    title={"School Helper"}
                    subtitle={[
                        <span
                            key={"subtitleSpanOne"}
                            className="text-indigo-700"
                        >
                            Designed
                        </span>,
                        " for learners.",
                    ]}
                    text={
                        "The website is designed with a user-friendly interface and easy navigation, making it simple for users to find the courses that interest them. Users can also create their own courses and share them with others, contributing to the growing community of lifelong learners."
                    }
                    img={
                        <Player
                            autoplay
                            loop
                            src="/assets/lottiefile-online-learning.json"
                            style={{ scale: ".8" }}
                        ></Player>
                    }
                    hrefBtn={route("about")}
                    textBtn={<p className="text-sm">About Us</p>}
                    iconBtn={
                        <IoInformationCircleOutline
                            size={20}
                            className="mr-7"
                        />
                    }
                    hrefBtnBis={route("contact")}
                    textBtnBis={<p className="text-sm">Contact Us</p>}
                    iconBtnBis={<IoMail size={20} className="mr-7" />}
                />
                <hr className="h-[2px] bg-gray-200" />

                <ThirdSection
                    title={"The world of learning is at your fingertips"}
                    subtitle={[
                        <span
                            key={"subtitleSpanOne"}
                            className="text-indigo-700"
                        >
                            Sign up
                        </span>,
                        " today !",
                    ]}
                    text={[
                        "School Helper is committed to empowering learners of all ages and backgrounds to take control of their education and achieve their full potential.",
                        <br key={"lineBreak"} />,
                        "Sign up today and start exploring the vast array of courses and resources available on the platform.",
                    ]}
                    img={
                        <Player
                            autoplay
                            loop
                            src="/assets/lottiefile-back-to-school.json"
                            style={{
                                maxHeight: "400px",
                                maxWidth: "400px",
                            }}
                        ></Player>
                    }
                />
            </main>
        </General>
    );
}
