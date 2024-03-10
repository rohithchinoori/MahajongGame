import "./index.css";
import { Link, useParams } from "react-router-dom";

const Result = (props) => {
  const { id } = useParams();

  return (
    <div className="bg-1">
      <h1>React Pile</h1>
      <div className="bg-2">
        <h1 className="game">Game Finished</h1>
        <p className="time">Score : 40</p>
        <p className="time">Time Taken: {id}</p>
        <Link to="/board">
          <button className="but">Play Again</button>
        </Link>
      </div>
    </div>
  );
};

export default Result;
