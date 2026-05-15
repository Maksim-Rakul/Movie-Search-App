import * as refs from "./refs.js";

export function mobileMenu() {
  refs.mobileMenuBtn.addEventListener("click", () => {
    refs.mobileMenu.classList.toggle("is-open-mobile");
    const use = refs.mobileMenuBtn.querySelector("use");

    if (refs.mobileMenu.classList.contains("is-open-mobile")) {
      use.setAttribute("href", "/sprites.svg#icon-close_menu");
    } else {
      use.setAttribute("href", "/sprites.svg#icon-open_menu");
    }
  });
}

export function dateEdit(date) {
  const dateArr = date.split("-");
  return dateArr.join(" ");
}

export function getYears(data) {
  const date = new Date(data).getFullYear();
  return date;
}

export function editTime(time) {
  const hours = Math.floor(time / 60);
  const minutes = time - hours * 60;
  return `${hours}h ${minutes}m`;
}

export function editReviewDate(date) {
  const newDate = new Date(date);

  const day = newDate.getDate().toString().padStart(2, "0");
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const year = newDate.getFullYear();

  return `${day}.${month}.${year}`;
}
