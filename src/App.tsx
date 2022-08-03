import './app.css';
import logoImg from './assets/logo.png';

function App() {
  return (
    <div id="page-main">
      <aside>
        <img
          className="logo-img"
          src={logoImg}
          alt="react logo abaceate pera maça uva e graviola memory game"
        />
      </aside>
      <main>
        <span>test</span>
      </main>
    </div>
  );
}

export default App;
