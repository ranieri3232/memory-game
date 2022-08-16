import { ButtonHTMLAttributes } from 'react';
import './style.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

function NewGameButton({ isOutlined, ...props }: ButtonProps) {
  return <button {...props}>New Game</button>;
}

export { NewGameButton };
