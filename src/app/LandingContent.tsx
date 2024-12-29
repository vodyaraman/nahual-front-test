import Card from "@/components/common/text-card/TextCard";
import Wheel from "@/components/common/wheel/Wheel";

const cardData = Array.from({ length: 8 }, (_, index) => ({
    head: `Card Title ${index + 1}`,
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.",
    link: "/",
}));

export default function LandingContent() {
    return (
        <section className="landing-content">
            {/* Первый грид */}
            <div className="card-grid">
                {cardData.slice(0, 2).map((card, index) => (
                    <Card
                        key={index}
                        head={card.head}
                        body={card.body}
                        link={card.link}
                    />
                ))}
            </div>

            {/* Компонент Wheel */}
            <div className="main-content">
                <Card
                    key={99}
                    head={"Добро пожаловать!"}
                    body={"Приходите, покупайте, свои деньги оставляйте, про покупку забывайте, приходите, покупайте!"}
                    link={""}
                >
                    <Wheel />
                </Card>
            </div>

            {/* Второй грид */}
            <div className="card-grid">
                {cardData.slice(2, 4).map((card, index) => (
                    <Card
                        key={index + 2} // Увеличиваем индекс для уникального ключа
                        head={card.head}
                        body={card.body}
                        link={card.link}
                    />
                ))}
            </div>
        </section>
    );
}
