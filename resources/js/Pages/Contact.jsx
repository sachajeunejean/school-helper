import PrimaryButton from "@/Components/PrimaryButton";
import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";
import { Player } from "@lottiefiles/react-lottie-player";
import { AiOutlinePhone } from "react-icons/ai";
import { IoMail } from "react-icons/io5";
import { GrCircleInformation } from "react-icons/gr";
import AOS from "aos";
import { useEffect } from "react";

import "aos/dist/aos.css";

export default function Contact({ auth }) {
    const submit = (e) => {
        e.preventDefault();

        console.log("submit");
    };

    const onHandleChange = (e) => {
        console.log("");
    };

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <General auth={auth}>
            <Head title="Contact" />
            <div className="py-16 lg:py-28 min-h-[calc(100vh-125px)]">
                <div data-aos="fade-right">
                    <h2 className="mx-auto w-[90%] text-center text-medium text-4xl text-gray-700 font-semibold">
                        Any <span className="text-indigo-800">questions</span> ?
                        Contact <span className="text-indigo-800">us</span> !
                    </h2>
                </div>
                <div
                    data-aos="fade-left"
                    className="flex flex-col lg:flex-row items-center justify-center mr-10 lg:mt-20 gap-10"
                >
                    <div className="max-w-lg h-auto 2xl:max-w-3xl 2xl:pr-44">
                        <Player
                            autoplay
                            loop
                            src="/assets/94599-contact-us.json"
                            // style={{
                            //     maxHeight: "500px",
                            //     maxWidth: "500px",
                            //     marginRight: "100px",
                            // }}
                        ></Player>
                    </div>
                    <div className="flex flex-col 2xl:pr-16">
                        <h3 className="text-3xl mb-10">
                            <span className="text-indigo-800">Our</span>{" "}
                            Informations
                        </h3>
                        <div className="flex flex-row items-center mb-10">
                            <AiOutlinePhone
                                size={30}
                                className="mr-3 text-indigo-800"
                            />
                            <p className="font-medium hover:underline cursor-pointer">
                                +32 00 00 00
                            </p>
                        </div>
                        <div className="flex flex-row items-center mb-10">
                            <IoMail
                                size={30}
                                className="mr-3 text-indigo-800"
                            />
                            <p className="font-medium hover:underline cursor-pointer">
                                support@school-helper.com
                            </p>
                        </div>
                        <div className="flex flex-row items-center">
                            <GrCircleInformation
                                size={30}
                                className="mr-3 text-indigo-800"
                            />
                            <p className="font-medium ">
                                The{" "}
                                <span className="text-indigo-800">team</span> is
                                avaible to resolve{" "}
                                <span className="text-indigo-800">your</span>{" "}
                                issues.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </General>
    );
}
