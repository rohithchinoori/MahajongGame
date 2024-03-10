import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const TILE_IMAGES = [
  "https://img.freepik.com/free-psd/3d-emoji-isolated_23-2151171332.jpg?t=st=1710057900~exp=1710061500~hmac=92992374933d2a45cbcd406915f7e41a7cef0b98b0d6bc2805fd92c634d6e89d&w=740",
  "https://img.freepik.com/free-psd/emoji-element-isolated_23-2150355001.jpg?t=st=1710057929~exp=1710061529~hmac=1d535f8fb30c50ab09ec67832c7f4e3ebb9a0360231f77aee4370a72ca7ba127&w=740",
  "https://img.freepik.com/free-psd/3d-rendering-emoji-icon_23-2149878818.jpg?t=st=1710057952~exp=1710061552~hmac=b7f2e03745b953a59f0793fdd1f57de9bdd3bfc3d37042221dd81c7c12471d3c&w=740",
  "https://img.freepik.com/free-vector/hungry-emoji-illustration_23-2151016335.jpg?t=st=1710057984~exp=1710061584~hmac=6131c786ad09051a317f8339f1519306985195cde8094c8867fee28662e0a8da&w=740",
  "https://img.freepik.com/free-psd/emoji-element-isolated_23-2150354998.jpg?t=st=1710058010~exp=1710061610~hmac=69bb153e83faaf6a559ad3865e2cc2ae3ea6fb161e415d6087bb8cc28e49f311&w=740",
  "https://img.freepik.com/free-vector/gradient-mustache-emoji-illustration_52683-148487.jpg?t=st=1710058034~exp=1710061634~hmac=a8204229e3a5faf504d2f9b5f85592f121e644d58786b802fd38cfef2b730553&w=740",
  "https://img.freepik.com/free-vector/gradient-hungry-emoji-illustration_52683-148478.jpg?t=st=1710058069~exp=1710061669~hmac=4ec350e7aa55f912198d0c4e41d34f652f630f71f0ceb38c01ad16dc34437180&w=740",
  "https://img.freepik.com/free-vector/hurt-face-emoji-illustration_23-2151316510.jpg?t=st=1710068126~exp=1710071726~hmac=35ea1701368cf42844f0876c8cb5e77efe172c1777425ce4e5c156a00ec4102e&w=740",
];
const Board = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [openedTiles, setOpenedTiles] = useState([]);
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (score === 40) {
      clearInterval(timerId);
      setGameOver(true);
      navigate(`/result/${time}`);
    }
    // eslint-disable-next-line
  }, [score, timerId]);

  useEffect(() => {
    const id = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    setTimerId(id);

    return () => {
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const tempImages = [...TILE_IMAGES, ...TILE_IMAGES];
    const shuffledImages = tempImages.sort(() => Math.random() - 0.5);

    const newBoard = [];
    let id = 0;
    for (let i = 0; i < 16; i++) {
      newBoard.push({
        id: id++,
        image: shuffledImages.pop(),
        matched: false,
        showImage: false,
      });
    }
    setBoard(newBoard);
  };

  const onImage = (id) => {
    if (openedTiles.includes(id) || openedTiles.length === 2 || gameOver) {
      return;
    }

    const updatedBoard = board.map((item) =>
      item.id === id ? { ...item, showImage: true } : item
    );
    setBoard(updatedBoard);
    setOpenedTiles([...openedTiles, id]);

    if (openedTiles.length === 1) {
      const [firstTileId] = openedTiles;
      const firstTile = board.find((tile) => tile.id === firstTileId);
      const secondTile = board.find((tile) => tile.id === id);

      if (firstTile && secondTile && firstTile.image === secondTile.image) {
        setScore((prevScore) => prevScore + 5);
        setOpenedTiles([]);
      } else {
        setTimeout(() => {
          hideOpenedTiles();
        }, 1000);
      }
    }
  };

  const hideOpenedTiles = () => {
    const [firstTileId, secondTileId] = openedTiles;
    const updatedBoard = board.map((item) =>
      item.id === firstTileId || item.id === secondTileId
        ? { ...item, showImage: false }
        : item
    );
    setBoard(updatedBoard);
    setOpenedTiles([]);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };
  let time = formatTime(timer);
  console.log(time);

  return (
    <div className="bg-1">
      <h1 className="game-head">Mahjong Game</h1>
      <div className="score-card">
        <p>Score: {score}</p>
        <p>
          Welcome{" "}
          <span className="username">{localStorage.getItem("name")}!</span>
        </p>
        <p>Time: {formatTime(timer)}</p>
      </div>
      <div className="Board">
        {board.map((tile) => (
          <div key={tile.id} className="Tile" onClick={() => onImage(tile.id)}>
            {tile.showImage && !tile.matched && (
              <img src={tile.image} alt={tile.id} className="img" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
