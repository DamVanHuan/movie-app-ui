import queryString from "query-string";
import { method, privateApi, publicApi } from "./api";

export const movieService = {
  getMovies: p => privateApi(`/movies?${queryString.stringify(p)}`),
  likeMovie: p => privateApi(`/movies/${p.id}/like`, method.post),
  dislikeMovie: p => privateApi(`/movies/${p.id}/dislike`, method.post)
};
