import React from 'react';
import { useSelector } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MdSend } from "react-icons/md";

import { Button } from 'styles/elementsPreset';
import { flex } from 'styles/presets';

const Contact = () => {
  const modalState = useSelector(state => state.sliceReducers.modalState);

  return (
    <div
      className="contact"
      css={css`
        ${flex.vertical}
        width: 100%;
        height: 100%;
        opacity: ${modalState ? '100%' : '0'};
      `}
    >
      <h1>CONTACT</h1>
      <hr
        css={css`
          margin: 3% 0 7%;
          border: 0.188rem solid var(--point-dark);
          width: 50%;
          @media (max-height: 449px) {
            margin: 1% 0 3%;
          }
        `}
      />
      <p>EMAIL: godcl1623@gmail.com</p>
      <a
        href="mailto:godcl1623@gmail.com"
        css={css`
          all: unset;
          width: 20%;
          ${flex.horizontal.center}
        `}
      >
        <Button
          css={css`
            margin: 40% 0 0;
            padding: 6% 4% 9%;
            ${flex.horizontal.center}
            width: 90%;
            min-width: 10.813rem;
            @media (max-height: 449px) {
              margin: 20% 0 0;
            }

            * {
              margin: 0 0.313rem;
            }
          `}
        >
          <MdSend />
          {`SEND EMAIL`}
        </Button>
      </a>
    </div>
  );
};

export default Contact;