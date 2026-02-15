import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/layout/Navbar"
import Favorites from "./pages/Favorites"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  )
}

export default App