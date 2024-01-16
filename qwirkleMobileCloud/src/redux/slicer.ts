import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Player = {
    name: string,
    gamePoints: number,
    turns: number,
    gameBiggestTurn: number,
};

export type Turn = {
    player: Player,
    pointsAdded: number,
    previousBiggestTurnGame: number,
};

type StateType = {
    playersGame: Player[],
    isRunning: boolean,
    activeIndex: number,
    turns: Turn[],
    finishSteps: number,
};

const initialState: StateType = {
    isRunning: false,
    activeIndex: 0,
    finishSteps: -1,
    playersGame: [],
    turns: [],
};

const shopSlicer = createSlice({
    name: "qwirkle",
    initialState: initialState,
    reducers: {
        setFinishSteps: (state, action: PayloadAction<number>) => {
            state.finishSteps = action.payload;
            return state;
        },
        addTurn: (state, action: PayloadAction<Turn>) => {
            state.turns.push(action.payload);
            return state;
        },
        undoTurn: (state) => {
            state.turns.pop();
            return state;
        },
        setActiveIndex: (state, action: PayloadAction<number>) => {
            state.activeIndex = action.payload;
            return state;
        },
        setRunning: (state, action: PayloadAction<boolean>) => {
            state.isRunning = action.payload;
            return state;
        },
        setPlayersGame: (state, action: PayloadAction<Player[]>) => {
            state.playersGame = action.payload;
            return state;
        },
        insertPlayerGame: (state, action: PayloadAction<Player>) => {
            state.playersGame.push(action.payload);
            return state;
        },
        updatePlayerGame: (state, action: PayloadAction<Player>) => {
            const index = state.playersGame.findIndex(p => p.name === action.payload.name);
            state.playersGame[index] = action.payload;
            return state;
        },
        deletePlayerGame: (state, action: PayloadAction<Player>) => {
            state.playersGame = state.playersGame.filter(p => p.name !== action.payload.name);
            return state;
        },
        swapPlayerGame: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            const tmp = state.playersGame[index];
            state.playersGame[index] = state.playersGame[index - 1];
            state.playersGame[index - 1] = tmp;
            return state;
        },
        resetGame: (state) => {
            for (let i = 0; i < state.playersGame.length; i++) {
                state.playersGame[i].gameBiggestTurn = 0;
                state.playersGame[i].gamePoints = 0;
                state.playersGame[i].turns = 0;
            }
            state.isRunning = false;
            state.activeIndex = 0;
            state.finishSteps = -1;
            state.turns = [];
            return state;
        },
    }, 
});

export const { 
    insertPlayerGame, updatePlayerGame, deletePlayerGame, swapPlayerGame, setPlayersGame, 
    setRunning, setFinishSteps, setActiveIndex, 
    addTurn, undoTurn, resetGame
} = shopSlicer.actions;
export const reducer = shopSlicer.reducer;