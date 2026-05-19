import Swiper from "swiper/bundle";
import "swiper/css";

export function banerSliderInit() {
  document.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper(".hero__swiper", {
      autoplay: {
        delay: 6000,
        disableOnInteraction: false, // продовжувати автоплей після взаємодії
      },
      direction: "horizontal",
      loop: true,

      navigation: {
        nextEl: ".hero_slide-next",
        prevEl: ".hero_slide-prev",
        addIcons: true,
      },

      speed: 700,
      slidesPerView: 1,
    });
    swiper.on("init", function () {
      this.pagination.init();
      this.pagination.render();
      this.pagination.update();
    });
  });
}

export function sliderInit() {
  const swiper = new Swiper(".movies__cinema", {
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
      },
    },
  });
}

export function castSliderInit() {
  const swiper = new Swiper(".cast__slider", {
    direction: "horizontal",
    loop: true,
    slidesPerView: 3,
    spaceBetween: 8,

    speed: 700,

    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
  });
}
