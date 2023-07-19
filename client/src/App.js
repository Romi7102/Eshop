import "./App.css";
import NavBar from "./components/NavBar/navBar";
import HomePage from "./pages/HomePage/homePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ToastContainer position="bottom-center" limit={5}/>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </main>
    </BrowserRouter>
  );
}

export default App;
