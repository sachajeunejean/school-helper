import Footer from "@/Components/Footer";
import NavBar from "@/Components/NavBar";
import ScrollToTopButton from "@/Components/ScrollToTopButton";

export default function General({
    auth,
    courses,
    children,
    formattedQuery,
    setFormattedQuery,
}) {
    return (
        <>
            <NavBar
                auth={auth}
                courses={courses}
                formattedQuery={formattedQuery}
                setFormattedQuery={setFormattedQuery}
            />
            <main>
                {children}
                <ScrollToTopButton />
            </main>
            <Footer />
        </>
    );
}
