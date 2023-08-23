import { IconButton, Typography } from "@mui/material";
import { MovieWrapper, ReactionButtonWrapper, ReactionWrapper } from "./style";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

const Movie = ({
  title,
  image,
  like,
  dislike,
  liked,
  disliked,
  onLike,
  onDislike
}) => {
  return (
    <MovieWrapper>
      <Typography variant="h5">{title}</Typography>
      <div className="thumb">
        <img alt="movie" src={image} />
      </div>
      <ReactionWrapper>
        <ReactionButtonWrapper>
          <IconButton onClick={onLike}>
            {liked ? <ThumbUpIcon color='primary'/> : <ThumbUpOffAltIcon />}
          </IconButton>

          <span>{like}</span>
        </ReactionButtonWrapper>

        <ReactionButtonWrapper>
          <IconButton onClick={onDislike}>
            {disliked ? <ThumbDownIcon color='primary'/> : <ThumbDownOffAltIcon />}
          </IconButton>

          <span>{dislike}</span>
        </ReactionButtonWrapper>
      </ReactionWrapper>
    </MovieWrapper>
  );
};

export default Movie;
