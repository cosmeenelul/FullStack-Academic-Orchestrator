import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Departamente from "./pages/Departamente";
function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/departamente" element={<Departamente />} />
          <Route path="/profesori" element={<h1>Pagina Profesori</h1>} />

          <Route path="*" element={<h1>Pagina nu a fost găsită (404)</h1>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
