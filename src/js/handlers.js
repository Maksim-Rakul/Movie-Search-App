import GLightbox from "glightbox";
import {
  getBanerMovies,
  getByTrands,
  getMovieGanres,
  getMoviesByGenres,
  getMoviesByType,
  getPopularMovie,
  getPopularTV,
  getRatingTV,
  getSeasonSerialById,
  getSoonMovie,
  getTopRatedMovie,
  getTVByGenres,
  getTVByType,
  getTVGanres,
  getVideoByMovieId,
} from "./api.js";
import * as refs from "./refs.js";
import {
  allMovieListRender,
  ganresRender,
  renderByGenres,
  renderMoviePage,
  serialsEpisodRender,
} from "./render.js";
import { sliderInit } from "./sliderInit.js";

let type = "Movies";

export function changeGanreHandler(event) {
  if (event.target.classList.contains("js-ganres-list")) {
    return;
  }
  Array.from(refs.ganresContainer.children).forEach((el) => {
    el.classList.remove("active-btn");
  });

  event.target.classList.add("active-btn");

  const id = event.target.dataset.id;

  if (id === "all") {
    Promise.all([
      getBanerMovies(),
      getPopularMovie(),
      getTopRatedMovie(),
      getSoonMovie(),
      getPopularTV(),
      getRatingTV(),
    ]).then((data) => {
      allMovieListRender(data);
      sliderInit();
    });
  } else {
    if (type === "Serials") {
      getTVByGenres(id).then((data) => {
        renderByGenres(data.results);
      });
    } else {
      getMoviesByGenres(id).then((data) => {
        renderByGenres(data.results);
      });
    }
  }
}


export function changeTypeHandler(event) {
  if (event.target.classList.contains("category__type")) {
    return;
  }

  Array.from(refs.categoryType.children).forEach((el) => {
    el.classList.remove("active-btn");
  });

  if (event.target.textContent === "Serials") {
    getTVGanres().then((data) => {
      ganresRender(data.genres);
      type = "Serials";
    });
  } else {
    getMovieGanres().then((data) => {
      ganresRender(data.genres);
      type = "Movies";
    });
  }

  event.target.classList.add("active-btn");
}

export function moviePageHandle(event) {
  if (event.target.classList.contains("movies-page__category")) {
    return;
  }

  Array.from(refs.moviesPageCategory.children).forEach((item) => {
    item.classList.remove("active-btn");
  });
  event.target.classList.add("active-btn");

  getMoviesByType(event.target.dataset.type).then((data) => {
    renderMoviePage(data.results);
  });
}

export function serialsPageHandle(event) {
  if (event.target.classList.contains("serials_page-category")) {
    return;
  }

  Array.from(refs.serialsPageCategory.children).forEach((item) => {
    item.classList.remove("active-btn");
  });
  event.target.classList.add("active-btn");

  getTVByType(event.target.dataset.type).then((data) => {
    renderMoviePage(data.results);
  });
}

let trandRequestParams = {
  type: "all",
  time: "day",
};

export function trendCategoryHandler(event) {
  if (event.target.classList.contains("trend-page__category")) {
    return;
  }

  Array.from(refs.trendPageCategory.children).forEach((item) => {
    item.classList.remove("active-btn");
  });
  event.target.classList.add("active-btn");

  trandRequestParams.type = event.target.dataset.type;

  getByTrands(trandRequestParams).then((data) => {
    renderMoviePage(data.results);
  });
}

export function trendTimeHandler(event) {
  if (event.target.classList.contains("trend__time-wrap")) {
    return;
  }

  Array.from(refs.trendPageTime.children).forEach((item) => {
    item.classList.remove("time-actve");
  });
  event.target.classList.add("time-actve");

  trandRequestParams.time = event.target.dataset.time;

  getByTrands(trandRequestParams).then((data) => {
    renderMoviePage(data.results);
  });
}

export async function heroBtnHandler(event) {}

export function infoNavHandler(event) {
  if (event.target.classList.contains("info__nav-list")) {
    return;
  }

  const page = event.target.closest(".info__nav-item");

  if (!page) {
    return;
  }

  const list = Array.from(event.currentTarget.children);
  const pageList = Array.from(refs.infoContainer.children);
  const indexPage = list.indexOf(page);

  list.forEach((item) => {
    item.classList.remove("info__nav-active");
  });
  page.classList.add("info__nav-active");

  pageList.forEach((item) => {
    item.classList.add("hidden");
  });
  pageList[indexPage].classList.remove("hidden");

  // refs.infoContainer.children[index].classList.remove;
}

export async function movieClickHandler(event) {
  const movieSlide = event.target.closest(".movie__slide");

  if (!movieSlide) {
    return;
  }

  const bannerId = movieSlide.dataset.id;
  const type = movieSlide.dataset.type;

  const href =
    type === "Movie"
      ? `/pages/moviePage/moviePage.html`
      : `/pages/serialPage/serialPage.html`;

  window.location.href = `${href}?id=${bannerId}`;
}

export async function banerMoreBtnHandler(event) {
  const btn = event.target.closest(".js-more-btn");

  if (!btn) {
    return;
  }

  const banerId = btn.closest(".hero__slide").dataset.banerid;

  window.location.href = `/pages/moviePage/moviePage.html?id=${banerId}`;
}

export function castClickHandler(event) {
  const actor = event.target.closest(".cast__slider-item");

  if (!actor) {
    return;
  }

  const actorId = actor.dataset.id;

  window.location.href = `/pages/actor/actor.html?id=${actorId}`;
}

export async function seasonClickHandler(event, serialId) {
  Array.from(event.currentTarget.children).forEach((item) => {
    item.classList.remove("active-btn");
  });

  const btn = event.target.classList.contains("season__btn");

  if (!btn) return;

  const seasonId = event.target.dataset.id;

  const episodsArr = await getSeasonSerialById(serialId, seasonId);

  serialsEpisodRender(episodsArr);

  event.target.classList.add("active-btn");
}

export function episodClickHandler(event) {
  const btn = event.target.closest(".season__episod-more-btn");

  if (!btn) return;
  const parent = btn.closest(".season__episod-item");

  if (parent.classList.contains("open-episod")) {
    btn.classList.remove("more-btn-open");
    parent.classList.remove("open-episod");
  } else {
    btn.classList.add("more-btn-open");
    parent.classList.add("open-episod");
  }
}