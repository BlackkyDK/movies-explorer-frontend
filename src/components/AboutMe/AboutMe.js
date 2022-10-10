import "./AboutMe.css";
import photo from "../../images/photo-galina.jpg";

function AboutMe() {
  return (
    <section className="aboutme">
      <h2 className="aboutme__header">Студент</h2>
      <div className="aboutme__columns">
        <div className="aboutme__column">
          <h3 className="aboutme__title">Галина</h3>
          <p className="aboutme__subtitle">Фронтенд-разработчик, 35 лет</p>
          <p className="aboutme__text">
            Я родилась и живу в Самаре, закончила Самарский Государственный
            Университет. У меня есть муж и сын, а также два кота. Я люблю
            слушать музыку, MMORPG. Десять лет организовывала выставки и деловые
            миссии для Самарской области. Планирую после окончания
            Яндекс.Практикума искать работу в IT.
          </p>
          <ul className="aboutme__list">
            <li className="aboutme__list-item">
              <a
                className="aboutme__link"
                href="https://github.com/BlackkyDK"
                target="blank"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img src={photo} className="aboutme__img" alt="Фото" />
      </div>
    </section>
  );
}

export default AboutMe;
