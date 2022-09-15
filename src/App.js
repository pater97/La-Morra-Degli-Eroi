// importo il routing
import { Routes, Route, Link } from "react-router-dom"
// component import
import Home from "./screens/Home"
import Game from "./screens/Game"
import Ranking from "./screens/Ranking"
import Result from "./screens/Result"

// css import
import "./App.css"

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Game" element={<Game />} />
        <Route path="Ranking" element={<Ranking />} />
        <Route path="Result" element={<Result />} />
      </Routes>
    </div>
  )
}

export default App
