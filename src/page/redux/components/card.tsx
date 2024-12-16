import "./card.less";
import { useState } from "react";
import { CARD_LIST } from "@/utils/enum.ts";

function Card() {
  // const [cardList, setCardList] = useState(CARD_LIST);
  const handleCardClick = (url: string) => {
    if (url) {
      window.open(url);
    }
  };
  return (
    <div className="card-box">
      {CARD_LIST.map((card: any, index) => (
        <div
          key={index}
          style={{
            backgroundImage: `url(${card.bg})`,
            backgroundSize: "cover",
          }}
          onClick={() => handleCardClick(card.url)}
          className="card"
        >
          {card.title}
        </div>
      ))}
    </div>
  );
}

export default Card;
