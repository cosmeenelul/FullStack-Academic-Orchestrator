import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Departamente from "./pages/Departamente";
import Profesori from "./pages/Profesori";
function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/departamente" element={<Departamente />} />
          <Route path="/profesori" element={<Profesori />} />

          <Route path="*" element={<h1>Pagina nu a fost găsită (404)</h1>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
