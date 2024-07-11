import type { GameData, Medicine } from "$lib/types";

export const medicines: Medicine[] = [
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
            if (!game.disease.arbitraryValues.opioid) {
                game.heartRate.value *= 1.25;
            }

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
