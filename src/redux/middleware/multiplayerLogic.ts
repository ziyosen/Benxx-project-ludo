import { startGame } from '../slices/game';
import { setPlayers } from '../slices/player';
import { RootState, AppDispatch } from '../store';

interface Player {
  socketId: string;
  name: string;
};

interface newPlayerData { name: string; socketId: string; isPlaying: boolean; };
interface newPlayers { [key: string]: newPlayerData; };



export const start = (playerList: Player[], playerTurn: string) => (dispatch: AppDispatch) => {

  console.log(playerList);

  let newPlayers: newPlayers = {};

  newPlayers["P1"] = { "name": playerList[0].name, "socketId": playerList[0].socketId, "isPlaying": true };
  newPlayers["P2"] = { "name": playerList[1].name, "socketId": playerList[1].socketId, "isPlaying": true };
  newPlayers["P3"] = { "name": playerList[2].name, "socketId": playerList[2].socketId, "isPlaying": true };
  newPlayers["P4"] = { "name": playerList[3].name, "socketId": playerList[3].socketId, "isPlaying": true };

  dispatch(setPlayers(newPlayers));
  dispatch(startGame(playerTurn));


};