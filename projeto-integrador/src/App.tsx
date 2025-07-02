import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { HomeInicial } from "./pages/home/home";
import { Taxonomia } from "./pages/taxonomia/taxonomia";
import { Login } from "./pages/login/login";
import { Usuarios } from "./pages/usuarios/usuarios";
import { NovoExemplar } from "./pages/novo-exemplar/novo-exemplar";
import { Exemplar } from "./pages/exemplar/exemplar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomeInicial />} />
        <Route path="/taxonomia/:id" element={<Taxonomia />} />
        <Route path="/" element={<Login />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="exemplares/novo-exemplar" element={<NovoExemplar />} />
        <Route path="exemplares/:id" element={<Exemplar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
