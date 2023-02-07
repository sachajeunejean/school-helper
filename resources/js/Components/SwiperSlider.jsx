import { Navigation, Pagination, A11y, Autoplay, Keyboard } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import { BiRightArrowCircle, BiLeftArrowCircle } from "react-icons/bi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default ({ courses }) => {
    return (
        <div className="relative">
            {/* <div className="image-swiper-button-next right-10 absolute top-1/2 z-10 hidden xl:block">
                <BiRightArrowCircle size={32} color="rgb(67 56 202)" />
            </div>
            <div className="image-swiper-button-prev left-10  absolute top-1/2 z-10 hidden xl:block">
                <BiLeftArrowCircle size={32} color="rgb(67 56 202)" />
            </div> */}
            <Swiper
                style={{
                    "--swiper-pagination-color": "blue",
                    "--swiper-pagination-bullet-inactive-color": "#999999",
                    "--swiper-pagination-bullet-inactive-opacity": "0.5",
                    "--swiper-pagination-bullet-size": "8px",
                    "--swiper-pagination-bullet-horizontal-gap": "6px",
                }}
                modules={[Navigation, Pagination, A11y, Autoplay, Keyboard]}
                spaceBetween={100}
                slidesPerView={1}
                // navigation={{
                //     nextEl: ".image-swiper-button-next",
                //     prevEl: ".image-swiper-button-prev",
                // }}
                className="mySwiper"
                keyboard
                // autoplay={{ delay: 4500 }}
                speed={600}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                breakpoints={{
                    1024: {
                        slidesPerView: 2,
                    },
                    1440: {
                        slidesPerView: 3,
                    },
                }}
            >
                {

                    (courses) ?

                        courses.map((course, key) => {

                            return (
                                <SwiperSlide key={key}>
                                    <Card
                                        title={course.title}
                                        category={course.category}
                                        formatted_title={course.formatted_title}
                                        description={course.description}
                                        status={course.status}
                                        imgSrc={"/resources/images/" + course.preview_image}
                                    />
                                </SwiperSlide>
                            )

                        })

                    :

                    <div className="p-10">
                        No courses.
                    </div>

                }

                {/*<SwiperSlide>
                    <Card
                        title={"Learn JavaScript Fundamentals"}
                        category={"Web Development"}
                        chapter={"3 Chapters"}
                        author={"Sacha Jeunejean"}
                        imgSrc={"/assets/img/WebDev.jpg"}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Card
                        title={"Learn Flexbox CSS"}
                        chapter={"Single Course"}
                        category={"Web Development"}
                        author={"Anselme Dor"}
                        imgSrc={"/assets/img/WebDev.jpg"}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Card
                        title={"Harder Math Principle"}
                        chapter={"2 Chapters"}
                        category={"Mathematics"}
                        author={"Travis Scott"}
                        imgSrc={"/assets/img/Mathematics.jpg"}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Card
                        title={"Everything there is to know in French"}
                        chapter={"18 Chapters"}
                        category={"Languages"}
                        author={"Kekra"}
                        imgSrc={"/assets/img/Languages.jpg"}
                    />
                </SwiperSlide>*/}
            </Swiper>
        </div>
    );
};
