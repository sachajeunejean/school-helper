import Footer from "@/Components/Footer";
import NavBar from "@/Components/NavBar";
import ScrollToTopButton from "@/Components/ScrollToTopButton";

export default function General({ auth, courses, children }) {
    return (
        <>
            <NavBar auth={auth} courses={courses} />
            
            <main>
                {children}
                <ScrollToTopButton />
            </main>
            <Footer />
        </>
    );
}
