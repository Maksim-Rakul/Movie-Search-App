import { getTVByType } from "../../js/api";
import { mobileMenu } from "../../js/helpers";
import { renderSerialsPage } from "../../js/render";
import * as refs from "../../js/refs.js";
import { serialsPageHandle } from "../../js/handlers.js";

mobileMenu();

getTVByType().then((data) => {
  renderSerialsPage(data.results);
});

refs.serialsPageCategory.addEventListener("click", serialsPageHandle);
