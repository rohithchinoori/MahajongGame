import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import Board from "./components/Board";
import Result from "./components/Result";
import "./App.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/board" element={<Board />} />
      <Route path="/result/:id" element={<Result />} />
    </Routes>
  </Router>
);
export default App;
