import './style.css';

import { Card } from '../Card';

import angularImg from '../../assets/cards-png/angular.png';
import css3Img from '../../assets/cards-png/css3.png';
import dockerImg from '../../assets/cards-png/docker.png';
import firebaseImg from '../../assets/cards-png/firebase.png';
import gitImg from '../../assets/cards-png/git.png';
import htmlImg from '../../assets/cards-png/html.png';
import javaImg from '../../assets/cards-png/java.png';
import javascriptImg from '../../assets/cards-png/javascript.png';
import mongodbImg from '../../assets/cards-png/mongodb.png';
import nodejsImg from '../../assets/cards-png/nodejs.png';
import npmjsImg from '../../assets/cards-png/npmjs.png';
import postgresImg from '../../assets/cards-png/postgres.png';
import typescriptImg from '../../assets/cards-png/typescript.png';
import vitejsImg from '../../assets/cards-png/vitejs.png';
import vueImg from '../../assets/cards-png/vue.png';
import {
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

const cardSrc = [
  { src: angularImg },
  { src: css3Img },
  { src: dockerImg },
  { src: firebaseImg },
  { src: gitImg },
  { src: htmlImg },
  { src: javaImg },
  { src: javascriptImg },
  { src: mongodbImg },
  { src: nodejsImg },
  { src: npmjsImg },
  { src: postgresImg },
  { src: typescriptImg },
  { src: vitejsImg },
  { src: vueImg },
];

export type GameRefProps = {
  createNewGame: () => void;
};

type CardProps = {
  index: number;
  src: string;
  flipped: boolean;
  matched: boolean;
};

const cardsArray: CardProps[] = [];

cardSrc.map((item, index) => {
  cardsArray.push({
    index,
    ...item,
    flipped: false,
    matched: false,
  });
});
cardSrc.map((item, index) => {
  cardsArray.push({
    index: index + 15,
    ...item,
    flipped: false,
    matched: false,
  });
});

const Game = forwardRef((props, ref: Ref<GameRefProps>) => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [choiceOne, setChoiceOne] = useState<CardProps | undefined>(undefined);
  const [choiceTwo, setChoiceTwo] = useState<CardProps | undefined>(undefined);

  function shuffleCards() {
    const shuffledCards = [...cardsArray];
    shuffledCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }
  useImperativeHandle(ref, () => ({
    createNewGame() {
      const updatedCards = cards.map((card) => {
        return { ...card, flipped: false, matched: false };
      });
      setCards(updatedCards);
      const timeoutRef = setTimeout(() => {
        shuffleCards();
      }, 1000);
      return () => {
        clearTimeout(timeoutRef);
      };
    },
  }));

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    let timeOutMatch: number;
    if (!choiceOne || !choiceTwo) {
      return;
    }
    let updatedCards: CardProps[];
    if (choiceOne.src === choiceTwo.src) {
      updatedCards = cards.map((card) => {
        if (card.index === choiceOne.index || card.index === choiceTwo.index) {
          return { ...card, matched: true };
        }
        return card;
      });
      setChoiceOne(undefined);
      setChoiceTwo(undefined);
      setCards(updatedCards);
    } else {
      updatedCards = cards.map((card) => {
        if (card.index === choiceOne.index || card.index === choiceTwo.index) {
          return { ...card, flipped: false };
        }
        return card;
      });
      timeOutMatch = setTimeout(() => {
        setChoiceOne(undefined);
        setChoiceTwo(undefined);
        setCards(updatedCards);
      }, 2000);
    }

    return () => {
      clearTimeout(timeOutMatch);
    };
  }, [choiceOne, choiceTwo]);

  function handleClick(cardNumber: number) {
    if (choiceOne && choiceTwo) {
      return;
    }
    const updatedCards = cards.map((card, index) => {
      if (cardNumber === index) {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
        return { ...card, flipped: !card.flipped };
      }
      return card;
    });
    setCards(updatedCards);
  }

  return (
    <div className="game-grid">
      {cards.map((item, index) => (
        <Card
          key={index}
          frontSrc={item.src}
          flipped={item.flipped}
          index={index}
          click={handleClick}
          matched={item.matched}
        />
      ))}
    </div>
  );
});
Game.displayName = 'Game';
export { Game };
