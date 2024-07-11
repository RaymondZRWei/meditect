import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { GameData } from "$lib/types";

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

type StoredGameData = GameData | null | undefined;

const initialValue = getInitialValue();

const game = writable<StoredGameData>(initialValue);

game.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem("gameData", JSON.stringify(value));
    }
});

export default game;
