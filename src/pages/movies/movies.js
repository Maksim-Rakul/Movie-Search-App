import { getMoviesByType } from "../../js/api";
import { hideLoader, mobileMenu, showLoader } from "../../js/helpers";
import { renderMoviePage } from "../../js/render.js";
import * as refs from "../../js/refs.js";
import { movieClickHandler, moviePageHandle } from "../../js/handlers.js";
import search from "../../js/search.js";

mobileMenu();
search();
showLoader();

refs.moviesPageCategory.addEventListener("click", moviePageHandle);

getMoviesByType()
  .then((data) => {
    renderMoviePage(data.results);

    refs.moviesPageContainer.addEventListener("click", movieClickHandler);
  })
  .catch((err) => {
    console.log(err.message);
  })
  .finally(() => {
    hideLoader();
  });
