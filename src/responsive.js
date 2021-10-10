import { css } from 'styled-components';

export const forMobile = (props) => {
    return css`
      @media only screen and (max-width: 550px) {
        ${props}
      }
    `;
  };