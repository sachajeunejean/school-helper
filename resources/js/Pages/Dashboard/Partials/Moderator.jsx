import SwiperSlider from "@/Components/SwiperSlider"

export default function Moderator( { user, followedCourses, createdCourses, feedbacksGiven, coursesFeedbacks } ) {

    return (
        <div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-10">
                <div className="p-6 text-gray-900 font-bold">Hello, <span className="text-indigo-800"> {user.username}</span>!</div>
                <div className="p-6 mt-[-40px] text-gray-900 font-bold">You have published <span className="text-indigo-800"> {createdCourses ? createdCourses.length : 0}</span> courses and you are following <span className="text-indigo-800"> {followedCourses ? followedCourses.length : 0}</span> courses.</div>
            </div>
            <div className="flex justify-between bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">My given feedbacks</div>
                <a href="/dashboard/feedbacks/new" className={`inline-flex items-center justify-center mx-5 my-5 px-2 py-1 text-xs bg-indigo-800 border border-transparent font-semibold text-white uppercase tracking-widest hover:bg-indigo-700 focus:outline-none transition ease-in-out duration-150`}>NEW FEEDBACK</a>
            </div>
                <div className="mt-6 mb-6 mx-5">
                    {
                        feedbacksGiven ? 
                        
                        (feedbacksGiven.map((feedback, key) => {
                            return (
                                <div key={key} className="flex flex-col p-6 bg-gray-50 mb-10" >
                                    <div className="flex justify-between mb-5">
                                        <p className={feedback.status === 'accepted' ? "font-bold uppercase text-green-500" : "font-bold uppercase text-red-500" }>[{feedback.status}]</p>
                                        <p>{feedback.created_at}</p>
                                    </div>
                                    <p>{feedback.content}</p>
                                </div>
                            )
                        })) 

                        :

                        "No feedbacks."
                    }
                </div>
            <div className="flex justify-between bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">My created courses</div>
                <a href="/courses/new" className={`inline-flex items-center justify-center mx-5 my-5 px-2 py-1 text-xs bg-indigo-800 border border-transparent font-semibold text-white uppercase tracking-widest hover:bg-indigo-700 focus:outline-none transition ease-in-out duration-150`}>NEW COURSE</a>
            </div>
            <SwiperSlider courses={createdCourses} />
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">My followed courses</div>
            </div>
            <SwiperSlider courses={followedCourses} />
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">My courses feedbacks</div>
            </div>
            <div className="mt-6 mb-6 mx-10">
                {
                    coursesFeedbacks ? 
                    
                    (coursesFeedbacks.map((feedback, key) => {
                        return (
                            <div key={key} className="flex flex-col p-6 bg-gray-50 mb-10" >
                                <div className="flex justify-between mb-5">
                                <p className={feedback.status === 'accepted' ? "font-bold uppercase text-green-500" : "font-bold uppercase text-red-500" }>[{feedback.status}]</p>
                                <p>{feedback.created_at}</p>
                                </div>
                                <p>{feedback.content}</p>
                            </div>
                        )
                    })) 

                    :

                    "No feedbacks."
                }
            </div>
        </div>
    )

}
