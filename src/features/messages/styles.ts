import styled from "styled-components";

export const MessagesContainer = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
`;

export const MessagesScrollableList = styled.div`
  overflow: auto;
  height: calc(100vh - 250px);
`;

export const MessagesListEnd = styled.div`
  float: left;
  clear: both;
`;
