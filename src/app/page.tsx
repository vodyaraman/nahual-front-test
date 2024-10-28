import "./landing.scss";
import Image from "next/image";

const Background = () => (
  <Image
    src="/background.png"
    alt=""
    width={1000}
    height={1000}
    className="background"
  />
);

const Wheel = () => (
  <section className="right-side">
    <Image
      src="/wheel.png"
      alt=""
      width={1000}
      height={1000}
      className="wheel"
    />
    <Image
      src="/playwheel.png"
      alt=""
      width={1000}
      height={1000}
      className="playwheel"
    />
    <Image
      src="/playbutton.png"
      alt=""
      width={400}
      height={400}
      className="playbutton"
    />
  </section>
);

const Header = () => (
  <header className="header">
    <Image
      src="./nahual-logo.svg"
      alt=""
      width={71}
      height={71}
      className="nahual-logo"
    />
    <h1>Nuahual Visions</h1>
  </header>
);

const Intro = () => (
  <section className="intro">
    <div className="content">

      <h2 className="title">Загляни в будущее и узнай!</h2>
      <p className="description">
        Мы предскажем, когда стоит ждать резкие денежные взлёты, маленькие радости или большие потери. С нами Вы будете готовы к неожиданным поворотам судьбы!
      </p>

      <h2 className="subtitle">Нетерпится начать?</h2>
      <p className="instruction">
        Нажмите “старт” на кругу майя в правой части экрана, загрузите фотографию ладони и получите предсказания!
      </p>

      <h2 className="subtitle">Как это работает?</h2>
      <p className="description">
        Давайте разберёмся в лучших практиках предсказаний средней Америки, познакомимся с их ритуалами и всеми известным календарём Майя.
      </p>
    </div>
    <button className="invisible-button">
      <Image src="/downarrow.png" width={64} height={64} alt="Далее" className="arrow-down" />
    </button>
  </section>
);

const PredictionTheory = () => (
  <section className="how-it-works">
    <h2>Взаимосвязь хиромантии и календарных систем Майя</h2>
    <p>
      Херомантия, как древнее искусство гадания по руке, и календарные системы майя, такие как Цолькин и Хааб, рассматриваются в данном исследовании в качестве взаимодополняющих предсказательных практик. Несмотря на то, что херомантия не была частью культурной традиции майя, существующие аналогии позволяют создать теоретическую базу для сопоставления этих двух практик. Но какая основная связь между космическими предсказаниями майя и херомантией?
    </p>

    <h2>Формулы для анализа взаимосвязи хиромантии и календарей майя:</h2>

    <h3>Цикличность и временные линии</h3>
    <p>
      Цикличность в майянском календаре интерпретируется как показатель жизненной энергии и ритмов, связанных с судьбою человека. Аналогично, календарные циклы майя включают астрономические закономерности, которые можно сопоставить с цикличными линиями жизни на руке, выраженными в временными периодами.
    </p>

    <p><strong>Llife=f(Ccycle), L(life) = f(C(cycle)) Llife=f(Ccycle)</strong></p>
    <ul>
      <li>
        Llife1, L(life) — длина линии жизни на руке, отражающая жизненные циклы.
      </li>
      <li>
        Ccycle, C(cycle) — календарные циклы майя, такие как Цолькин и Хааб.
      </li>
    </ul>
  </section>
);

const PredictionFormula = () => (
  <section className="prediction-formula">
    <h3>Духовная и космологическая связь</h3>
    <p>
      Космология майя рассматривается как основа для интерпретации судьбы через движение небесных тел. Линии на руке, такие как линия судьбы, сопоставляются с космическими циклами майя. Формула для этой взаимосвязи:
    </p>
    <p><strong>Lfate=g(θcelestial), L(fate) = g(θ(celestial))Lfate=g(θcelestial)</strong></p>
    <ul>
      <li>
        Lfate1, L(fate) — линия судьбы, предсказывающая карьеру и жизненные события.
      </li>
      <li>
        θcelestial, θ(celestial) — угол движения небесных тел, рассчитанный в календаре майя.
      </li>
    </ul>

    <h3>Жреческие предсказания</h3>
    <p>
      Жреческие гадания майя, основанные на астрономических данных, рассматриваются в контексте аналогии с формой ладони и линиями на руке. Жреческие практики включают элементы анализа судьбы через астрономические события, подобные анализу линий на руке.
    </p>
    <p><strong>Prediction=h(Aastronomical+Lpalm)</strong></p>
    <p><strong>где:</strong></p>
    <ul>
      <li>
        PredictionP, h(prediction) — предсказание жреца.
      </li>
      <li>
        AstronomicalA, h(astronomical) — астрономические события, зафиксированные в календаре.
      </li>
      <li>
        Lpalm1, L(palm) — линия на руке, интерпретируемая через жреческую традицию.
      </li>
    </ul>
  </section>
);

const PracticalApplication = () => (
  <section className="practical-application">

    <h2>Применение на практике с помощью нашей нейросети:</h2>

    <div className="showcase">
      <div className="step__one">
        <Image src="/flower1.png" alt="Шаг 1" width={320} height={350} className="step_one flower" />
        <Image src="/photohand.png" alt="Шаг 1" width={150} height={180} className="step__one photo" />

        <p className="under-photo">
          <strong>Шаг 1:</strong> анализируется линия жизни — ближайшая ключевая точка найдена на середине линии.
        </p>
      </div>

      <div className="step__two">
        <Image src="/flower2.png" alt="Шаг 1" width={280} height={300} className="step__two flower" />
        <Image src="/photosymbol.png" alt="Шаг 2" width={150} height={180} className="step_two photo" />

        <div className="under-photo">
          <strong>Шаг 2:</strong> определяется соответствующий символ из майянского календаря, например, Кан — символ возрождения и роста.
        </div>
      </div>

      <div className="step__three">
        <Image src="/photodawn.png" alt="Шаг 3" width={150} height={180} className="step_three photo" />
        <div className="under-photo">
          <strong>Шаг 3:</strong> на основе этого делается предсказание: Ожидается важное событие, связанное с изменением жизненной энергии и восстановлением сил в ближайшие 20 дней.
        </div>
      </div>

    </div>
  </section>
);

const FreeTrialSection = () => (
  <section className="free-trial-section">
    <div className="content">
      
      <h2>Попробуйте бесплатную версию!</h2>
      <p>
        Данный алгоритм объединяет два древних метода предсказаний: хиромантию и майянские календари. Применение линий на руке в сочетании с символикой и цикличностью времени у майя позволяет формировать прогнозы ближайшего будущего с глубоким духовным и символическим контекстом. Неделю и три попытки мы предоставляем бесплатно.
      </p>

      <h2>Хотите больше?</h2>
      <p>
        Ознакомьтесь с платными планами на предсказания, еженедельные рассылки советов на основе наших алгоритмов и прочих преимуществ для наших пользователей.
      </p>
    </div>
  </section>
);

const Pricing = () => (
  <section className="pricing">
    <h2>Тарифные планы</h2>
    <div className="tariff">
      <h4>Нагуаль</h4>
      <p>Три предсказания в неделю</p>
      <p>299₽</p>
    </div>
    <div className="tariff">
      <h4>Шаман</h4>
      <p>Пять предсказаний в неделю</p>
    </div>
    <div className="tariff">
      <h4>Провидец</h4>
      <p>Семь предсказаний в неделю</p>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <ActionButton text="Регистрация" className="register-button" />
    <ActionButton text="Вход" className="login-button" />
  </footer>
);

const ActionButton = ({ text = "", className = "" }) => (
  <button className={`action-button ${className}`}>{text}</button>
);

export default function Home() {
  return (
    <div className="main">
      <Background />
      <Header />
      <Wheel />
      <Intro />
      <PredictionTheory />
      <PredictionFormula />
      <PracticalApplication />
      <FreeTrialSection />
      <Pricing />
      <Footer />
    </div>
  );
}
