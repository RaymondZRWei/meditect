import type { GameData, Medicine } from "$lib/types";

export const medicines: Medicine[] = [
  {
    name: "Naloxone",
    description: "Blocks the effects of certain stimulants in the brain. Restores normal breathing to those affected.",
    duration: 5,
    updateGame: (game) => {
      if (!game.disease.arbitraryValues.opioid) return game;

      game.disease.arbitraryValues.opioid -= 50;
      return game;
    },
  },
  {
    name: "Rivaroxaban",
    description: "An anticoagulant that prevents blood clots from worsening.",
    duration: 5,
    updateGame: (game) => {
      if (!game.disease.arbitraryValues.heart && !game.disease.arbitraryValues.pulmonary) return game;

      if (!game.disease.arbitraryValues.heart) {
        game.disease.arbitraryValues.heart -= 50;
      }

      if (!game.disease.arbitraryValues.pulmonary) {
        game.disease.arbitraryValues.pulmonary -= 50;
      }
      return game;
    },
  },
  {
    name: "Inhaler (Puffer)",
    description: "A device that can help open airways for easier breathing.",
    duration: 5,
    updateGame: (game) => {
      if (!game.disease.arbitraryValues.asthma) return game;

      game.disease.arbitraryValues.asthma -= 50;
      return game;
    },
  },
  {
    name: "Thrombolytics",
    description: "An antithrombotic that dissolves existing blood clots.",
    duration: 5,
    updateGame: (game) => {
      if (!game.disease.arbitraryValues.heart && !game.disease.arbitraryValues.pulmonary) return game;

      if (!game.disease.arbitraryValues.heart) {
        game.disease.arbitraryValues.heart -= 50;
      }

      if (!game.disease.arbitraryValues.pulmonary) {
        game.disease.arbitraryValues.pulmonary -= 50;
      }
      return game;
    },
  },
  {
    name: "Intravenous Crystalloid IV",
    description: "A type of IV fluid that can replace blood.",
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
    description: "Controls the movements of the intestines to relive acute diarrhea.",
    duration: 5,
    updateGame: (game) => {
      if (!game.disease.arbitraryValues.food) return game;
      game.disease.arbitraryValues.food -= 50;
      return game;
    },
  },
  {
    name: "Nafcillin",
    description: "An antibiotic injection that can kill most bacteria.",
    duration: 5,
    updateGame: (game) => {
      if (!game.disease.arbitraryValues.staph) return game;
      game.disease.arbitraryValues.staph -= 50;

      return game;
    },
  },
  {
    name: "Potassium Permanganate",
    description: "A chemical that helps with disinfecting wounds.",
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
