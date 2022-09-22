import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__header">Технологии</h2>
      <div className="techs__container">
        <h3 className="techs__title">7 технологий</h3>
        <p className="techs__subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__links">
          <li className="techs__item">
            <a className="techs__link">HTML</a>
          </li>
          <li className="techs__item">
            <a className="techs__link">CSS</a>
          </li>
          <li className="techs__item">
            <a className="techs__link">JS</a>
          </li>
          <li className="techs__item">
            <a className="techs__link">React</a>
          </li>
          <li className="techs__item">
            <a className="techs__link">Git</a>
          </li>
          <li className="techs__item">
            <a className="techs__link">Express.js</a>
          </li>
          <li className="techs__item">
            <a className="techs__link">mongoDB</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
