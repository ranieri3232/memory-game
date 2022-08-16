import { useRef } from 'react';
import './app.css';
import logoImg from './assets/logo.png';
import { Game, GameRefProps } from './components/Game';
import { NewGameButton } from './components/NewGameButton';

function App() {
  const gameRef = useRef<GameRefProps>(null);

  function HandleNewGame() {
    gameRef.current?.createNewGame();
  }
  return (
    <div id="page-main">
      <aside>
        <img className="logo-img" src={logoImg} alt="react logo memory game" />
        <NewGameButton type="button" onClick={HandleNewGame} />
      </aside>
      <main>
        <Game ref={gameRef} />
      </main>
    </div>
  );
}

export default App;
