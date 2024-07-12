import type { GameData, Medicine } from "$lib/types";

export const medicines: Medicine[] = [
    {
        name: "Antibiotics",
        description: "",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Naloxone",
        description: "",
        duration: 5,
        updateGame: (game) => {
            if (!game.disease.arbitraryValues.opioid) return game;

            game.disease.arbitraryValues.opioid -= 50;
            return game;
        },
    },
    {
        name: "Morphine",
        description: "",
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
        description: "",
        duration: 5,
        updateGame: (game) => {
            if (!game.disease.arbitraryValues.opioid) return game;

            game.disease.arbitraryValues.opioid -= 50;
            return game;
        },
    },
    {
        name: "Heparin",
        description: "",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Warfarin",
        description: "",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Thrombolytics",
        description: "",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Fibrinolytics",
        description: "",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Nitroglycerin",
        description: "",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Intravenous Crystalloid IV",
        description: "",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Loperamide",
        description: "",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Ondansetron",
        description: "",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Nafcillin",
        description: "",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Vancomycin",
        description: "",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Ibuprofen",
        description: "",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Acetaminophen",
        description: "",
        duration: 5,
        updateGame: (game) => {
            game.disease.arbitraryValues.opioid += 50;

            return game;
        },
    },
    {
        name: "Tetanus Prophylaxis",
        description: "",
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
