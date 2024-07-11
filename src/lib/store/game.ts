import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { GameData, StoredGameData } from "$lib/types";

const getInitialValue = (): StoredGameData => {
    if (browser) {
        const storedValue = window.localStorage.getItem("gameData");

        if (storedValue) {
            return JSON.parse(storedValue) as GameData;
        } else {
            return null;
        }
    }

    return undefined;
};

const initialValue = getInitialValue();

const game = writable<StoredGameData>(initialValue);

game.subscribe((value) => {
    if (browser && value !== undefined) {
        if (value === null) {
            window.localStorage.removeItem("gameData");
            return;
        }

        window.localStorage.setItem("gameData", JSON.stringify(value));
    }
});

export default game;
