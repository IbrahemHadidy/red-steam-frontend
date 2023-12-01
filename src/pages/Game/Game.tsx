import { FC } from "react";
import { useParams, Navigate, Routes, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
import SecondNavbar from "../../components/SecondNavbar/SecondNavbar";
import MediaAndSummary from "./MediaAndSummary/MediaAndSummary";
import GameContent from "./GameContent/GameContent";
import Footer from "../../components/Footer/Footer";
import gameData from "./gameData";
import "./Game.scss";

interface GameProps {
  gameId: string;
}

const Game: FC<GameProps> = () => {
  const { id } = useParams<{ id?: string }>();
  const game = gameData.find((game) => game.id === id);

  if (!game) {
    console.error("Game not found");
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <SecondNavbar />
      <div className="game">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <MediaAndSummary game={game} />
                <GameContent game={game} />
              </div>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Game;
