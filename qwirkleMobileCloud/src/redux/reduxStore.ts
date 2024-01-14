import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./slicer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// INFO Äquivalent zum vorherigen Context, ähnlich vorheriger global state
export const store = configureStore({
    reducer: reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;