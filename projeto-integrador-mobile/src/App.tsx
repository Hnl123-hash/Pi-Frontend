import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomeInicial } from "./pages/home-inicial";
import { BuscaExemplar } from "./pages/busca-exemplar";
import { Exemplar } from "./pages/exemplar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomeInicial />} />
        <Route
          path="/exemplares/:tipoBusca/:stringBusca"
          element={<BuscaExemplar />}
        />
        <Route path="exemplares/:id" element={<Exemplar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
