import {
  getActorById,
  getImgByActorId,
  getMoviesByActorId,
  getSerialsByActorId,
} from "../../js/api.js";
import { infoNavHandler, movieClickHandler } from "../../js/handlers";
import { mobileMenu } from "../../js/helpers";
import * as refs from "../../js/refs.js";
import {
  renderActor,
  renderMediaGallery,
  renderMoviePage,
  renderSerialsPage,
} from "../../js/render.js";

const url = new URLSearchParams(window.location.search);
const id = url.get("id");

mobileMenu();
refs.infoNav.addEventListener("click", infoNavHandler);
refs.moviesPageContainer.addEventListener("click", movieClickHandler);
refs.serialsPageContainer.addEventListener("click", movieClickHandler);

const initActorPage = async () => {
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
};

initActorPage();
