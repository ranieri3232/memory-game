import backImg from '../../assets/cards-png/back.png';

type CardProps = {
  frontSrc: string;
  flipped: boolean;
  click: (cardNumber: number) => void;
  index: number;
  matched: boolean;
};
import './style.css';

function Card({ frontSrc, flipped, click, index, matched }: CardProps) {
  return (
    <div className="card">
      <div className={`card-container ${flipped || matched ? 'flipped' : ''}`}>
        <div className="card-front">
          <img src={backImg} onClick={() => click(index)} />
        </div>
        <div className="card-back">
          <img src={frontSrc} onClick={() => click(index)} />
        </div>
      </div>
    </div>
  );
}

export { Card };
