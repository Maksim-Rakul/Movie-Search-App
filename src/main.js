import Swiper from "swiper/bundle";
import "swiper/css/bundle";

document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".hero__swiper", {
    autoplay: {
      delay: 6000,
    },
    direction: "horizontal",
    loop: true,

    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
      bulletClass: "bullet",
      bulletActiveClass: "active-bullet",
    },

    speed: 700,

    slidesPerView: 1,
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 1,
      },
    },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".movies__cinema", {
    // autoplay: {
    //   delay: 1000,
    // },
    direction: "horizontal",
    loop: true,

    speed: 700,

    navigation: {
      nextEl: ".movie_slide-next",
      prevEl: ".movie_slide-prev",
      addIcons: true,
    },

    spaceBetween: 11,
    slidesPerView: 2,
    breakpoints: {
      375: {
        slidesPerView: 2.3,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 11,
      },
    },
  });
});
