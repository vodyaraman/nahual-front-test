"use client"
import { useEffect, useState } from "react";
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

const SectionNav = () => {
  const sectionIds = [
    "intro",
    "how-it-works",
    "prediction-formula",
    "practical-application",
    "free-trial-section",
    "pricing",
  ];
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  const handleScroll = () => {
    const mainContainer = document.querySelector('.main') as HTMLElement | null;
    if (!mainContainer) return;

    sectionIds.forEach((id, index) => {
      const section = document.getElementById(id);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const scrollTop = mainContainer.scrollTop;
        const visibleHeight = mainContainer.clientHeight;

        if (scrollTop >= sectionTop - visibleHeight / 2 && scrollTop < sectionBottom - visibleHeight / 2) {
          setActiveSection(id);
          setIndicatorPosition(index * 22); // Смещение индикатора, регулировать в соответствии с gap
        }
      }
    });
  };

  const scrollToSection = (sectionId: string) => {
    const mainContainer = document.querySelector('.main') as HTMLElement | null;
    const targetSection = document.getElementById(sectionId);
    if (mainContainer && targetSection) {
      mainContainer.scrollTo({
        top: targetSection.offsetTop - 35,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const mainContainer = document.querySelector('.main') as HTMLElement | null;
    mainContainer?.addEventListener('scroll', handleScroll);

    return () => mainContainer?.removeEventListener('scroll', handleScroll);
  });

  return (
    <div className="section-nav">
      <div className="indicator" style={{ top: `${indicatorPosition}px` }} />

      {sectionIds.map((id) => (
        <div
          key={id}
          className={`nav-dot ${activeSection === id ? 'active' : ''}`}
          onClick={() => scrollToSection(id)}
        />
      ))}
    </div>
  );
}

const Wheel = () => (
  <section className="right-side visible">
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
    <div className="luminosity" />
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
      draggable="false"
    />
    <h1>Nuahual Visions</h1>
    <div className="auth">
      <button className="register">
        Registration
      </button>
      <button className="login">
        Login
      </button>
    </div>
  </header>
);

const Intro = () => {
  const scrollToSection = (sectionId: string) => {
    const mainContainer = document.querySelector('.main') as HTMLElement | null;
    const targetSection = document.getElementById(sectionId);

    if (mainContainer && targetSection) {
      // Получаем верхнюю позицию секции относительно контейнера main
      const sectionTop = targetSection.offsetTop;

      // Прокручиваем main с отступом 100 пикселей выше
      mainContainer.scrollTo({
        top: sectionTop - 50,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="intro visible" id="intro">
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
      <button className="invisible-button" onClick={() => scrollToSection('how-it-works')} id="next-button">
        <Image src="/downarrow.png" width={64} height={64} alt="Далее" className="arrow-down" />
      </button>
    </section>
  )
};

const PredictionTheory = () => (
  <section className="how-it-works" id="how-it-works">
    <h2>Взаимосвязь хиромантии и календарных систем Майя</h2>
    <p>
      Херомантия, как древнее искусство гадания по руке, и календарные системы майя, такие как Цолькин и Хааб, рассматриваются в данном исследовании в качестве взаимодополняющих предсказательных практик. Несмотря на то, что херомантия не была частью культурной традиции майя, существующие аналогии позволяют создать теоретическую базу для сопоставления этих двух практик. Но какая основная связь между космическими предсказаниями майя и херомантией?
    </p>

    <h2>Формулы для анализа взаимосвязи хиромантии и календарей майя:</h2>

    <h3>Цикличность и временные линии</h3>
    <p>
      Цикличность в майянском календаре интерпретируется как показатель жизненной энергии и ритмов, связанных с судьбою человека. Аналогично, календарные циклы майя включают астрономические закономерности, которые можно сопоставить с цикличными линиями жизни на руке, выраженными в временными периодами.
    </p>

    <p><code>Llife=f(Ccycle), L(life) = f(C(cycle)) Llife=f(Ccycle)</code></p>
    <ul>
      <li>
        <code>Llife1, L(life)</code> — длина линии жизни на руке, отражающая жизненные циклы.
      </li>
      <li>
        <code>Ccycle, C(cycle)</code> — календарные циклы майя, такие как Цолькин и Хааб.
      </li>
    </ul>
  </section>
);

const PredictionFormula = () => (
  <section className="prediction-formula" id="prediction-formula">
    <h3>Духовная и космологическая связь</h3>
    <p>
      Космология майя рассматривается как основа для интерпретации судьбы через движение небесных тел. Линии на руке, такие как линия судьбы, сопоставляются с космическими циклами майя. Формула для этой взаимосвязи:
    </p>
    <p><code>Lfate=g(θcelestial), L(fate) = g(θ(celestial))Lfate=g(θcelestial)</code></p>
    <ul>
      <li>
        <code>Lfate1, L(fate)</code> — линия судьбы, предсказывающая карьеру и жизненные события.
      </li>
      <li>
        <code>θcelestial, θ(celestial)</code> — угол движения небесных тел, рассчитанный в календаре майя.
      </li>
    </ul>

    <h3>Жреческие предсказания</h3>
    <p>
      Жреческие гадания майя, основанные на астрономических данных, рассматриваются в контексте аналогии с формой ладони и линиями на руке. Жреческие практики включают элементы анализа судьбы через астрономические события, подобные анализу линий на руке.
    </p>
    <p><code>Prediction=h(Aastronomical+Lpalm)</code></p>
    <p><strong>где:</strong></p>
    <ul>
      <li>
        <code>PredictionP, h(prediction)</code> — предсказание жреца.
      </li>
      <li>
        <code>AstronomicalA, h(astronomical)</code> — астрономические события, зафиксированные в календаре.
      </li>
      <li>
        <code>Lpalm1, L(palm)</code> — линия на руке, интерпретируемая через жреческую традицию.
      </li>
    </ul>
  </section>
);

const PracticalApplication = () => (
  <section className="practical-application" id="practical-application">

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

const FreeTrialSection = () => {
  const scrollToSection = (sectionId: string) => {
    const mainContainer = document.querySelector('.main') as HTMLElement | null;
    const targetSection = document.getElementById(sectionId);

    if (mainContainer && targetSection) {
      // Получаем верхнюю позицию секции относительно контейнера main
      const sectionTop = targetSection.offsetTop;

      // Прокручиваем main с отступом 100 пикселей выше
      mainContainer.scrollTo({
        top: sectionTop - 50,
        behavior: 'smooth',
      });
    }
  };
  return (
  <section className="free-trial-section" id="free-trial-section">
    <div className="content">

      <h2>Попробуйте бесплатную версию!</h2>
      <p>
        Данный алгоритм объединяет два древних метода предсказаний: хиромантию и майянские календари. Применение линий на руке в сочетании с символикой и цикличностью времени у майя позволяет формировать прогнозы ближайшего будущего с глубоким духовным и символическим контекстом. Неделю и три попытки мы предоставляем бесплатно.
      </p>
      <div className="auth text">
          <button className="register">
            Registration
          </button>
          <button className="login">
            Login
          </button>
        </div>

      <h2>Хотите больше?</h2>
      <p>
        Ознакомьтесь с платными планами на предсказания, еженедельные рассылки советов на основе наших алгоритмов и прочих преимуществ для наших пользователей.
      </p>
      <button className="invisible-button" onClick={() => scrollToSection('pricing')} id="next-button">
        <Image src="/downarrow.png" width={64} height={64} alt="Далее" className="arrow-down" />
      </button>
    </div>
  </section>
)};

const Pricing = () => (
  <section className="pricing" id="pricing">
    <h2>Тарифные планы</h2>

    <div className="content">
      <div className="card">
        <div className="tarif">
          <h3>Шаман</h3>
          <li>Три предсказания в неделю</li>
        </div>
        <button>299₽</button>
      </div>
      <div className="card">
        <div className="tarif">
          <h3>Провидец</h3>
          <li>Пять предсказаний в неделю</li>
        </div>
        <button>499₽</button>
      </div>
      <div className="card">
        <div className="tarif">
          <h3>Нагуаль</h3>
          <li>
            Семь предсказаний в неделю
          </li>
        </div>
        <button>899₽</button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer">

  </footer>
);

export default function Home() {
  useEffect(() => {
    const main = document.querySelector('.main') as HTMLElement | null;

    const handleScroll = () => {
      const sections = Array.from(document.querySelectorAll('.main section')) as HTMLElement[];

      sections.forEach((section) => {
        if (section.classList.contains('right-side') || section.classList.contains('intro')) return;

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const mainScrollTop = main!.scrollTop;
        const mainVisibleBottom = mainScrollTop + main!.clientHeight;

        // Смещение в 200px выше
        const isVisible =
          sectionTop < mainVisibleBottom - 400 && sectionBottom > mainScrollTop;

        if (isVisible) {
          section.classList.add('visible');
        } else {
          section.classList.remove('visible');
        }
      });
    };

    main?.addEventListener('scroll', handleScroll);

    return () => main?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const main = document.querySelector('.main') as HTMLElement | null;
    const wheel = document.querySelector('.wheel') as HTMLElement | null;
    const playWheel = document.querySelector('.playwheel') as HTMLElement | null;

    let lastScrollTop = 0;
    let rotation = 0;

    const handleScroll = () => {
      const mainScrollTop = main!.scrollTop;
      const delta = mainScrollTop - lastScrollTop; // Изменение позиции прокрутки

      // Вычисляем новый угол поворота
      rotation += delta * 0.15;
      if (wheel) {
        wheel.style.transform = `rotate(-${rotation}deg)`; // Применяем поворот к `wheel`
      }
      if (playWheel) {
        playWheel.style.transform = `rotate(${rotation}deg)`;
      }

      lastScrollTop = mainScrollTop; // Обновляем последнюю позицию прокрутки
    };

    main?.addEventListener('scroll', handleScroll);

    return () => main?.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="main">
      <Background />
      <Header />
      <SectionNav />
      <Wheel />
      <Intro />
      <PredictionTheory />
      <PredictionFormula />
      <PracticalApplication />
      <FreeTrialSection />
      <Pricing />
      <section />
      <Footer />
    </div>
  );
}