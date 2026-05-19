import { getTVByType } from "../../js/api";
import { hideLoader, mobileMenu, showLoader } from "../../js/helpers";
import { renderSerialsPage } from "../../js/render";
import * as refs from "../../js/refs.js";
import { movieClickHandler, serialsPageHandle } from "../../js/handlers.js";
import search from "../../js/search.js";

mobileMenu();
search();
showLoader();

refs.serialsPageCategory.addEventListener("click", serialsPageHandle);

getTVByType()
  .then((data) => {
    renderSerialsPage(data.results);

    refs.serialsPageContainer.addEventListener("click", movieClickHandler);
  })
  .catch((err) => {
    console.log(err.message);
  })
  .finally(() => {
    hideLoader();
  });
