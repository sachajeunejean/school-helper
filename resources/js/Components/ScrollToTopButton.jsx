import React, { useEffect, useState } from "react";
import { IoArrowUp } from "react-icons/io5";
export default function ScrollToTopButton() {
    // get previous scroll position
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;

        if (currentScrollPos > 80 && currentScrollPos > prevScrollPos) {
            setVisible(false);
        } else {
            setVisible(true);
        }

        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    });
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div
            className={`fixed bottom-14 right-8 z-50 text-gray-100 bg-indigo-700 rounded-full p-3 hover:cursor-pointer hover:bg-transparent hover:ring-2 hover:ring-indigo-700 hover:text-indigo-700   transition-all ${
                visible ? "translate-x-36" : "translate-x-0"
            }`}
        >
            <IoArrowUp size={24} onClick={goToTop} />
        </div>
    );
}
