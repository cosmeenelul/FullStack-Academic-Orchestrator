import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/departamente" element={<h1>Pagina Departamente</h1>} />
          <Route path="/profesori" element={<h1>Pagina Profesori</h1>} />

          <Route path="*" element={<h1>Pagina nu a fost găsită (404)</h1>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
