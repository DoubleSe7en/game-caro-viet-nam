/* eslint-disable consistent-return */
import gameConstants from '../constants/game-constants';
import calculateWinner from '../algorithm/calculateWinner';

const initState = {
  historyState: [
    {
      squares: Array(400).fill(null)
    }
  ],
  xIsNext: true,
  winner: null,
  PlayAgain: false,
  stepNumber: 0,
  lastStepNumber: -1,
  listIndexWin: null, 
  listIndexWinBackup: null
};



function game(state = initState, action) {
  const { historyState, xIsNext, winner, stepNumber, listIndexWinBackup} = state;
  switch (action.type) {
    case gameConstants.MAKE_MOVE: {
      const i = action.payload;
      const history = historyState.slice(0, stepNumber + 1);
      const current = historyState[history.length - 1];
        const squares = current.squares.slice();
      if (squares[i] || winner) {
        return state;
      }
      squares[i] = xIsNext ? "X" : "O";
      const check = calculateWinner(squares, i);
      if (check) {
        return {
          ...state,
          historyState: history.concat([{
            squares
          }]),
          winner: squares[i],
          PlayAgain: true,
          stepNumber: history.length,
          lastStepNumber: history.length,
          listIndexWin: check,
          listIndexWinBackup: check,
        };
      }

      return {
        ...state,
        historyState: history.concat([{
          squares
        }]),
        xIsNext: !xIsNext,
        stepNumber: history.length
      };
    }

    case gameConstants.PLAY_AGAIN: {
      return {
        ...state,
        historyState: [
          {
            squares: Array(400).fill(null)
          }
        ],
        xIsNext: true,
        winner: null,
        PlayAgain: null,
        stepNumber: 0,
        listIndexWin: null,
        listIndexWinBackup: null
      };
    }

    case gameConstants.JUMP_TO: {
      const step = action.payload;
      if (state.lastStepNumber === step) {
        return {
          ...state,
          stepNumber: step,
          xIsNext: step % 2 === 0,
          listIndexWin: listIndexWinBackup
        };
      }
      return {
        ...state,
        stepNumber: step,
        xIsNext: step % 2 === 0,
        listIndexWin: null
      };
    }

    case gameConstants.BACK_STEP: {
      if (state.stepNumber > 0) {
        return {
          ...state,
          stepNumber: stepNumber - 1,
          xIsNext: !xIsNext,
          listIndexWin: null
        };
      }
      return state;
    }

    case gameConstants.NEXT_STEP: {
      if (state.stepNumber + 1 === state.lastStepNumber) {
        return {
          ...state,
          stepNumber: stepNumber + 1,
          listIndexWin: state.listIndexWinBackup
        };
      }
      if (state.stepNumber < state.historyState.length - 1) {
        return {
          ...state,
          stepNumber: stepNumber + 1,
          xIsNext: !xIsNext,
          listIndexWin: null
        };
      }
      return state;
    }

    default:
      return state;
  }
}

export default game;