import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MdArrowDropDown } from 'react-icons/md';
import { flex, sizes } from '../../styles/presets';
import { debouncer } from '../../modules/customfunctions';
import DividePara from './DividePara';

const handler = event => {
  if (event.target.parentNode.parentNode.childNodes[1].dataset.status === 'false') {
    event.target.parentNode.parentNode.childNodes[1].dataset.status = 'true';
    event.target.parentNode.parentNode.childNodes[1].style.height = 'auto';
    event.target.parentNode.parentNode.childNodes[1].style.padding = '30px 30px 30px';
    event.target.parentNode.childNodes[2].style.transform = 'rotate(180deg)';
  } else if (event.target.parentNode.parentNode.childNodes[1].dataset.status === 'true') {
    event.target.parentNode.parentNode.childNodes[1].dataset.status = 'false';
    event.target.parentNode.parentNode.childNodes[1].style.height = '0';
    event.target.parentNode.parentNode.childNodes[1].style.padding = '0 30px 0';
    event.target.parentNode.childNodes[2].style.transform = 'rotate(360deg)';
  }
}

const scroll = event => {
  const intros = document.querySelectorAll('.paragraphs-container');
  intros.forEach((intro, i) => {
    if (intro === intros[0] || intro === intros[1]) return;
    intro.parentNode.style.transition = 'all 0.5s';
    const viewBottom = window.scrollY + window.innerHeight * 99 / 100;
    const displayingPoint = intro.parentNode.offsetTop + intro.parentNode.offsetHeight / 2
    if ( viewBottom >= displayingPoint) {
      intro.parentNode.style.opacity = '100%';
      intro.parentNode.style.left = '0';
    } else if (i % 2 === 0) {
      intro.parentNode.style.opacity = '0';
      intro.parentNode.style.left = '-150px';
    } else {
      intro.parentNode.style.opacity = '0';
      intro.parentNode.style.left = '150px';
    }
    if (window.scrollY >= displayingPoint) {
      if (i % 2 === 0) {
        intro.parentNode.style.opacity = '0';
        intro.parentNode.style.left = '-150px';
      } else {
        intro.parentNode.style.opacity = '0';
        intro.parentNode.style.left = '150px';
      }
    }
  });
};

const GenArticle = ({ data, fold }) => {
  const { icon, subject, content, setState } = data;

  React.useEffect(() => {
    window.addEventListener('scroll', debouncer(scroll));
    // window.addEventListener('scroll', scroll);
    const intros = document.querySelectorAll('.paragraphs-container');
    intros.forEach((intro, i) => {
      if (intro === intros[0] || intro === intros[1]) return;
      intro.parentNode.style.position = 'relative';
      intro.parentNode.style.opacity = '0';
      if (i % 2 === 0) {
        intro.parentNode.style.left = '-150px';
      } else {
        intro.parentNode.style.left = '150px';
      }
    });
    return () => window.removeEventListener('scroll', debouncer(scroll));
  }, []);

  if (data === undefined) {
    return <React.Fragment />;
  }

  return subject.map((sub, i) => {
    // Works 컴포넌트 전용
    if (setState !== undefined) {
      return (
        <article
          key={`article ${i}`}
          css={css`
            ${flex.vertical}
            width: 33%;
          `}
        >
          <img
            key={ `icon ${i}` }
            src={ icon[i] }
            alt="project-preview"
            onClick={setState}
            data-project={`Project ${i + 1}`}
            css={css`
              width: 80%;
              max-width: 200px;
              height: 350px;
              cursor: pointer;
              :active {
                transform: scale(0.99);
              }
            `}
          />
          <h3
            key={ `button ${i}` }
            css={css`
              margin-top: 30px;
              border: none;
              background: none;
            `}
          >{ sub }</h3>
        </article>
      );
    }
    // About 전용
    return (
      <article
        key={`article ${i}`}
        css={css`
          margin: 30px auto;
          padding: 0 35px;
          ${flex.vertical}
          align-items: flex-start;
          text-align: justify;
          background: none;
        `}
      >
        <div
          key={ `article ${i}` }
          className="article-header"
          css={css`
            ${flex.horizontal.center}
          `}
        >
          {icon[i] !== undefined ? <img key={ `icon ${i}` } src={ icon[i] } alt="icon-html" /> : ''}
          <h3
            key={ `header ${i}` }
            onClick={e => handler(e)}
            css={css`
              ${icon[i] === undefined ? '' : 'margin-left: 10px;'}
              cursor: pointer;
              :active {
                transform: scale(0.9);
              }
            `}
          >{ sub }</h3>
          <button
            key={`button ${i}`}
            onClick={e => handler(e)}
            className={`button${i}`}
            css={css`
              margin-left: 7px;
              border: 1px solid transparent;
              border-radius: 50%;
              padding: 0;
              box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.3);
              display: ${fold ? '' : 'none'};
              ${sizes.free('20px', '20px')};
              cursor: pointer;
              :active {
                transform: scale(0.9);
              }
            `}
          >
            <MdArrowDropDown
              css={css`
                pointer-events: none;
              `}
            />
          </button>
        </div>
        <div
          onScroll={() => scroll()}
          className="paragraphs-container"
          data-status={'false'}
          css={css`
            ${
              fold
                ?
                  `
                    border-top: 1px solid black;
                    border-bottom: 1px solid black;
                    padding: 0 30px 0;
                    height: 0;
                    background-color: lightgrey;
                  `
                :
                  `
                    border: none;
                  `
            }
            overflow: hidden;
            transition: all 0.3s;
          `}
        >
          {/* { content[i] } */}
          <DividePara paragraphs={content[i]} />
        </div>
      </article>
    );
  });
};

export default GenArticle;