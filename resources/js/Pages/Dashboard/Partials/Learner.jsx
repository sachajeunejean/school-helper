import SwiperSlider from "@/Components/SwiperSlider"

export default function Learner( { user, followedCourses } ) {

    return (
        <div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-10">
                <div className="p-6 text-gray-900 font-bold">Hello, 
                    <span className="text-indigo-800"> {user.username}</span>!</div>
                    <div className="p-6 mt-[-40px] text-gray-900 font-bold">You are following <span className="text-indigo-800"> {followedCourses ? followedCourses.length : 0}</span> courses.</div>
            </div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">My followed courses</div>
            </div>
            <SwiperSlider courses={followedCourses} />
        </div>

    )

}
