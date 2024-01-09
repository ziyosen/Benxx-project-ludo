"use client";
import { Socket } from "socket.io-client";
import Dice from "./Dice";
import { useAppSelector } from "@/redux/hooks/hooks";

interface PlayerCard {
  id: String;
  socket: Socket;
}

const PlayerCard = ({ id, socket }: PlayerCard) => {

  const player = useAppSelector((state) => state.players[+id.split('')[1] - 1]);
  const invisible = !player?.isPlaying ? 'invisible' : '';
  const currentTurn = useAppSelector((state) => state.gameState.currentTurn);
  const card_flex = (id === "P3" || id === "P4") ? `flex flex-row-reverse` : `flex`;

  return (
    <div className={card_flex}>
      <div className={`${card_flex} ${invisible} justify-center items-center w-40 h-20 px-4 py-2 rounded-2xl shadow-md shadow-slate-700 bg-slate-600 transition-all duration-300 ease-in-out hover:bg-slate-700 mx-1`}>
        {
          player?.isPlaying &&
          <div className="text-md text-white text-lg font-mono max-w-[100px] line-clamp-1 overflow-ellipsis  overflow-hidden">{player?.name}</div>
        }
      </div>
      {currentTurn === player?.socketId && <Dice key={player.id} socketId={player.socketId} socket={socket} />}
    </div>
  );
};

export default PlayerCard;