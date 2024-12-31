import Card from "@/components/common/text-card/TextCard";
import Wheel from "@/components/common/wheel/Wheel";
import { contentData } from "@/data/contentData";

export default function LandingContent() {
  return (
    <section className="landing-content">
      {/* Компонент Wheel */}
      <div className="main-content">
        <Card
          key={0}
          head={contentData[0].head}
          body={contentData[0].body}
        >
          <Wheel />
        </Card>
      </div>

      {/* Первый грид */}
      <div className="card-grid">
        {[contentData[1], contentData[3]].map((card, index) => (
          <Card
            key={index + 1}
            head={card.head}
            body={card.body}
          />
        ))}
      </div>

      {/* Второй грид */}
      <div className="card-grid">
        {[contentData[2], contentData[4]].map((card, index) => (
          <Card
            key={index + 3}
            head={card.head}
            body={card.body}
          />
        ))}
      </div>
    </section>
  );
}
