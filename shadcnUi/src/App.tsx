import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/layout/Navbar"
import Favorites from "./pages/Favorites"
import { MovieProvider } from "./contexts/MovieContex"

function App() {
  return (
    <MovieProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </MovieProvider>
  )
}

export default App