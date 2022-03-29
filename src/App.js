import Login from "./Login/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
