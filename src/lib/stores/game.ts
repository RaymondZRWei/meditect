import { browser } from "$app/environment";
import { writable } from "svelte/store";

export interface GameData {
    finished: boolean;

    activeEvent: {
        // event: EventData; // TODO: ADD EVENT DATA
        stage: number;
        duration: number;
    } | null;
    finishedEvents: string[];
    symptoms: string[];
    loading: boolean;
}

export const defaultValue: GameData = {
    finished: false,
    activeEvent: null,
    finishedEvents: [],
    symptoms: [],
    loading: false,
};

const loadingState = {
    ...defaultValue,
    loading: true,
};

const getInitialValue = () => {
    if (browser) {
        const storedValue = window.localStorage.getItem("gameData");

        if (storedValue) {
            return JSON.parse(storedValue) as GameData;
        } else {
            return JSON.parse(JSON.stringify(defaultValue));
        }
    }

    return loadingState;
};

const initialValue = getInitialValue();

const game = writable<GameData>(initialValue);

game.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem("gameData", JSON.stringify(value));
    }
});

export default game;
