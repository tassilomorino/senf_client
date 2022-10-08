import styled from "styled-components";

export const InputTitle = styled.input`
  width: 100%;
  height: 1.7rem;

  font-size: 1.2rem;
  font-weight: bold;
  border: none;

  &:focus {
    background: #ddd;
  }
`;

export const EditableTitleContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  .editable-title {
    height: 1.7rem;

    flex-grow: 1;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .list-button {
    height: 1.5rem;
    border: none;

    cursor: pointer;

    transition: background-color 0.2s;

    &:hover {
      background-color: #ddd;
    }
  }

  .menu-card {
    position: absolute;
    right: 0;
    padding: 0;
    
    background-color: #fff;
    border: 1px solid #ddd;

    border-radius: 4px;
    z-index: 999;
    list-style-type: none;
    cursor: default;

    li {
      color: #333;
      font-size: 0.875rem;
      border-bottom: 1px solid #ddd;
      padding: 0.5rem 0.5rem 0.3rem;

      &:hover {
        background-color: #ddd;
      }
    }
  }
`;
