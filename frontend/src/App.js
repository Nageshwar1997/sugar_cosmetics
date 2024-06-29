import "./App.css";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="w-full min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
