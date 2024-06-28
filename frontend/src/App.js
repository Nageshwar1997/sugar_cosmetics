import "./App.css";

import Context from "./contexts";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Context.Provider value={{}}>
        <Header />
        <main className="w-full min-h-[calc(100vh-200px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
