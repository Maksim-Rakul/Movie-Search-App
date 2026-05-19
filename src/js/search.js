import { createSearchOptimizer } from "search-optimizer";
import { movieClickHandler } from "./handlers";
import * as refs from "./refs.js";
import { getKeyword } from "./api";
import { renderSearch } from "./render";

export default function search() {
  refs.headerSearchBackdrop.addEventListener("click", (event) => {
    clearInput();
    refs.headerInput.value = "";
  });

  refs.headerSearch.addEventListener("click", movieClickHandler);

  const searchOptimizer = createSearchOptimizer(getKeyword, {
    debounceDelay: 200,
    minChars: 1,
    onSearchSuccess: (res) => {
      renderSearch(res.results);
    },
  });

  refs.headerInput.addEventListener("input", async (event) => {
    event.preventDefault();
    searchOptimizer.setQuery(event.target.value);

    setTimeout(() => {
      if (event.target.value === "") {
        clearInput();
      } else {
        refs.headerSearch.classList.add("search-is-open");
        refs.headerInputClear.classList.add("form-clear-visible");
      }
    }, 200);
  });

  refs.headerInputClear.addEventListener("click", () => {
    clearInput();
    refs.headerInput.value = "";
  });
}

function clearInput() {
  refs.headerSearch.classList.remove("search-is-open");
  refs.headerInputClear.classList.remove("form-clear-visible");
}
