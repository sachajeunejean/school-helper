import Footer from "@/Components/Footer";
import NavBar from "@/Components/NavBar";

export default function General({ children }) {
    return (
        <>
            <NavBar />
            <main>{children}</main>
            <Footer />
        </>
    );
}
