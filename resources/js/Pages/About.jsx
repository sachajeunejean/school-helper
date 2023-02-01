import General from "@/Layouts/GeneralLayout";
import { Head } from "@inertiajs/react";
import { Player } from "@lottiefiles/react-lottie-player";

/*min-h-[calc(100vh-125px)]*/

export default function About({ auth }) {
    return (
        <General auth={auth}>
            <Head title="About" />
            <div className="flex items-start g-gradient-to-r from-white to-gray-200">
                <div className="flex lg:flex-row flex-col items-center justify-between w-3/4 mx-auto mt-10">
                    <Player
                        autoplay
                        loop
                        src="/assets/81450-team.json"
                        className="w-5/6"
                    >
                    </Player>
                    <p className="text-lg mt-5">
                        At <span className="text-indigo-800">School Helper</span>, we believe that every student has the potential to be a hero in their <span className="text-indigo-800">own learning journey</span>. Our platform is <span className="text-indigo-800">designed</span> to <span className="text-indigo-800">empower</span> and <span className="text-indigo-800">inspire</span> students to reach their <span className="text-indigo-800">full potential</span> through engaging, interactive and personalized learning experiences. With a focus on <span className="text-indigo-800">making education accessible to all</span>, we're on a mission to change the way the world learns and create a <span className="text-indigo-800">Snew generation of heroes</span>, one student at a time.
                    </p>
                </div>
            </div>
        </General>
    );
}
