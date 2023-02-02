import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="w-full text-center py-5 bg-white bottom-0 flex">
            <div className="w-full justify-between md:flex md:items-center px-4 text-sm space-y-3 md:space-y-0">
                <p className="flex-grow basis-0">School Helper © 2023</p>
                <p>Anselme & Sacha</p>
                <div className="space-x-5 text-gray-600 flex-grow basis-0">
                    <Link
                        href="#"
                        className="hover:underline hover:text-black underline-offset-4"
                    >
                        About
                    </Link>
                    <Link
                        href="#"
                        className="hover:underline hover:text-black underline-offset-4"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="#"
                        className="hover:underline hover:text-black underline-offset-4"
                    >
                        Licensing
                    </Link>
                    <Link
                        href="#"
                        className="hover:underline hover:text-black underline-offset-4"
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    );
}
