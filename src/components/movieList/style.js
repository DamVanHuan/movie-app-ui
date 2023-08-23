import { styled } from "styled-components";

export const MoviePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Container = styled.div`
  max-width: 990px;
  margin: auto;
`;

export const MovieWrapper = styled.div`
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: solid 1px #8487f4;
  border-radius: 8px;
  height: calc(100% - 16px);

  div.thumb {
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
