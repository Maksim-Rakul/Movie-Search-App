import {
  getActorById,
  getImgByActorId,
  getMoviesByActorId,
  getSerialsByActorId,
} from "../../js/api.js";
import { infoNavHandler, movieClickHandler } from "../../js/handlers";
import { hideLoader, mobileMenu, showLoader } from "../../js/helpers";
import * as refs from "../../js/refs.js";
import {
  renderActor,
  renderMediaGallery,
  renderMoviePage,
  renderSerialsPage,
} from "../../js/render.js";
import search from "../../js/search.js";

const url = new URLSearchParams(window.location.search);
const id = url.get("id");

mobileMenu();
search();
initActorPage();
showLoader();

refs.infoNav.addEventListener("click", infoNavHandler);

async function initActorPage() {
  try {
    const [actor, movies, serials, images] = await Promise.all([
      getActorById(id),
      getMoviesByActorId(id),
      getSerialsByActorId(id),
      getImgByActorId(id),
    ]);

    renderActor(actor);
    renderMoviePage(movies.cast);
    renderSerialsPage(serials.cast);
    renderMediaGallery(images.profiles);

    refs.moviesPageContainer.addEventListener("click", movieClickHandler);
    refs.serialsPageContainer.addEventListener("click", movieClickHandler);
  } catch (err) {
    console.log(err.message);
  } finally {
    hideLoader();
  }
};

