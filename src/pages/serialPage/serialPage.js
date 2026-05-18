import GLightbox from "glightbox";
import {
  getCastSerialById,
  getSeasonSerialById,
  getRecSerialById,
  getSerialById,
  getVideoSerialById,
  getReviewsBySerialsId,
  getImgBySerialId,
} from "../../js/api";
import { mobileMenu } from "../../js/helpers";
import {
  recommendRender,
  renderCastsById,
  renderInfoCastsById,
  renderMediaGallery,
  renderMediaVideo,
  renderReviews,
  renderSerialPageById,
  serialsEpisodRender,
  serialsSeasonNavRender,
} from "../../js/render";
import * as refs from "../../js/refs.js";
import {
  castClickHandler,
  episodClickHandler,
  infoNavHandler,
  movieClickHandler,
  seasonClickHandler,
} from "../../js/handlers.js";
import { castSliderInit } from "../../js/sliderInit.js";

mobileMenu();
castSliderInit();

const url = new URLSearchParams(window.location.search);
const id = url.get("id");
const hero = document.querySelector(".hero");

const initPage = async () => {
  const [serialInfo, video, actor, recommend, reviews, images] =
    await Promise.all([
      getSerialById(id),
      getVideoSerialById(id),
      getCastSerialById(id),
      getRecSerialById(id),
      getReviewsBySerialsId(id),
      getImgBySerialId(id),
    ]);

  const trailer = video.results.find((item) => {
    return item.type === "Trailer";
  });

  const firstSeason = serialInfo.seasons[0].season_number;

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
  renderReviews(reviews.results);
  renderMediaVideo(video.results);
  renderMediaGallery(images.backdrops.slice(0, 16));

  const seasonData = await getSeasonSerialById(id, firstSeason);
  serialsEpisodRender(seasonData);
  serialsSeasonNavRender(serialInfo);
  refs.serialsEpisodNavContainer.children[0].classList.add("active-btn");

  refs.recommendContainer.addEventListener("click", movieClickHandler);
  refs.infoCastContainer.addEventListener("click", castClickHandler);
  refs.castContainer.addEventListener("click", castClickHandler);
  refs.serialsEpisodContainer.addEventListener("click", episodClickHandler);
  refs.serialsEpisodNavContainer.addEventListener("click", (event) => {
    seasonClickHandler(event, id);
  });
  refs.seasonCount.textContent = serialInfo.seasons.length;

  const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
  });
};

initPage();
refs.infoNav.addEventListener("click", infoNavHandler);
