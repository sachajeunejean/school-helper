import { Navigation, Pagination, A11y, Autoplay, Keyboard } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Card from "@/Components/Card";

export default ({ courses }) => {
    return (
        <div className="relative">
            <Swiper
                style={{
                    "--swiper-pagination-color": "blue",
                    "--swiper-pagination-bullet-inactive-color": "#999999",
                    "--swiper-pagination-bullet-inactive-opacity": "0.5",
                    "--swiper-pagination-bullet-size": "8px",
                    "--swiper-pagination-bullet-horizontal-gap": "6px",
                    paddingBottom: "20px",
                }}
                modules={[Navigation, Pagination, A11y, Autoplay, Keyboard]}
                spaceBetween={100}
                slidesPerView={1}
                className="mySwiper"
                keyboard
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
                {courses ? (
                    courses.map((course, key) => {
                        return (
                            <SwiperSlide key={key}>
                                <Card
                                    title={course.title}
                                    category={course.category
                                        .split("_")
                                        .join(" ")}
                                    formatted_title={course.formatted_title}
                                    description={course.description}
                                    status={course.status}
                                    imgSrc={
                                        "/assets/img/" +
                                        course.category +
                                        ".jpg"
                                    }
                                />
                            </SwiperSlide>
                        );
                    })
                ) : (
                    <div className="p-10">No courses.</div>
                )}
            </Swiper>
        </div>
    );
};
