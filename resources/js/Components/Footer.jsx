import { Link } from "@inertiajs/inertia-react";

export default function Footer() {
    return (
        <footer className="w-full text-center">
            <hr className="p-2" />
            <div className="w-full justify-between sm:flex sm:items-center sm:justify-between px-4 text-sm">
                <div>School Helper © 2023</div>
                <Link href="#">Anselme & Sacha</Link>
                <div className="space-x-5 text-gray-600">
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
