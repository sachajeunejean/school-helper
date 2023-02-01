import { Player } from "@lottiefiles/react-lottie-player";
import PrimaryButton from "@/Components/PrimaryButton";
import { IoArrowRedoOutline } from "react-icons/io5";

export default function ThirdSection({ title, subtitle, text, img }) {
    return (
        <div className="flex justify-center items-center bg-gradient-to-r from-white to-gray-200 pb-4 2xl:pt-28 2xl:pb-14 min-h-[calc(100vh-100px)]">
            <div className="w-3/4 mx-auto">
                <div data-aos="zoom-in">
                    <h3 className="text-medium text-center pt-10 pb-6 text-5xl text-gray-700">
                        {title}
                    </h3>
                    <h3 className="text-medium text-center pb-10 text-3xl text-gray-700">
                        {subtitle}
                    </h3>
                    <p className="text-center text-gray-500">{text}</p>
                </div>
                <div data-aos="fade-up">{img}</div>
                <div
                    className="flex justify-center"
                    data-aos="zoom-in"
                    data-aos-anchor-placement="bottom-bottom"
                >
                    <PrimaryButton>
                        <a
                            href={route("register")}
                            className="flex items-center"
                        >
                            <IoArrowRedoOutline
                                size={20}
                                style={{ marginRight: "12px" }}
                            />
                            Sign up
                        </a>
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}
