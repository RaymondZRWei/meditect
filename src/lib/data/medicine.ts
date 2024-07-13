import type { GameData, Medicine } from "$lib/types";

export const medicines: Medicine[] = [
  {
    name: "Naloxone",
    description: "Blocks the effects of certain stimulants in the brain.",
    duration: 10,
    updateGame: (game) => {
      if (!game.disease.arbitraryValues.opioid) return game;

      game.disease.arbitraryValues.opioid -= 100;
      return game;
    },
  },
  {
    name: "Rivaroxaban",
    description:
      "An anticoagulant that prevents blood clots from worsening.",
    duration: 10,
    updateGame: (game) => {
      if (
        !game.disease.arbitraryValues.heart &&
        !game.disease.arbitraryValues.pulmonary && !game.disease.arbitraryValues.stroke
      ) {
        return game;
      }

      if (!game.disease.arbitraryValues.stroke) {
        game.disease.arbitraryValues.stroke -= 100;
      }

      if (!game.disease.arbitraryValues.heart) {
        game.disease.arbitraryValues.heart -= 100;
      }

      if (!game.disease.arbitraryValues.pulmonary) {
        game.disease.arbitraryValues.pulmonary -= 100;
      }
      return game;
    },
  },
  {
    name: "Inhaler (Puffer)",
    description:
      "A device that can help open airways for easier breathing.",
    duration: 10,
    updateGame: (game) => {
      if (!game.disease.arbitraryValues.asthma) return game;

      game.disease.arbitraryValues.asthma -= 100;
      return game;
    },
  },
  {
    name: "Thrombolytics",
    description: "An antithrombotic that dissolves existing blood clots.",
    duration: 10,
    updateGame: (game) => {
      if (
        !game.disease.arbitraryValues.heart &&
        !game.disease.arbitraryValues.pulmonary && !game.disease.arbitraryValues.stroke
      ) {
        return game;
      }

      if (game.disease.arbitraryValues.stroke) {
        game.disease.arbitraryValues.stroke -= 100;
      }

      if (game.disease.arbitraryValues.heart) {
        game.disease.arbitraryValues.heart -= 100;
      }

      if (game.disease.arbitraryValues.pulmonary) {
        game.disease.arbitraryValues.pulmonary -= 100;
      }
      return game;
    },
  },
  {
    name: "Intravenous Crystalloid IV",
    description: "A type of IV fluid that can replace blood.",
    duration: 10,
    updateGame: (game) => {
      if (
        !game.disease.arbitraryValues.acute &&
        !game.disease.arbitraryValues.sepsis
      )
        return game;
      if (game.disease.arbitraryValues.acute) {
        game.disease.arbitraryValues.acute -= 100;
      }
      if (game.disease.arbitraryValues.sepsis) {
        game.disease.arbitraryValues.sepsis -= 100;
      }
      return game;
    },
  },
  {
    name: "Loperamide",
    description:
      "Controls the movements of the intestines to relive acute diarrhea.",
    duration: 10,
    updateGame: (game) => {
      if (!game.disease.arbitraryValues.food) return game;

      game.disease.arbitraryValues.food -= 100;
      return game;
    },
  },
  {
    name: "Nafcillin",
    description: "An antibiotic injection that can kill most bacteria.",
    duration: 10,
    updateGame: (game) => {
      if (!game.disease.arbitraryValues.staph) return game;
      game.disease.arbitraryValues.staph -= 100;

      return game;
    },
  },
  {
    name: "Potassium Permanganate",
    description: "A chemical that helps with disinfecting wounds.",
    duration: 10,
    updateGame: (game) => {
      if (!game.disease.arbitraryValues.laceration) return game;
      game.disease.arbitraryValues.laceration -= 100;

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
