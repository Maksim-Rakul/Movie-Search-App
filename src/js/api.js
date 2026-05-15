import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjdjZTM4ZjYwYWMzZDU0Njk2Yzk5MTFlYmVmYmViYSIsIm5iZiI6MTc1NzI2MDgxMS43OTgsInN1YiI6IjY4YmRhYzBiNzYxOGJkMzVjMTFiYzc5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J7vV5ffLSgkB9qdJhbdhjkhNpcc8zxloY_nIsnnG63Q`,
  },
});

export const getBanerMovies = async () => {
  const res = await api.get("/movie/now_playing");
  return { res: res.data, type: "🎬 Now playing Movie" };
};

export const getPopularMovie = async () => {
  const res = await api.get("/movie/popular");
  return { res: res.data, type: "🔥 Popular Movie" };
};

export const getTopRatedMovie = async () => {
  const res = await api.get("/movie/top_rated");
  return { res: res.data, type: "⭐ Top rated Movie" };
};

export const getSoonMovie = async () => {
  const res = await api.get("/movie/upcoming");
  return { res: res.data, type: "📅 Upcoming" };
};

export const getPopularTV = async () => {
  const res = await api.get("/tv/popular");
  return { res: res.data, type: "📺 Popular TV" };
};

export const getRatingTV = async () => {
  const res = await api.get("/tv/top_rated");
  return { res: res.data, type: "🏆 Top rated TV" };
};

export const getMovieGanres = async () => {
  const res = await api.get("/genre/movie/list");
  return res.data;
};

export const getTVGanres = async () => {
  const res = await api.get("/genre/tv/list");
  return res.data;
};

export const getMoviesByGenres = async (genreId) => {
  const res = await api.get("/discover/movie", {
    params: {
      with_genres: genreId,
    },
  });

  return res.data;
};

export const getTVByGenres = async (serialId) => {
  const res = await api.get("/discover/tv", {
    params: {
      with_genres: serialId,
    },
  });

  return res.data;
};

export const getMoviesByType = async (type = "popular") => {
  const res = await api.get(`/movie/${type}`);

  return res.data;
};

export const getTVByType = async (type = "popular") => {
  const res = await api.get(`/tv/${type}`);

  return res.data;
};

// TRENDS API

export const getByTrands = async ({ type = "all", time = "day" }) => {
  const res = await api.get(`/trending/${type}/${time}`);

  return res.data;
};

// MOVIE BY ID

export const getMovieById = async (id) => {
  const res = await api.get(`/movie/${id}`);

  return res.data;
};

export const getActorsByMovieId = async (id) => {
  const res = await api.get(`/movie/${id}/credits`);

  return res.data;
};

export const getRecByMovieId = async (id) => {
  const res = await api.get(`/movie/${id}/recommendations`);

  return res.data;
};

export const getVideoByMovieId = async (id) => {
  const res = await api.get(`/movie/${id}/videos`);

  return res.data;
};

export const getReviewsByMovieId = async (id) => {
  const res = await api.get(`/movie/${id}/reviews`);

  return res.data;
};

export const getGalleryByMovieId = async (id) => {
  const res = await api.get(`/movie/${id}/images`);

  return res.data;
};

// https://api.themoviedb.org/3/movie/{movie_id}/images

// TV BY ID

// export const getTcById = async (id) => {
//   const res = await api.get(`/movie/${id}`);

//   return res.data;
// };

// export const getTvByMovieId = async (id) => {
//   const res = await api.get(`/movie/${id}/credits`);

//   return res.data;
// };

// export const getTvByMovieId = async (id) => {
//   const res = await api.get(`/movie/${id}/recommendations`);

//   return res.data;
// };

// export const getTvByMovieId = async (id) => {
//   const res = await api.get(`/movie/${id}/videos`);

//   return res.data;
// };
