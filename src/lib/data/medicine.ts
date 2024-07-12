import type { GameData, Medicine } from "$lib/types";

export const medicines: Medicine[] = [
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
    name: "Rivaroxaban",
    description: "",
    duration: 5,
    updateGame: (game) => {
      if (!game.disease.arbitraryValues.pulmonary) return game;

      game.disease.arbitraryValues.pulmonary -= 50;
      return game;
    },
  },
  {
    name: "Inhaler (Puffer)",
    description: "",
    duration: 5,
    updateGame: (game) => {
      if (!game.disease.arbitraryValues.asthma) return game;

      game.disease.arbitraryValues.asthma -= 50;
      return game;
    },
  },
  {
    name: "Thrombolytics",
    description: "",
    duration: 5,
    updateGame: (game) => {
      if (!game.disease.arbitraryValues.heart) return game;
      game.disease.arbitraryValues.heart -= 50;

      return game;
    },
  },
  {
    name: "Intravenous Crystalloid IV",
    description: "",
    duration: 5,
    updateGame: (game) => {
      if (!game.disease.arbitraryValues.acute && !game.disease.arbitraryValues.sepsis) return game;
      if (game.disease.arbitraryValues.acute) {
        game.disease.arbitraryValues.acute -= 50;
      }
      if (game.disease.arbitraryValues.acute) {
        game.disease.arbitraryValues.sepsis -= 50;
      }
      return game;
    },
  },
  {
    name: "Loperamide",
    description: "",
    duration: 5,
    updateGame: (game) => {
      if (!game.disease.arbitraryValues.food) return game;
      game.disease.arbitraryValues.food -= 50;
      return game;
    },
  },
  {
    name: "Nafcillin",
    description: "",
    duration: 5,
    updateGame: (game) => {
      if (!game.disease.arbitraryValues.staph) return game;
      game.disease.arbitraryValues.staph -= 50;

      return game;
    },
  },
  {
    name: "Ibuprofen",
    description: "",
    duration: 5,
    updateGame: (game) => {
      if (!game.disease.arbitraryValues.laceration) return game;
      game.disease.arbitraryValues.laceration -= 50;

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
