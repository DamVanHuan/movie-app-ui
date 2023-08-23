import { styled } from "styled-components";
import { Constant } from "../../consts/constant";

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 360px;
  padding: 12px;
  margin: 20px auto;
  border: solid 1px #000;
  border-radius: 4px;

  @media (max-width: ${Constant.size.sm}px) {
    border-radius: 0;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  align-items: center;
`;
