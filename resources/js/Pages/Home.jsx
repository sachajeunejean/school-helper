import { Head } from "@inertiajs/react";
import { Player } from "@lottiefiles/react-lottie-player";
import { IoArrowRedoOutline, IoFileTrayFull, IoMail } from "react-icons/io5";
import HomeHero from "@/Components/HomeHero";
import HomeLast from "@/Components/HomeLast";
import PrimaryButton from "@/Components/PrimaryButton";
import General from "@/Layouts/GeneralLayout";

export default function Home() {
    return (
        <General>
            <Head title="Home" />
            <main className="overflow-hidden">
                <HomeHero
                    title={"School Helper"}
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
                            src="/assets/School-lottiefile-girl-laptop.json"
                        ></Player>
                    }
                    hrefBtn={route("courses")}
                    textBtn={"Courses"}
                    iconBtn={<IoArrowRedoOutline size={20} className="mr-2" />}
                />

                <hr className="h-[2px] bg-gray-200" />
                <HomeHero
                    background={"bg-gradient-to-l from-white to-gray-200"}
                    title={"School Helper"}
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
                    subtitleSpan={"free"}
                    text={
                        "The website is designed with a user-friendly interface and easy navigation, making it simple for users to find the courses that interest them. Users can also create their own courses and share them with others, contributing to the growing community of lifelong learners."
                    }
                    img={
                        <img
                            src="/assets/img/Boy-attending-video-lecture.svg"
                            alt="Boy attending video lecture"
                            className="p-5 lg:max-w-lg"
                        />
                    }
                />
                <hr className="h-[2px] bg-gray-200" />

                <HomeLast
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
                        "School Helper is committed to empowering learners of all ages and backgrounds to take control of their education and achieve their full potential. Sign up today and start exploring the vast array of courses and resources available on the platform.",
                    ]}
                    img={
                        <Player
                            autoplay
                            loop
                            src="/assets/School-lottiefile-girl-laptop.json"
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
