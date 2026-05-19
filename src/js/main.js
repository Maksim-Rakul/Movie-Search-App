import Swiper from "swiper";
import {
  getBanerMovies,
  getKeyword,
  getMovieGanres,
  getPopularMovie,
  getPopularTV,
  getRatingTV,
  getSoonMovie,
  getTopRatedMovie,
} from "./api.js";
import { hideLoader, mobileMenu, showLoader } from "./helpers.js";
import * as refs from "./refs.js";
import {
  allMovieListRender,
  banerRender,
  ganresRender,
  renderSearch,
} from "./render.js";
import { banerSliderInit, sliderInit } from "./sliderInit.js";
import {
  banerMoreBtnHandler,
  changeGanreHandler,
  changeTypeHandler,
  movieClickHandler,
} from "./handlers.js";
import { createSearchOptimizer } from "search-optimizer";
import search from "./search.js";

mobileMenu();
banerSliderInit();
search();
showLoader();
initPage();

async function initPage() {
  try {
    const [baner, genres, list] = await Promise.all([
      getBanerMovies(),
      getMovieGanres(),
      Promise.all([
        getBanerMovies(),
        getPopularMovie(),
        getTopRatedMovie(),
        getSoonMovie(),
        getPopularTV(),
        getRatingTV(),
      ]),
    ]);

    const banerArr = baner.res.results.slice(0, 5);

    banerRender(banerArr);
    ganresRender(genres.genres);
    allMovieListRender(list);

    refs.banerContainer.addEventListener("click", banerMoreBtnHandler);
    refs.ganresContainer.addEventListener("click", changeGanreHandler);
    refs.categoryType.addEventListener("click", changeTypeHandler);
    refs.allMoviesContainer.addEventListener("click", movieClickHandler);

    sliderInit();
  } catch (err) {
    console.log(err.message);
  } finally {
    hideLoader();
  }
}

