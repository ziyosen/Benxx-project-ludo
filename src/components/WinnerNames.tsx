'use client';
import { useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaTrophy, FaMedal, FaRibbon } from "react-icons/fa6";

const LeaderBoard = () => {
  const winners = useAppSelector((state) => state.gameState.winnerList);
  const players = useAppSelector((state) => state.players);
  const gameStatus = useAppSelector((state) => state.gameState.gameStatus);
  const router = useRouter();

  useEffect(() => {
    if (gameStatus !== 'end')
      router.push('/customize');
  }, [gameStatus]);



  const getMedalIcon = (index: number) => {
    switch (index) {
      case 0: return <FaTrophy />;
      case 1: return <FaMedal />;
      case 2: return <FaRibbon />;
      default: return '';
    }
  };

  const getWinnerClass = (index: number) => {
    const colors = [
      'bg-gradient-to-r from-amber-300 to-amber-500',
      'bg-gradient-to-r from-gray-200 to-gray-300',
      'bg-gradient-to-r from-orange-400 to-orange-500'];
    return colors[Math.min(index, 2)] || '';
  };

  return (
    <div className="text-center mt-">
      <div className="flex flex-col justify-center items-center">
        {winners.map((winner, index) => (
          <div key={index} className={`${getWinnerClass(index)} p-4 rounded-lg my-2`}>
            <p className="flex text-xl font-mono items-center px-2"><span className="text-3xl mr-4">{getMedalIcon(index)}</span>{players[+winner.split('')[1] - 1].name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;

