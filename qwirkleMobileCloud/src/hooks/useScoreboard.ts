import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/reduxStore";
import { Player, deletePlayerGame, insertPlayerGame, resetGame, setActiveIndex, setFinishSteps, setRunning, swapPlayerGame } from "../redux/slicer";

export function useScoreboard() {
  const dispatch = useAppDispatch();
  const playersGame = useAppSelector(state => state.playersGame);
  const isRunning = useAppSelector(state => state.isRunning);
  const activeIndex = useAppSelector(state => state.activeIndex);
  const finishSteps = useAppSelector(state => state.finishSteps);
  const navigate = useNavigate();

  // localStorage keys: "isRunning", "activeIndex", "playersGame"
  // TODO alle localStorage uses in diese custom hook, localStorage allg.

  const incrementActiveIndex = () => {
    const newActiveIndex = (activeIndex + 1) % playersGame.length;
    dispatch(setActiveIndex(newActiveIndex));
  }

  const decrementActiveIndex = () => {
    const incremented = activeIndex - 1;
    if (incremented >= 0) {
      const newActiveIndex = (incremented) % playersGame.length;
      dispatch(setActiveIndex(newActiveIndex));
    } else {
      dispatch(setActiveIndex(playersGame.length - 1));
    }
  }

  const setIsRunning = (isGameRunning: boolean) => {
    dispatch(setRunning(isGameRunning));
  }

  const deletePlayer = (player: Player) => {
    dispatch(deletePlayerGame(player));
  }

  const insertPlayer = (player: Player) => {
    dispatch(insertPlayerGame(player));
  }

  const swapPlayer = (index: number) => {
    dispatch(swapPlayerGame(index));
  }
    
  const finish = () => {
    // localStorage.clear();
    dispatch(resetGame());
    navigate("/");
  };

  const startFinishSteps = () => {
    dispatch(setFinishSteps(playersGame.length - 1));
  }

  const decrementFinishSteps = () => {
    dispatch(setFinishSteps(finishSteps - 1));
  }

  const incrementFinishSteps = () => {
    dispatch(setFinishSteps(finishSteps + 1));
  }

  return {
    isRunning, setIsRunning, 
    playersGame, deletePlayer, insertPlayer, swapPlayer, 
    activeIndex, incrementActiveIndex, decrementActiveIndex,
    finish, finishSteps, startFinishSteps, decrementFinishSteps,incrementFinishSteps, 
  };
}