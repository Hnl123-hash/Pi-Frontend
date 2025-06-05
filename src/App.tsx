import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { HomeInicial } from "./pages/home/home";
import { Taxonomia } from "./pages/taxonomia/taxonomia";
import { Login } from "./pages/login/login";
import { Usuarios } from "./pages/usuarios/usuarios";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomeInicial />} />
        <Route path="/taxonomia/:id" element={<Taxonomia />} />
        <Route path="/" element={<Login />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
