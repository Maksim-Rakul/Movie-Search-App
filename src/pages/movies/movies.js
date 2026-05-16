import { getMoviesByType } from "../../js/api";
import { mobileMenu } from "../../js/helpers";
import { renderMoviePage } from "../../js/render.js";
import * as refs from "../../js/refs.js";
import { movieClickHandler, moviePageHandle } from "../../js/handlers.js";

mobileMenu();

getMoviesByType().then((data) => {
  renderMoviePage(data.results);
});

refs.moviesPageCategory.addEventListener("click", moviePageHandle);
refs.moviesPageContainer.addEventListener("click", movieClickHandler);