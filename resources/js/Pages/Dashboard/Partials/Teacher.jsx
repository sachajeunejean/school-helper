import PrimaryButton from "@/Components/PrimaryButton"
import SwiperSlider from "@/Components/SwiperSlider"
import { useState } from "react";

export default function Teacher( { user, followedCourses, createdCourses, coursesFeedbacks } ) {

    const [courseTitle, setCourseTitle] = useState("");


    return (
        <div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-10">
                <div className="p-6 text-gray-900 font-bold">Hello, <span className="text-indigo-800"> {user.username}</span>!</div>
                <div className="p-6 mt-[-40px] text-gray-900 font-bold">You have published <span className="text-indigo-800"> {createdCourses ? createdCourses.length : 0}</span> courses and you are following <span className="text-indigo-800"> {followedCourses ? followedCourses.length : 0}</span> courses.</div>
            </div>
            <div className="flex justify-between bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">My created courses</div>
                <a href="/courses/new" className={`inline-flex items-center justify-center mx-5 my-5 px-2 py-1 text-xs bg-indigo-800 border border-transparent font-semibold text-white uppercase tracking-widest hover:bg-indigo-700 focus:outline-none transition ease-in-out duration-150`}>NEW COURSE</a>
            </div>
            <SwiperSlider courses={createdCourses} />
            <div className="flex justify-between bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">Add new chapters</div>
            </div>
            <div className="flex flex-col mt-6 mb-6 mx-16">
                <div>
                    <label>Select the course to add a new chapter :</label>
                </div>
                <div className="flex flex-col md:flex-row">
                    <select className="w-full md:w-3/4 md:mx-5 my-5 px-4 py-3" onChange={(e) => setCourseTitle(e.target.value)}>
                        <option selected disabled hidden>Select course</option>
                        {
                            createdCourses.map((course, key) => {
                                return (
                                    <option key={key} value={course.formatted_title}>{course.title}</option>
                                )
                            })
                        }
                    </select>
                    <a href={"/courses/" + courseTitle + "/new-chapter"} className={`inline-flex items-center justify-center md:mx-5 md:my-5 px-5 py-3 text-xs bg-indigo-800 border border-transparent font-semibold text-white uppercase tracking-widest hover:bg-indigo-700 focus:outline-none transition ease-in-out duration-150`}>NEW CHAPTER</a>
                </div>
            </div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">My followed courses</div>
            </div>
            <SwiperSlider courses={followedCourses} />
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">My courses feedbacks</div>
            </div>
            <div className="mt-6 mb-6 mx-10">
                {console.log(coursesFeedbacks)}
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
