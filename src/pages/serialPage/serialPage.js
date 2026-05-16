import GLightbox from "glightbox";
import {
  getCastSerialById,
  getRecSerialById,
  getSerialById,
  getVideoSerialById,
} from "../../js/api";
import { mobileMenu } from "../../js/helpers";
import {
  recommendRender,
  renderCastsById,
  renderInfoCastsById,
  renderSerialPageById,
} from "../../js/render";
import * as refs from "../../js/refs.js";
import {
  castClickHandler,
  infoNavHandler,
  movieClickHandler,
} from "../../js/handlers.js";
import { castSliderInit } from "../../js/sliderInit.js";

mobileMenu();
castSliderInit();

const url = new URLSearchParams(window.location.search);
const id = url.get("id");

const hero = document.querySelector(".hero");

Promise.all([
  getSerialById(id),
  getVideoSerialById(id),
  getCastSerialById(id),
  getRecSerialById(id),
]).then((data) => {
  const [serialInfo, video, actor, recommend] = data;

  const trailer = video.results.find((item) => {
    return item.type === "Trailer";
  });

  hero.style.background = `
    linear-gradient(
        0deg,
        rgba(10, 10, 10, 1) 30%,
        rgba(0, 0, 0, 0.089) 70%
    ),
    url(https://image.tmdb.org/t/p/original/${serialInfo.backdrop_path})
  `;
  hero.style.backgroundSize = "cover";
  hero.style.backgroundPosition = "center";
  hero.style.backgroundRepeat = "no-repeat";

  renderSerialPageById(serialInfo, trailer);
  renderInfoCastsById(actor.cast);
  renderCastsById(actor.cast);
  recommendRender(recommend.results);

  refs.recommendContainer.addEventListener("click", movieClickHandler);
  refs.infoCastContainer.addEventListener("click", castClickHandler);
  refs.castContainer.addEventListener("click", castClickHandler);

  const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
  });
});

refs.infoNav.addEventListener("click", infoNavHandler);
