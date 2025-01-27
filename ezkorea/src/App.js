import Signup from "../src/pages/Signup";
import Login from "../src/pages/Login";
import Home from "../src/pages/Home";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<Signup></Signup>}></Route>
          <Route path="login" element={<Login></Login>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="header" element={<Header></Header>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
