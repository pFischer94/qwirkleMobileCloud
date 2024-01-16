import { useAppDispatch, useAppSelector } from "../redux/reduxStore";
import { Player, Turn, addTurn, undoTurn, updatePlayerGame } from "../redux/slicer";
import { useScoreboard } from "./useScoreboard";

export function useTurns() {
    const turns = useAppSelector(state => state.turns);
    const dispatch = useAppDispatch();
    const { decrementActiveIndex, incrementFinishSteps } = useScoreboard();

    const executeTurn = (player: Player, points: number) => {
        const turn: Turn = {
            player: player,
            pointsAdded: points,
            previousBiggestTurnGame: player.gameBiggestTurn,
        };
        dispatch(addTurn(turn));

        const newPlayer: Player = {
            name: player.name,
            gamePoints: player.gamePoints + points,
            turns: player.turns + 1,
            gameBiggestTurn: player.gameBiggestTurn < points ? points : player.gameBiggestTurn,
        };
        dispatch(updatePlayerGame(newPlayer));
    }

    const undoLastTurn = () => {
        if (turns.length > 0) {
            const turnToUndo = turns[turns.length - 1];
            const player = turnToUndo.player;
            const newPlayer: Player = {
                name: player.name,
                gamePoints: player.gamePoints,
                turns: player.turns,
                gameBiggestTurn: turnToUndo.previousBiggestTurnGame,
            };
            dispatch(updatePlayerGame(newPlayer));
            dispatch(undoTurn());
            decrementActiveIndex();
            incrementFinishSteps();
        }
    };

    return { turns, executeTurn, undoLastTurn };
};