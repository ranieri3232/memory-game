import { useState } from 'react'
import './app.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="page-main">
			<h1>test</h1>
			<aside><span>test</span></aside>
			<main><span>test</span></main>
		</div>
  )
}

export default App;
