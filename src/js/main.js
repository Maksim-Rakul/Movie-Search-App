import Swiper from "swiper";
import {
  getBanerMovies,
  getMovieGanres,
  getPopularMovie,
  getPopularTV,
  getRatingTV,
  getSoonMovie,
  getTopRatedMovie,
} from "./api.js";
import { mobileMenu } from "./helpers.js";
import * as refs from "./refs.js";
import { allMovieListRender, banerRender, ganresRender } from "./render.js";
import { banerSliderInit, sliderInit } from "./sliderInit.js";
import {
  banerMoreBtnHandler,
  changeGanreHandler,
  changeTypeHandler,
  movieClickHandler,
} from "./handlers.js";

mobileMenu();
banerSliderInit();

// GANRES
getMovieGanres()
  .then((data) => {
    ganresRender(data.genres);

    refs.ganresContainer.addEventListener("click", changeGanreHandler);
    refs.categoryType.addEventListener("click", changeTypeHandler);
  })
  .catch((error) => {
    console.log(error);
  });

// BANER MOVIES
getBanerMovies()
  .then((data) => {
    const banerArr = data.res.results.slice(0, 5);
    banerRender(banerArr);
    refs.banerContainer.addEventListener("click", banerMoreBtnHandler);
  })
  .catch((error) => {
    console.log(error.message);
  });

Promise.all([
  getBanerMovies(), //baner
  getPopularMovie(), //popular
  getTopRatedMovie(), //rated
  getSoonMovie(), // upcoming
  getPopularTV(),
  getRatingTV(),
]).then((data) => {
  allMovieListRender(data);
  sliderInit();
});

refs.allMoviesContainer.addEventListener("click", movieClickHandler);
