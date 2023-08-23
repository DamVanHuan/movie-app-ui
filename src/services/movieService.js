import queryString from "query-string";
import { method, privateApi } from "./api";

export const movieService = {
  getMovies: p => privateApi(`/movies?${queryString.stringify(p)}`),
  getMovieById: p => privateApi(`/movies/${p.id}`),
  likeMovie: p => privateApi(`/movies/${p.id}/like`, method.post),
  dislikeMovie: p => privateApi(`/movies/${p.id}/dislike`, method.post),
  getReactions: () => privateApi("/movies/reactions")
};
