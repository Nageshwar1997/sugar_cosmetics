import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Context from "./contexts";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Context.Provider value={{}}>
        <ToastContainer position="top-center" autoClose={2000} />
        <Header />
        <main className="w-full min-h-[calc(100vh-200px)] bg-red-500">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
