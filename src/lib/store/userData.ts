import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { StoredUserData, UserData } from "$lib/types";

const getInitialValue = () => {
    if (browser) {
        const storedValue = window.localStorage.getItem("userData");

        if (storedValue) {
            return JSON.parse(storedValue) as UserData;
        } else {
            return null;
        }
    }

    return undefined;
};

const initialValue = getInitialValue();

const userData = writable<StoredUserData>(initialValue);

userData.subscribe((value) => {
    if (browser && value !== undefined) {
        if (value === null) {
            window.localStorage.removeItem("userData");
            return;
        }

        window.localStorage.setItem("userData", JSON.stringify(value));
    }
});

export default userData;
