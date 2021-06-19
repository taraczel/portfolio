// function for displaying paragraphs
export const genContent = object => {
  if (object === undefined) {
    return;
  }
  const target = Object.keys(object);
  return (
    <article>
      {target.map((data, i) => <p key={i}>{object[data]}</p>)}
    </article>
  );
};

// function for displaying sections
export const genSection = (...objects) => objects.map((object, i) => {
  if (object === undefined) {
    return;
  }
  const { header, icon, subject, content, setState } = object;
  const articleGenerator = subjects => subjects.map((subject, j) => {
    if (setState !== undefined) {
      return (
        <article key={`article ${j}`}>
          <button onClick={setState}>{ icon[j] }</button>
          <h4><button onClick={setState}>{ subject }</button></h4>
          <p>{ content[j] }</p>
        </article>
      );
    }
    return (
      <article key={`article ${j}`}>
        { icon[j] }
        <h4>{ subject }</h4>
        <p>{ content[j] }</p>
      </article>
    );
  });
  return (
    <section key={`section ${i}`}>
      { header !== '' ? <h2>{ header }</h2> : '' }
      { header !== '' ? <hr /> : '' }
      { articleGenerator(subject) }
    </section>
  );
});