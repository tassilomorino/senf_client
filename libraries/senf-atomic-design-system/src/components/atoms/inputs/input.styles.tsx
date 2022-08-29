/** @format */

import styled, { css } from "styled-components";

export const HoverContainer = styled.div`
  padding: 0.35rem;
  &:hover {
    border-radius: ${({ theme }) => theme.radii[0]}px;
    background-color: ${({ theme }) => theme.colors.greyscale.greyscale20tra};
  }
`;

export const Wrapper = styled.div<{ disabled?: boolean }>`
  font-family: ${({ theme }) => theme.fontFamily};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
  color: ${({ theme }) => theme.colors.black.black40tra};
  width: 100%;

  opacity: ${({ disabled }) => disabled && "0.5"};
`;

// export const Label = styled.label<{ size?: string, icon?: boolean, active?: boolean, error?: boolean }>`
//   position: absolute;
//   padding-inline: ${({ size, theme }) => theme.inputPadding(size)};
//   padding-block: 5px;
//   margin-inline: ${({ size, theme }) => theme.inputPadding(size)};
//   margin-block: -10px;
//   border-radius: 10px;
//   left: ${({ icon }) => icon ? "16px" : "0"};
//   top: ${({ active, theme, size }) => active ? `${parseFloat(theme.space[2], 10) * -1}rem` : theme.inputPadding(size)};
//   pointer-events: none;
//   font-size: ${({ active, theme }) => active ? `${theme.fontSizes[1]}rem` : "inherit"};
//   transition: 100ms;
//   background-color: white;
// `;
export const Label = styled.label<{ size?: string, error?: boolean }>`
  align-self: flex-start;
  flex: auto;
  color: ${({ theme, error }) => error && theme.colors.signal.redDark};

  font-size: ${({ theme }) => theme.fontSizes[1]}rem;
  font-weight: ${({ theme }) => theme.fontWeights[1]};
  line-height: ${({ theme }) => theme.lineHeight[0]};
  padding-inline: ${({ size, theme }) => theme.inputPadding(size)};

`;

export const Note = styled.p<{ error?: boolean }>`
  color: ${({ theme, error }) => error && theme.colors.signal.redDark};
  font-size: ${({ theme }) => theme.fontSizes[0]}rem;
  line-height: ${({ theme }) => theme.lineHeight[2]};
  padding-inline: ${({ size, theme }) => theme.inputPadding(size)};
  /* align-self: flex-end; */
  /* text-align: end; */
  /* flex: auto; */
  /* flex-basis: 7rem; */ // what is this?
`;

export const InputContainer = styled.label<{ focus: boolean, icon: boolean, size: string, type: string }>`
  position: relative;
  display: flex;
  align-items: start;
  padding: ${({ size, theme }) => theme.inputPadding(size)};
  gap: ${({ size, theme }) => `${parseFloat(theme.inputPadding(size), 10)}rem`};
  min-height: ${({ size, theme }) => theme.inputHeight(size)};
  height: ${({ size, type, theme }) => {
    if (type === "textarea") return "initial"
    return theme.inputHeight(size)
  }};
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.radii[2]}px;
  cursor: text;

  /* Big/White on Light BG */
  background-color: #ffffff;
  /* background: linear-gradient(
    0deg,
    rgba(134, 124, 99, 0.01),
    rgba(134, 124, 99, 0.01)
  ),
    #ffffff; */

  --border-color: ${({ focus, theme }) => focus ? theme.colors.primary.primary120 : 'var(--border-color)'};
  border: 2px solid var(--border-color, ${({ theme }) => theme.colors.greyscale.greyscale20});
  box-shadow: 0px -5px 10px rgba(255, 255, 255, 0.2),
    0px 10px 20px -6px rgba(134, 124, 99, 0.06), var(--outline-shadow);


  input, textarea {
    padding: 0;
    box-sizing: border-box;
    width: 100%;
    line-height: ${({ theme }) => theme.lineHeight[2]};
    margin-block: -2px;
  }
  /* Styles for textarea */
  input {
    display: flex;
    align-items: center;
  }
  textarea {
    resize: none;
  }

  button {
    margin: -10px;
  }
  label svg {
  margin: 1px -1px;
}
`;

export const InputField = styled.input`
font-size: ${({ theme }) => theme.fontSizes[2]}rem;
border: 0;
flex: 1;
background-color: transparent!important;
color: ${({ theme }) => theme.colors.black.black};
  ::placeholder,
  ::-webkit-input-placeholder {
  color: ${({ theme }) => theme.colors.black.black40tra};
}
  :-ms-input-placeholder {
  color: ${({ theme }) => theme.colors.black.black40tra};
}
  :focus::placeholder,
  :focus::-webkit-input-placeholder {
  color: ${({ theme }) => theme.colors.black.black30tra};
}
  :focus:-ms-input-placeholder {
  color: ${({ theme }) => theme.colors.black.black30tra};
}
  ::-webkit-search-cancel-button {
  -webkit-appearance: none;
}
  &:focus {
  outline: 0;
}
  &:focus-visible {
  outline: 0;
}
`;
