import { styled } from "styled-components";

export const Container = styled.div`
  max-width: 990px;
  margin: auto;
`;

export const MovieListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const MovieWrapper = styled.div`
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: solid 1px #8487f4;
  border-radius: 8px;

  div.thumb {
    width: 280px;
    max-height: 200px;
    margin-top: auto;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
`;

export const ReactionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  margin-top: auto;
`;

export const ReactionButtonWrapper = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;
