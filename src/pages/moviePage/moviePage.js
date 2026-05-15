import {
  getActorsByMovieId,
  getGalleryByMovieId,
  getMovieById,
  getRecByMovieId,
  getReviewsByMovieId,
  getVideoByMovieId,
} from "../../js/api";
import { mobileMenu } from "../../js/helpers";
import {
  recommendRender,
  renderCastsById,
  renderInfoCastsById,
  renderMediaGallery,
  renderMediaVideo,
  renderMoviePageById,
  renderReviews,
} from "../../js/render";
import { castSliderInit } from "../../js/sliderInit";
import * as refs from "../../js/refs.js";
import GLightbox from "glightbox";
import {
  heroBtnHandler,
  infoNavHandler,
  movieClickHandler,
} from "../../js/handlers.js";

mobileMenu();
castSliderInit();

const id = new URLSearchParams(window.location.search).get("id");
const hero = document.querySelector(".hero");

Promise.all([
  getMovieById(id),
  getVideoByMovieId(id),
  getActorsByMovieId(id),
  getRecByMovieId(id),
  getReviewsByMovieId(id),
  getGalleryByMovieId(id),
]).then((data) => {
  const [movieInfo, video, actor, recommend, reviews, gallery] = data;

  hero.style.background = `
    linear-gradient(
        0deg,
        rgba(10, 10, 10, 1) 30%,
        rgba(0, 0, 0, 0.089) 70%
    ),
    url(https://image.tmdb.org/t/p/original/${movieInfo.backdrop_path})
  `;
  hero.style.backgroundSize = "cover";
  hero.style.backgroundPosition = "center";
  hero.style.backgroundRepeat = "no-repeat";

  renderMoviePageById(movieInfo, video.results[0].key);
  renderInfoCastsById(actor.cast);
  renderCastsById(actor.cast);
  recommendRender(recommend.results);
  renderReviews(reviews.results);
  renderMediaVideo(video.results);
  renderMediaGallery(gallery.backdrops.slice(0, 16));

  const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
  });
});

refs.recommendContainer.addEventListener("click", movieClickHandler);
refs.infoNav.addEventListener("click", infoNavHandler);
