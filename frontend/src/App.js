/* eslint-disable no-restricted-globals */
import "./App.css";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import ContextProvider from "./contexts/ContextProvider";

function App() {
  const { pathname } = useLocation();

  // console.log("Location PathName", pathname);
  const hideHeaderAndFooterPaths = ["/register", "/login", "/forgot-password"];

  const shouldHideHeaderFooter = hideHeaderAndFooterPaths.includes(pathname);

  // console.log("Location", shouldHideHeaderFooter);
  return (
    <>
      <ContextProvider>
        {!shouldHideHeaderFooter && <Header />}
        <main className="w-full min-h-full">
          <Outlet />
        </main>
        {/* {!shouldHideHeaderFooter && <Footer />} */}
      </ContextProvider>
    </>
  );
}

export default App;
