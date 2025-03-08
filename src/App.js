import logo from "./logo.svg";
import "./App.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import DashBoard from "./components/DashBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewContext from "./context/NewContext";
import { useState } from "react";
function App() {
  const [booksData, setBooksData] = useState([]);
  return (
    <NewContext.Provider value={{booksData,setBooksData}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/DashBoard" element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </NewContext.Provider>
  );
}

export default App;
