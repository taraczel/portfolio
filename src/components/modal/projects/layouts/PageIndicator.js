import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { isChangingProjectCreator, selectedProjectCreator } from '../../../../actions';
import { flex, mediaQuery } from '../../../../styles/presets';

const PageIndicator = props => {
  const selectedProject = useSelector(state => state.selectedProject);
  const list = useSelector(state => state.projectsList);
  const dispatch = useDispatch();

  const coords = () => {
    if (props.forRef.current) {
      return props.forRef.current.childNodes[1].offsetWidth + 40;
    }
  }

  const setState = event => {
    const selectedOne = event.target.dataset.class;
    const selectedIndex = list.indexOf(selectedOne);
    const movingCoords = -coords() * selectedIndex;
    dispatch(isChangingProjectCreator(movingCoords));
    dispatch(selectedProjectCreator(selectedOne));
  }

  const makeChkboxes = list.map(project => {
    const isChecked = project === selectedProject;
    const number = project.split(' ')[1];
    return (
      <React.Fragment
        key={`fragment${number}`}
      >
        <input
          key={`input${number}`}
          name={project}
          type="checkbox"
          checked={isChecked}
          onChange={() => {}}
          css={css`
          display: none;
          `}
        />
        <label
          key={`label${number}`}
          htmlFor={project}
          data-class={project}
          onClick={e => setState(e)}
          css={css`
            margin: 15px;
            border: 1px solid transparent;
            border-radius: 50%;
            padding: 1px;
            -webkit-box-shadow: 0 0 10px 2px var(--box-shadow);
            box-shadow: 0 0 10px 2px var(--box-shadow);
            min-width: 10px;
            min-height: 10px;
            width: 1.2vw;
            height: 1.2vw;
            background: var(--white);
            opacity: 70%;
            cursor: pointer;
            :hover {
              -webkit-filter: brightness(0.9);
              filter: brightness(0.9);
            }
            :active {
              -webkit-transform: scale(0.95);
              -ms-transform: scale(0.95);
              transform: scale(0.95);
            }
          `}
        >
          　
        </label>
      </React.Fragment>
    );
  });

  return (
    <div
      className="page-indicator"
      css={css`
        min-height: 50px;
        ${flex.horizontal.center}
        position: fixed;
        left: 50%;
        bottom: 0;
        ${mediaQuery.setMobile} {
          bottom: -10px;
        }
        @media (orientation: landscape) and (max-width: 1023px) {
          bottom: -25px;
        }
        -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);

        input[type='checkbox']:checked + label {
          background: var(--point-light);
          opacity: 70%;
        }
      `}
    >
      { makeChkboxes }
    </div>
  );
};

export default PageIndicator;