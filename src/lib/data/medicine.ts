import type { GameData, Medicine } from "$lib/types";

export const medicines: Medicine[] = [
    {
        name: "Antibiotics",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Naloxone",
        duration: 5,
        updateGame: (game) => {
            if (!game.disease.arbitraryValues.opioid) return game;

            game.disease.arbitraryValues.opioid -= 50;
            return game;
        },
    },
    {
        name: "Morphine",
        duration: 5,
        updateGame: (game) => {
            // // Side effect if opioid is not present
            // if (!game.disease.arbitraryValues.opioid) {
            //     game.heartRate.value /= 1.25;
            //     return game;
            // }

            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Rivaroxaban",
        duration: 5,
        updateGame: (game) => {
            if (!game.disease.arbitraryValues.opioid) return game;

            game.disease.arbitraryValues.opioid -= 50;
            return game;
        },
    },
    {
        name: "Heparin",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Warfarin",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Thrombolytics",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Fibrinolytics",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Nitroglycerin",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Intravenous Crystalloid IV",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Loperamide",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Ondansetron",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Nafcillin",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Vancomycin",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Ibuprofen",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Acetaminophen",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Tetanus Prophylaxis",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
];

export const updateGameWithMedicine = (
    game: GameData,
    medicine: Medicine,
): GameData => {
    game = medicine.updateGame(game);
    game.elapsedTime += medicine.duration;

    return game;
};
