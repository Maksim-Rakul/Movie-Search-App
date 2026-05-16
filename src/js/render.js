import {
  dateEdit,
  descEdit,
  editReviewDate,
  editTime,
  getYears,
} from "./helpers.js";
import * as refs from "./refs.js";
import { banerSliderInit, sliderInit } from "./sliderInit.js";

export function banerRender(arr) {
  const renderString = arr
    .map(({ id, original_title, overview, poster_path, vote_average }) => {
      return `
    <div class="swiper-slide hero__slide" data-banerID="${id}">
              <div class="hero__slide-container">
                <div class="hero__slider-img-wrap">
                  <img
                    class="hero__slider-img"
                    src="https://image.tmdb.org/t/p/original/${poster_path}"
                    alt="Batman"
                  />
                </div>

                <div class="container swiper__content-wrap">
                  <div class="hero_slide-content">
                    <div class="hero_slide-rate-wrap">
                      <svg class="hero_slide-rate-icon">
                        <use href="sprites.svg#icon-star"></use>
                      </svg>
                      <p class="hero_slide-rate-val">
                        ${vote_average.toFixed(1)} <span class="silwer">/ 10</span>
                      </p>
                    </div>

                    <h1 class="hero__slide-title">${original_title}</h1>
                    <p class="hero_slide-desc">
                      ${overview}
                    </p>

                    <div class="hero__slide-btns-wrap">
                      <button class="hero__slide-btn">
                        <svg class="hero__slide-btn-icon">
                          <use href="sprites.svg#icon-play"></use>
                        </svg>
                        Watch
                      </button>
                      <button class="hero__slide-btn hero__slide-btn-more js-more-btn">
                        <svg class="hero__slide-btn-icon">
                          <use href="sprites.svg#icon-more"></use>
                        </svg>
                        More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    `;
    })
    .join("");

  refs.banerContainer.innerHTML = renderString;
}

function movieSliderRenderStr(arr) {
  console.log(arr);

  const renderStr = arr
    .map((item) => {
      const name = item.name ? "Serial" : "Movie";

      return `
        <div class="swiper-slide movie__slide" data-id="${item.id}" data-type="${name}">
                    <div class="movie__slide-img-wrap">
                      <img src="https://image.tmdb.org/t/p/original/${item.backdrop_path}" alt="${item.original_title || item.original_name}" />

                      <div class="movie__slide-info">
                        <div class="movie__slide-info-wrap">
                          <div class="movie__slide-rate">
                            <svg class="hero_slide-rate-icon">
                              <use href="/sprites.svg#icon-star"></use>
                            </svg>
                            ${item.vote_average.toFixed(1)}
                          </div>
                          <p class="movie__slide-type">${name}</p>
                        </div>

                        <div class="movie__slide-play">
                          <svg class="movie__slide-play-icon">
                            <use href="/sprites.svg#icon-play"></use>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div class="movie__slide-content">
                      <h3 class="movie__slide-name">${item.original_title || item.original_name}</h3>
                      <p class="movie__slide-date">${dateEdit(item.release_date || item.first_air_date)}</p>
                    </div>
                  </div>
        `;
    })
    .join("");

  return renderStr;
}

export function ganresRender(arr) {
  let renderStr = arr
    .map(({ id, name }) => {
      return `
    <li class="category__item" data-id="${id}">${name}</li>
    `;
    })
    .join("");

  renderStr =
    `<li class="category__item active-btn" data-id="all">All</li>` + renderStr;

  refs.ganresContainer.innerHTML = renderStr;
}

export function allMovieListRender(arr) {
  const renderStr = arr
    .map((item) => {
      return `
      <li class="movies__item">
                <h2 class="movies__list-title">${item.type}</h2>
                <div class="swiper movies__cinema">
                  <div class="swiper-wrapper js-in-cinema">
                    ${movieSliderRenderStr(item.res.results)}
                  </div>

                  <div class="movie_slide-prev movie__slide-btn">
                    <svg class="movie_slide-prev-icon">
                      <use href="sprites.svg#icon-slider_btn">

                      </use>
                    </svg>
                  </div>

                  <div class="movie_slide-next movie__slide-btn">
                    <svg class="movie_slide-prev-icon">
                      <use href="next.svg#icon-next"></use>
                    </svg>
                  </div>
                </div>
              </li>
      `;
    })
    .join("");

  refs.allMoviesContainer.innerHTML = renderStr;
}

export function renderByGenres(arr) {
  const renderStr = movieSliderRenderStr(arr);
  refs.allMoviesContainer.innerHTML = renderStr;
}

export function renderMoviePage(arr) {
  refs.moviesPageContainer.innerHTML = movieSliderRenderStr(arr);
}

export function renderSerialsPage(arr) {
  refs.serialsPageContainer.innerHTML = movieSliderRenderStr(arr);
}

export function renderTrendPage(arr) {
  refs.trendPageContainer.innerHTML = movieSliderRenderStr(arr);
}

export function renderMoviePageById(
  {
    id,
    poster_path,
    genres,
    original_title,
    release_date,
    runtime,
    original_language,
    budget,
    tagline,
    overview,
  },
  video,
) {
  const genresStr = genres
    .map((genre) => {
      return `
     <li class="hero__genres-item">${genre.name}</li>
    `;
    })
    .join("");

  const renderStr = `
    <img class="hero__movie-img" src="https://image.tmdb.org/t/p/original${poster_path}" alt="" />
          <ul class="hero__genres-list">
            ${genresStr}
          </ul>

          <h2 class="hero__movie-name">${original_title}</h2>

          <ul class="hero__data-list">
            <li class="hero__data-item">
              <svg class="hero__data-icon">
                <use href="/sprites.svg#icon-date"></use>
              </svg>
              <p class="hero__data-text">${getYears(release_date)}</p>
            </li>

            <li class="hero__data-item">
              <svg class="hero__data-icon icon-clock">
                <use href="/sprites.svg#icon-clock"></use>
              </svg>
              <p class="hero__data-text">${editTime(runtime)}</p>
            </li>

            <li class="hero__data-item">
              <svg class="hero__data-icon">
                <use href="/sprites.svg#icon-internet"></use>
              </svg>
              <p class="hero__data-text language">${original_language}</p>
            </li>
            ${
              budget
                ? `<li class="hero__data-item">
                  <svg class="hero__data-icon">
                    <use href="/sprites.svg#icon-money"></use>
                  </svg>
                  <p class="hero__data-text">$${Math.floor(budget / 1000000)}M</p>
                </li>`
                : ""
            }
          </ul>

          <div class="hero__rate-wrap">
            <svg class="hero__rate-icon">
              <use href="/sprites.svg#icon-star"></use>
            </svg>
            <p class="hero__rate-text">
              <span class="rate-color">7.6</span> / 10
            </p>
          </div>

          ${tagline ? `<p class="hero__quote">"${tagline}"</p>` : ""}
          <p class="hero__desc">
            ${overview}
          </p>

          ${
            video
              ? `
            <a href="https:www.youtube.com/embed/${video.key}" class="hero__btn glightbox" id="hero__btn">
            <svg class="hero__slide-btn-icon hero__btn-icon">
              <use href="/sprites.svg#icon-play"></use>
            </svg>
            Trailer
          </a>
            `
              : ""
          }

          
  `;

  refs.moviePageHero.innerHTML = renderStr;
}

//https:www.youtube.com/embed/${videoData.key}

export function renderInfoCastsById(arr) {
  const renderStr = arr
    .map(({ id, profile_path, name, character }) => {
      const actorImg = profile_path
        ? `https://image.tmdb.org/t/p/original${profile_path}`
        : `/actor.png`;

      return `
      <li class="cast__slider-item swiper-slide" data-id="${id}">
        <div href="#" class="cast__slider-link">
          <img src="${actorImg}" alt="" class="cast__slider-img" />
          <p class="cast__slider-name">${name}</p>
          <p class="cast__slider-role">${character}</p>
        </div>
      </li>
    `;
    })
    .join("");

  refs.infoCastContainer.innerHTML = renderStr;
}

export function recommendRender(arr) {
  refs.recommendContainer.innerHTML = movieSliderRenderStr(arr);
}

export function renderCastsById(arr) {
  const renderStr = arr
    .map(({ cast_id, profile_path, name, character }) => {
      const actorImg = profile_path
        ? `https://image.tmdb.org/t/p/original${profile_path}`
        : `/actor.png`;

      return `
      <li class="cast__slider-item swiper-slide" data-id="${cast_id}">
        <a href="#" class="cast__slider-link">
          <img src="${actorImg}" alt="" class="cast__slider-img" />
          <p class="cast__slider-name">${name}</p>
          <p class="cast__slider-role">${character}</p>
        </a>
      </li>
    `;
    })
    .join("");

  refs.castContainer.innerHTML = renderStr;
}

export function renderReviews(arr) {
  let renderStr = "";
  if (arr.length <= 0) {
    renderStr = `
      <p class="cast__title">No reviews</p>
    `;
  } else {
    renderStr = arr
      .map(({ author, created_at, author_details: { rating }, content }) => {
        return `
        <li class="reviews__item">
                <div class="reviews__author-wrap">
                  <div class="reviews__author">
                    <div class="reviews__author-icon-wrap">
                      <svg class="reviews__author-icon">
                        <use href="/sprites.svg#icon-avatar"></use>
                      </svg>
                    </div>
                    <div class="reviews__author-name-wrap">
                      <h3 class="reviews__author-name">${author}</h3>
                      <p class="reviews__author-date">${editReviewDate(created_at)}</p>
                    </div>
                  </div>

                  ${
                    rating
                      ? `
                    <div class="reviews__author-rate">
                      <svg class="reviews__author-rate-icon">
                        <use href="/sprites.svg#icon-star"></use>
                      </svg>

                      <p>${rating} / 10</p>
                    </div>
                    `
                      : ""
                  }

                  
                </div>

                <p class="reviews__text">
                  ${content}
                </p>
              </li>
    `;
      })
      .join("");
  }

  refs.reviewsCount.textContent = `(${arr.length})`;

  refs.reviewsContainer.innerHTML = renderStr;
}

export function renderMediaVideo(arr) {
  const renderStr = arr
    .map(({ key }) => {
      return `
      <li class="media__video-item">
                  <iframe
                    class="media__video-frame"
                    src="https://www.youtube.com/embed/${key}"
                    frameborder="0"
                  ></iframe>
                </li>
    `;
    })
    .join("");

  refs.mediaVideoContainer.innerHTML = renderStr;
}

export function renderMediaGallery(arr) {
  const renderStr = arr
    .map(({ file_path }) => {
      return `
      <li class="media__gallery-item">
        <img src="https://image.tmdb.org/t/p/original/${file_path}" alt="" />
      </li>
    `;
    })
    .join("");

  refs.mediaGalleryContainer.innerHTML = renderStr;
}

// SERIALS

export function renderSerialPageById(
  {
    id,
    poster_path,
    genres,
    name,
    first_air_date,
    seasons,
    original_language,
    budget,
    tagline,
    overview,
  },
  video,
) {
  const genresStr = genres
    .map((genre) => {
      return `
     <li class="hero__genres-item">${genre.name}</li>
    `;
    })
    .join("");

  const episodCount = seasons.reduce((acc, { episode_count }) => {
    return (acc += episode_count);
  }, 0);

  const renderStr = `
    <img class="hero__movie-img" src="https://image.tmdb.org/t/p/original${poster_path}" alt="" />
          <ul class="hero__genres-list">
            ${genresStr}
          </ul>

          <h2 class="hero__movie-name">${name}</h2>

          <ul class="hero__data-list">
            <li class="hero__data-item">
              <svg class="hero__data-icon">
                <use href="/sprites.svg#icon-date"></use>
              </svg>
              <p class="hero__data-text">${getYears(first_air_date)}</p>
            </li>

            <li class="hero__data-item">

              <p class="hero__data-text">${seasons.length} seasons</p>
            </li>

            <li class="hero__data-item">

              <p class="hero__data-text">${episodCount} episodes</p>
            </li>
          </ul>

          <div class="hero__rate-wrap">
            <svg class="hero__rate-icon">
              <use href="/sprites.svg#icon-star"></use>
            </svg>
            <p class="hero__rate-text">
              <span class="rate-color">7.6</span> / 10
            </p>
          </div>

          ${tagline ? `<p class="hero__quote">"${tagline}"</p>` : ""}
          <p class="hero__desc">
            ${descEdit(overview)}
          </p>



          ${
            video
              ? `
            <a href="https:www.youtube.com/embed/${video.key}" class="hero__btn glightbox" id="hero__btn">
            <svg class="hero__slide-btn-icon hero__btn-icon">
              <use href="/sprites.svg#icon-play"></use>
            </svg>
            Trailer
          </a>
            `
              : ""
          }
  `;

  refs.serialsPageHero.innerHTML = renderStr;
}
