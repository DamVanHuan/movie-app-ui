import Header from "components/header";
import { Constant } from "consts/constant";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { movieService } from "services/movieService";
import Movie from "./movie";
import { MoviePageWrapper } from "./style";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Grid, LinearProgress } from "@mui/material";

const MovieList = () => {
  const [offset, setOffset] = useState(0);
  const [movies, setMovies] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [reactions, setReactions] = useState({ likeds: [], dislikeds: [] });

  useEffect(() => {
    document.title = "Movie list";

    const user = JSON.parse(localStorage.getItem(Constant.storageKey.user));
    setUser(user);
  }, []);

  useEffect(() => {
    getMovies();
    getReactions();
  }, []);

  const getMovies = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    const resp = await movieService.getMovies({
      offset,
      limit: Constant.paging.limit
    });
    if (resp.success) {
      setOffset(offset + Constant.paging.limit);
      setMovies(movies.concat(resp.data?.items));
      setHasNext(resp.data.hasNext);
    } else {
      toast.error(resp.error.message);
    }
    setLoading(false);
  };

  const getReactions = async () => {
    const resp = await movieService.getReactions();
    if (resp.success) {
      setReactions(resp.data);
    }
  };

  const onLike = async movie => {
    const resp = await movieService.likeMovie({ id: movie.id });
    if (resp.success) {
      getReactions();
      reloadMovie(movies.indexOf(movie));
      toast.success(resp.data.message);
    } else {
      toast.error(resp.error.message);
    }
  };

  const onDislike = async movie => {
    const resp = await movieService.dislikeMovie({ id: movie.id });
    if (resp.success) {
      getReactions();
      reloadMovie(movies.indexOf(movie));
      toast.success(resp.data.message);
    } else {
      toast.error(resp.error.message);
    }
  };

  const reloadMovie = async index => {
    const movie = movies[index];
    if (movie) {
      const resp = await movieService.getMovieById({ id: movie.id });
      if (resp.success) {
        movies[index] = { ...resp.data };
        setMovies([...movies]);
      }
    }
  };

  const checkLiked = movieId => reactions.likeds.includes(movieId);
  const checkDisliked = movileId => reactions.dislikeds.includes(movileId);

  return (
    <MoviePageWrapper>
      {user && <Header user={user} />}

      <Container>
        <InfiniteScroll
          dataLength={movies.length}
          hasMore={hasNext}
          next={getMovies}
          loader={
            <div style={{ margin: "8px 0" }}>
              <LinearProgress />
            </div>
          }
        >
          <Grid container spacing={2}>
            {movies.map(m => (
              <Grid key={m.id} item xs={12} sm={6} md={4}>
                <Movie
                  {...m}
                  liked={checkLiked(m.id)}
                  onLike={() => onLike(m)}
                  disliked={checkDisliked(m.id)}
                  onDislike={() => onDislike(m)}
                />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </Container>
    </MoviePageWrapper>
  );
};

export default MovieList;
