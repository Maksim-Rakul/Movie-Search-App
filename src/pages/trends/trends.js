import { getByTrands } from "../../js/api";
import { hideLoader, mobileMenu, showLoader } from "../../js/helpers";
import { renderTrendPage } from "../../js/render";
import * as refs from "../../js/refs.js";
import {
  movieClickHandler,
  trendCategoryHandler,
  trendTimeHandler,
} from "../../js/handlers.js";
import search from "../../js/search.js";

mobileMenu();
search();
showLoader();

refs.trendPageCategory.addEventListener("click", trendCategoryHandler);
refs.trendPageTime.addEventListener("click", trendTimeHandler);

getByTrands({})
  .then((data) => {
    renderTrendPage(data.results);

    refs.trendPageContainer.addEventListener("click", movieClickHandler);
  })
  .catch((err) => {
    console.log(err.message);
  })
  .finally(() => {
    hideLoader();
  });

