import { getByTrands } from "../../js/api";
import { mobileMenu } from "../../js/helpers";
import { renderTrendPage } from "../../js/render";
import * as refs from "../../js/refs.js";
import { trendCategoryHandler, trendTimeHandler } from "../../js/handlers.js";

mobileMenu();

// let trandRequestParams = {
//   type: "all",
//   time: "day",
// };

getByTrands({}).then((data) => {
  renderTrendPage(data.results);
});

refs.trendPageCategory.addEventListener("click", trendCategoryHandler);
refs.trendPageTime.addEventListener("click", trendTimeHandler);
