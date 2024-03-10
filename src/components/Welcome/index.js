import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [inputText, setInput] = useState("");
  const navigate = useNavigate();

  const getInput = (event) => {
    setInput(event.target.value);
  };

  const onSubmit = () => {
    localStorage.setItem("name", inputText);
    navigate("/board");
  };

  return (
    <div className="bg">
      <h1 className="head">Tiles Game</h1>
      <h1 className="head-1">Enter Your Name</h1>
      <input
        type="text"
        className="input"
        onChange={getInput}
        value={inputText}
        placeholder="Enter your name"
      />
      <button className="but" onClick={onSubmit}>
        Play
      </button>
    </div>
  );
};

export default Welcome;
