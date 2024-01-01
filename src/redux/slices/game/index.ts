import { createSlice } from "@reduxjs/toolkit";

type tokensOnBoard = {
  id: string,
  boardSquareId: string;
}[];

interface GameState {
  numberOfPlayers: number;
  currentTurn: string;
  diceRoll: number;
  hasRolled: boolean;
  isSix: boolean;
  isCapture: boolean,
  tokensOnBoardList: tokensOnBoard;
  winnerList: string[];
  gameStatus: string;
}

const gameState: GameState = {
  "numberOfPlayers": 4,
  "currentTurn": "P1",
  "diceRoll": 0,
  "hasRolled": false,
  "isSix": false,
  "isCapture": false,
  "tokensOnBoardList": [],
  "winnerList": [],
  "gameStatus": 'start'
};

const calculateNextTurn = (state: GameState) => {
  let currentIndex = +state.currentTurn.slice(1);
  if (state.numberOfPlayers === 2) {
    return currentIndex === 1 ? 'P3' : 'P1';
  }
  let nextIndex = (currentIndex % state.numberOfPlayers) + 1;
  let wrappedIndex = (nextIndex + state.numberOfPlayers - 1) % state.numberOfPlayers + 1;
  while (state.winnerList.includes(`P${wrappedIndex}`)) {
    wrappedIndex = (wrappedIndex % state.numberOfPlayers) + 1;
  }
  return `P${wrappedIndex}`;
};


export const gameSlice = createSlice({
  name: 'gameState',
  initialState: gameState,
  reducers: {
    setNoOfPlayers: (state, action) => {
      state.numberOfPlayers = action.payload;
    },
    startGame: (state, action) => {
      state.gameStatus = 'inPlay';
      state.currentTurn = action.payload;
    },
    updateWinnerList: (state) => {
      state.winnerList.push(state.currentTurn);
    },
    endGame: (state) => {
      state.gameStatus = 'end';
    },
    diceRoll: (state) => {
      let number = Math.floor(Math.random() * 6) + 1;
      state.diceRoll = number;
      state.hasRolled = true;
      if (number == 6)
        state.isSix = true;
    },
    passTurn: (state) => {
      state.diceRoll = 0;
      state.hasRolled = false;
      state.isSix = false;
      state.isCapture = false;
      state.currentTurn = calculateNextTurn(state);
    },
    updateMoveStatus: (state) => {
      state.diceRoll = 0;
      state.hasRolled = false;
      if (state.isSix)
        state.isSix = false;
      else if (state.isCapture)
        state.isCapture = false;
      else
        state.currentTurn = calculateNextTurn(state);
    },
    updateCapture: (state) => {
      state.isCapture = true;
    },
    addTokenToBoardList: (state, action) => {
      let { id, boardSquareId } = action.payload;
      let existingTokenIndex = state.tokensOnBoardList.findIndex(token => token.id === id);
      if (existingTokenIndex !== -1) {
        state.tokensOnBoardList[existingTokenIndex].boardSquareId = boardSquareId;
      } else {
        state.tokensOnBoardList.push(action.payload);
      }
    },
    removeTokenFromBoardList: (state, action) => {
      state.tokensOnBoardList = state.tokensOnBoardList.filter(token => token.id !== action.payload.id);
    }
  }
});

export const { setNoOfPlayers, startGame, diceRoll, passTurn, updateMoveStatus, updateCapture, addTokenToBoardList, removeTokenFromBoardList, updateWinnerList, endGame } = gameSlice.actions;
export default gameSlice.reducer;