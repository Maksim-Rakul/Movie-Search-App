import {
  getActorsByMovieId,
  getGalleryByMovieId,
  getMovieById,
  getRecByMovieId,
  getReviewsByMovieId,
  getVideoByMovieId,
} from "../../js/api";
import { hideLoader, mobileMenu, showLoader } from "../../js/helpers";
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
  castClickHandler,
  heroBtnHandler,
  infoNavHandler,
  movieClickHandler,
} from "../../js/handlers.js";
import search from "../../js/search.js";

const url = new URLSearchParams(window.location.search);
const id = url.get("id");
const hero = document.querySelector(".hero");

mobileMenu();
castSliderInit();
search();
initMoviePage();
showLoader();

refs.infoNav.addEventListener("click", infoNavHandler);

async function initMoviePage() {
  try {
    const [movieInfo, video, actor, recommend, reviews, gallery] =
      await Promise.all([
        getMovieById(id),
        getVideoByMovieId(id, "videos"),
        getActorsByMovieId(id, "credits"),
        getRecByMovieId(id, "recommendations"),
        getReviewsByMovieId(id, "reviews"),
        getGalleryByMovieId(id, "images"),
      ]);

    hero.style.background = `
    linear-gradient(
        0deg,
        rgba(10, 10, 10, 1) 30%,
        rgba(0, 0, 0, 0.089) 70%
    ),
    url(https://image.tmdb.org/t/p/w1280/${movieInfo.backdrop_path})
  `;
    hero.style.backgroundSize = "cover";
    hero.style.backgroundPosition = "center";
    hero.style.backgroundRepeat = "no-repeat";

    const trailer = video.results.find((item) => {
      return item.type === "Trailer";
    });

    renderMoviePageById(movieInfo, trailer);
    renderInfoCastsById(actor.cast);
    renderCastsById(actor.cast);
    recommendRender(recommend.results);
    renderReviews(reviews.results);
    renderMediaVideo(video.results);
    renderMediaGallery(gallery.backdrops);

    refs.recommendContainer.addEventListener("click", movieClickHandler);
    refs.infoCastContainer.addEventListener("click", castClickHandler);
    refs.castContainer.addEventListener("click", castClickHandler);

    const lightbox = GLightbox({
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    hideLoader();
  }
};

