import PrimaryButton from "@/Components/PrimaryButton";
import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";
import { Player } from "@lottiefiles/react-lottie-player";
import { IoMail } from "react-icons/io5";
import AOS from "aos";
import { useEffect } from "react";

import "aos/dist/aos.css";

/*min-h-[calc(100vh-125px)]*/

export default function About({ auth }) {

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <General auth={auth}>
            <Head title="About" />
            <div className="bg-gray-200">
                <div className="flex flex-col items-start pt-16">
                    <div className="flex mx-auto w-full" data-aos="fade-right">
                        <h2 className="mx-auto text-medium pt-10 text-4xl text-gray-700 font-semibold">Learn more about us...</h2>
                    </div>
                    <div data-aos="fade-left" className="flex lg:flex-row flex-col items-center justify-between w-3/4 mx-auto">
                        <Player
                            autoplay
                            loop
                            src="/assets/81450-team.json"
                            className="w-[90%]"
                        >
                        </Player>
                        <div data-aos="fade-left">
                            <p className="text-medium text-lg mt-5 mb-5">
                                At <span className="text-indigo-800">School Helper</span>, we believe that every student has the potential to be a hero in their <span className="text-indigo-800">own learning journey</span>. Our platform is <span className="text-indigo-800">designed</span> to <span className="text-indigo-800">empower</span> and <span className="text-indigo-800">inspire</span> students to reach their <span className="text-indigo-800">full potential</span> through engaging, interactive and personalized learning experiences. With a focus on <span className="text-indigo-800">making education accessible to all</span>, we're on a mission to change the way the world learns and create a <span className="text-indigo-800">new generation of heroes</span>, one student at a <span className="text-indigo-800">time</span>.
                            </p>
                            <div className="flex justify-start">
                                <PrimaryButton  children={"CONTACT US"}>
                                    <IoMail size={20} className="mr-7" />
                                    <p className="text-sm">Contact Us</p>
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="mx-auto h-px my-8 bg-gray-300 border-0 dark:bg-gray-700 w-3/4" data-aos="fade-bottom" />

                <div className="flex mx-auto w-full" data-aos="fade-bottom">
                    <h2 className="mx-auto text-medium pt-10 text-4xl text-gray-700 font-semibold">Our Team</h2>
                </div>

                <div data-aos="fade-left" className="grid grid-cols-1 md:grid-cols-2 gap-20 w-3/4 mx-auto pt-10 pb-40 bg-slate-200">

                    <div className="flex flex-col justify-between items-center bg-slate-100 rounded mx-auto">
                        <div className="flex items-center justify-center pt-16">
                            <img className="w-1/2 rounded-full" src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" />
                        </div>
                        <div className="flex items-center justify-center py-5 w-full">
                            <h3 className="text-2xl font-semibold">Sacha</h3>
                        </div>
                        <div className="flex items-center justify-center w-full pb-16">
                            <p className="text-slate-400">
                                Fullstack Developper
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between items-center bg-slate-100 rounded mx-auto">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center pt-16">
                                <img className="w-1/2 rounded-full" src="https://www.w3schools.com/w3images/avatar2.png" alt="avatar" />
                            </div>
                            <div className="flex items-center justify-center py-5 w-full">
                                <h3 className="text-2xl font-semibold">Anselme</h3>
                            </div>
                            <div className="flex items-center justify-center w-full pb-16">
                                <p className="text-slate-400">
                                    Fullstack Developper
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </General>
    );
}
