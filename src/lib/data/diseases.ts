import type { Disease, GameData, StoredDisease } from "../types";

const isFirstTimeAboveElapsedTime = (
    game: GameData,
    prevGame: GameData,
    time: number,
) => {
    console.log(game.elapsedTime, prevGame.elapsedTime, time);
    return prevGame.elapsedTime < time && game.elapsedTime >= time;
};

const addQualitativeSymptom = (game: GameData, message: string) => {
    if (!game.qualitativeSymptoms.includes(message)) {
        game.qualitativeSymptoms.push(message);
    }

    return game;
};

const moveSymptomTowardsValue = (
    symptomValue: number,
    timeSinceLastUpdate: number,
    value: number,
): number => {
    const difference = symptomValue - value;
    const differenceIncrement = difference / 15;

    if (difference > 0) {
        symptomValue = Math.max(
            symptomValue - timeSinceLastUpdate * differenceIncrement,
            value,
        );
    } else {
        symptomValue = Math.min(
            symptomValue + timeSinceLastUpdate * differenceIncrement,
            value,
        );
    }

    return symptomValue;
};

const storedDiseaseToDisease = (storedDisease: StoredDisease): Disease => {
    // Return everything in storedDisease except for updateSymptoms and getDefaultGameData
    const { updateSymptoms, getDefaultGameData, ...disease } = storedDisease;

    return disease;
};

export const diseases: StoredDisease[] = [
    {
        name: "Opioid Overdose",
        arbitraryValues: {
            opioid: 100,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
                elapsedTime: 0,
                heartRate: {
                    value: Math.round(100 + Math.random() * 20),
                    prevValues: [],
                },
                bloodPressureSystolic: {
                    value: Math.round(140 - Math.random() * 5),
                    prevValues: [],
                },
                bloodPressureDiastolic: { value: 130, prevValues: [] },
                bloodGlucose: 120,
                oxygenSaturation: 92,
                respiratoryRate: 17,
                qualitativeSymptoms: [
                    "The patient is drowsy and not very responsive.",
                ],
                doctorHints: [],
                doctorIntervention: null,
                testResults: [],
                finished: false,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const opioidLevel = game.disease.arbitraryValues.opioid;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            if (opioidLevel > 60) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    85,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    7,
                );
            } else if (opioidLevel > 30) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    45,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    90,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    10,
                );
            } else if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    60,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    95,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    15,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (
                (opioidLevel > 60 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 30)) ||
                (opioidLevel > 0 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 60))
            ) {
                game.doctorIntervention =
                    "You did not treat the patient in time, they are in critical condition. The head doctor intervened and administered a dose of naloxone.";
                game.finished = true;

                return game;
            }

            // TODO: move these to use arbitrary value
            if (game.respiratoryRate < 10) {
                game = addQualitativeSymptom(
                    game,
                    "The patient has shallow breathing.",
                );
            }

            if (game.oxygenSaturation < 90) {
                game = addQualitativeSymptom(
                    game,
                    "The patient's lip appears to be turning blue.",
                );
            }

            // Hint check
            if (
                game.respiratoryRate < 10 &&
                isFirstTimeAboveElapsedTime(game, prevGame, 20)
            ) {
                game.doctorHints.push(
                    "A depressant must be causing the patient's respiratory rate to be low.",
                );
            } else if (
                game.oxygenSaturation &&
                isFirstTimeAboveElapsedTime(game, prevGame, 35)
            ) {
                game.doctorHints.push(
                    "Try checking the patient's respiratory rate or oxygen saturation.",
                );
            }

            return game;
        },
    },
    //SECOND
    {
        name: "Pulmonary Embolism",
        arbitraryValues: {
            pulmonary: 100,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
                elapsedTime: 0,
                heartRate: { value: 80, prevValues: [] },
                bloodPressureSystolic: { value: 130, prevValues: [] },
                bloodPressureDiastolic: { value: 130, prevValues: [] },
                bloodGlucose: 120,
                oxygenSaturation: 92,
                respiratoryRate: 17,
                qualitativeSymptoms: [
                    "The patient is drowsy and not very responsive.",
                ],
                doctorHints: [],
                doctorIntervention: null,
                testResults: [],
                finished: false,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const opioidLevel = game.disease.arbitraryValues.opioid;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            if (opioidLevel > 60) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    85,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    7,
                );
            } else if (opioidLevel > 30) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    45,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    90,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    10,
                );
            } else if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    60,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    95,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    15,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (
                (opioidLevel > 60 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 30)) ||
                (opioidLevel > 0 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 60))
            ) {
                game.doctorIntervention =
                    "You did not treat the patient in time, they are in critical condition. The head doctor intervened and administered a dose of naloxone.";
                game.finished = true;

                return game;
            }

            // TODO: move these to use arbitrary value
            if (game.respiratoryRate < 10) {
                game = addQualitativeSymptom(
                    game,
                    "The patient has shallow breathing.",
                );
            }

            if (game.oxygenSaturation < 90) {
                game = addQualitativeSymptom(
                    game,
                    "The patient's lip appears to be turning blue.",
                );
            }

            // Hint check
            if (
                game.respiratoryRate < 10 &&
                isFirstTimeAboveElapsedTime(game, prevGame, 20)
            ) {
                game.doctorHints.push(
                    "A depressant must be causing the patient's respiratory rate to be low.",
                );
            } else if (
                game.oxygenSaturation &&
                isFirstTimeAboveElapsedTime(game, prevGame, 35)
            ) {
                game.doctorHints.push(
                    "Try checking the patient's respiratory rate or oxygen saturation.",
                );
            }

            return game;
        },
    },
    //THIRD
    {
        name: "Opioid Overdose",
        arbitraryValues: {
            opioid: 100,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
                elapsedTime: 0,
                heartRate: { value: 55, prevValues: [] },
                bloodPressure: { value: 100, prevValues: [] },
                bloodGlucose: 120,
                oxygenSaturation: 92,
                respiratoryRate: 17,
                qualitativeSymptoms: [
                    "The patient is drowsy and not very responsive.",
                ],
                doctorHints: [],
                doctorIntervention: null,
                testResults: [],
                finished: false,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const opioidLevel = game.disease.arbitraryValues.opioid;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            if (opioidLevel > 60) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    85,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    7,
                );
            } else if (opioidLevel > 30) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    45,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    90,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    10,
                );
            } else if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    60,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    95,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    15,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (
                (opioidLevel > 60 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 30)) ||
                (opioidLevel > 0 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 60))
            ) {
                game.doctorIntervention =
                    "You did not treat the patient in time, they are in critical condition. The head doctor intervened and administered a dose of naloxone.";
                game.finished = true;

                return game;
            }

            // TODO: move these to use arbitrary value
            if (game.respiratoryRate < 10) {
                game = addQualitativeSymptom(
                    game,
                    "The patient has shallow breathing.",
                );
            }

            if (game.oxygenSaturation < 90) {
                game = addQualitativeSymptom(
                    game,
                    "The patient's lip appears to be turning blue.",
                );
            }

            // Hint check
            if (
                game.respiratoryRate < 10 &&
                isFirstTimeAboveElapsedTime(game, prevGame, 20)
            ) {
                game.doctorHints.push(
                    "A depressant must be causing the patient's respiratory rate to be low.",
                );
            } else if (
                game.oxygenSaturation &&
                isFirstTimeAboveElapsedTime(game, prevGame, 35)
            ) {
                game.doctorHints.push(
                    "Try checking the patient's respiratory rate or oxygen saturation.",
                );
            }

            return game;
        },
    },
    //FOURTH
    {
        name: "Opioid Overdose",
        arbitraryValues: {
            opioid: 100,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
                elapsedTime: 0,
                heartRate: { value: 55, prevValues: [] },
                bloodPressure: { value: 100, prevValues: [] },
                bloodGlucose: 120,
                oxygenSaturation: 92,
                respiratoryRate: 17,
                qualitativeSymptoms: [
                    "The patient is drowsy and not very responsive.",
                ],
                doctorHints: [],
                doctorIntervention: null,
                testResults: [],
                finished: false,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const opioidLevel = game.disease.arbitraryValues.opioid;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            if (opioidLevel > 60) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    85,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    7,
                );
            } else if (opioidLevel > 30) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    45,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    90,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    10,
                );
            } else if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    60,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    95,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    15,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (
                (opioidLevel > 60 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 30)) ||
                (opioidLevel > 0 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 60))
            ) {
                game.doctorIntervention =
                    "You did not treat the patient in time, they are in critical condition. The head doctor intervened and administered a dose of naloxone.";
                game.finished = true;

                return game;
            }

            // TODO: move these to use arbitrary value
            if (game.respiratoryRate < 10) {
                game = addQualitativeSymptom(
                    game,
                    "The patient has shallow breathing.",
                );
            }

            if (game.oxygenSaturation < 90) {
                game = addQualitativeSymptom(
                    game,
                    "The patient's lip appears to be turning blue.",
                );
            }

            // Hint check
            if (
                game.respiratoryRate < 10 &&
                isFirstTimeAboveElapsedTime(game, prevGame, 20)
            ) {
                game.doctorHints.push(
                    "A depressant must be causing the patient's respiratory rate to be low.",
                );
            } else if (
                game.oxygenSaturation &&
                isFirstTimeAboveElapsedTime(game, prevGame, 35)
            ) {
                game.doctorHints.push(
                    "Try checking the patient's respiratory rate or oxygen saturation.",
                );
            }

            return game;
        },
    },
    //FIFTH
    {
        name: "Opioid Overdose",
        arbitraryValues: {
            opioid: 100,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
                elapsedTime: 0,
                heartRate: { value: 55, prevValues: [] },
                bloodPressure: { value: 100, prevValues: [] },
                bloodGlucose: 120,
                oxygenSaturation: 92,
                respiratoryRate: 17,
                qualitativeSymptoms: [
                    "The patient is drowsy and not very responsive.",
                ],
                doctorHints: [],
                doctorIntervention: null,
                testResults: [],
                finished: false,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const opioidLevel = game.disease.arbitraryValues.opioid;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            if (opioidLevel > 60) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    85,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    7,
                );
            } else if (opioidLevel > 30) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    45,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    90,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    10,
                );
            } else if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    60,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    95,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    15,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (
                (opioidLevel > 60 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 30)) ||
                (opioidLevel > 0 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 60))
            ) {
                game.doctorIntervention =
                    "You did not treat the patient in time, they are in critical condition. The head doctor intervened and administered a dose of naloxone.";
                game.finished = true;

                return game;
            }

            // TODO: move these to use arbitrary value
            if (game.respiratoryRate < 10) {
                game = addQualitativeSymptom(
                    game,
                    "The patient has shallow breathing.",
                );
            }

            if (game.oxygenSaturation < 90) {
                game = addQualitativeSymptom(
                    game,
                    "The patient's lip appears to be turning blue.",
                );
            }

            // Hint check
            if (
                game.respiratoryRate < 10 &&
                isFirstTimeAboveElapsedTime(game, prevGame, 20)
            ) {
                game.doctorHints.push(
                    "A depressant must be causing the patient's respiratory rate to be low.",
                );
            } else if (
                game.oxygenSaturation &&
                isFirstTimeAboveElapsedTime(game, prevGame, 35)
            ) {
                game.doctorHints.push(
                    "Try checking the patient's respiratory rate or oxygen saturation.",
                );
            }

            return game;
        },
    },
    //SIXTH
    {
        name: "Opioid Overdose",
        arbitraryValues: {
            opioid: 100,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
                elapsedTime: 0,
                heartRate: { value: 55, prevValues: [] },
                bloodPressureSystolic: { value: 130, prevValues: [] },
                bloodPressureDiastolic: { value: 130, prevValues: [] },
                bloodGlucose: 120,
                oxygenSaturation: 92,
                respiratoryRate: 17,
                qualitativeSymptoms: [
                    "The patient is drowsy and not very responsive.",
                ],
                doctorHints: [],
                doctorIntervention: null,
                testResults: [],
                finished: false,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const opioidLevel = game.disease.arbitraryValues.opioid;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            if (opioidLevel > 60) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    85,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    7,
                );
            } else if (opioidLevel > 30) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    45,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    90,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    10,
                );
            } else if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    60,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    95,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    15,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (
                (opioidLevel > 60 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 30)) ||
                (opioidLevel > 0 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 60))
            ) {
                game.doctorIntervention =
                    "You did not treat the patient in time, they are in critical condition. The head doctor intervened and administered a dose of naloxone.";
                game.finished = true;

                return game;
            }

            // TODO: move these to use arbitrary value
            if (game.respiratoryRate < 10) {
                game = addQualitativeSymptom(
                    game,
                    "The patient has shallow breathing.",
                );
            }

            if (game.oxygenSaturation < 90) {
                game = addQualitativeSymptom(
                    game,
                    "The patient's lip appears to be turning blue.",
                );
            }

            // Hint check
            if (
                game.respiratoryRate < 10 &&
                isFirstTimeAboveElapsedTime(game, prevGame, 20)
            ) {
                game.doctorHints.push(
                    "A depressant must be causing the patient's respiratory rate to be low.",
                );
            } else if (
                game.oxygenSaturation &&
                isFirstTimeAboveElapsedTime(game, prevGame, 35)
            ) {
                game.doctorHints.push(
                    "Try checking the patient's respiratory rate or oxygen saturation.",
                );
            }

            return game;
        },
    },
    //SEVENTH
    {
        name: "Opioid Overdose",
        arbitraryValues: {
            opioid: 100,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
                elapsedTime: 0,
                heartRate: { value: 55, prevValues: [] },
                bloodPressureSystolic: { value: 130, prevValues: [] },
                bloodPressureDiastolic: { value: 130, prevValues: [] },
                bloodGlucose: 120,
                oxygenSaturation: 92,
                respiratoryRate: 17,
                qualitativeSymptoms: [
                    "The patient is drowsy and not very responsive.",
                ],
                doctorHints: [],
                doctorIntervention: null,
                testResults: [],
                finished: false,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const opioidLevel = game.disease.arbitraryValues.opioid;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            if (opioidLevel > 60) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    85,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    7,
                );
            } else if (opioidLevel > 30) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    45,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    90,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    10,
                );
            } else if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    60,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    95,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    15,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (
                (opioidLevel > 60 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 30)) ||
                (opioidLevel > 0 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 60))
            ) {
                game.doctorIntervention =
                    "You did not treat the patient in time, they are in critical condition. The head doctor intervened and administered a dose of naloxone.";
                game.finished = true;

                return game;
            }

            // TODO: move these to use arbitrary value
            if (game.respiratoryRate < 10) {
                game = addQualitativeSymptom(
                    game,
                    "The patient has shallow breathing.",
                );
            }

            if (game.oxygenSaturation < 90) {
                game = addQualitativeSymptom(
                    game,
                    "The patient's lip appears to be turning blue.",
                );
            }

            // Hint check
            if (
                game.respiratoryRate < 10 &&
                isFirstTimeAboveElapsedTime(game, prevGame, 20)
            ) {
                game.doctorHints.push(
                    "A depressant must be causing the patient's respiratory rate to be low.",
                );
            } else if (
                game.oxygenSaturation &&
                isFirstTimeAboveElapsedTime(game, prevGame, 35)
            ) {
                game.doctorHints.push(
                    "Try checking the patient's respiratory rate or oxygen saturation.",
                );
            }

            return game;
        },
    },
    //EIGHTH
    {
        name: "Opioid Overdose",
        arbitraryValues: {
            opioid: 100,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
                elapsedTime: 0,
                heartRate: { value: 55, prevValues: [] },
                bloodPressureSystolic: { value: 130, prevValues: [] },
                bloodPressureDiastolic: { value: 130, prevValues: [] },
                bloodGlucose: 120,
                oxygenSaturation: 92,
                respiratoryRate: 17,
                qualitativeSymptoms: [
                    "The patient is drowsy and not very responsive.",
                ],
                doctorHints: [],
                doctorIntervention: null,
                testResults: [],
                finished: false,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const opioidLevel = game.disease.arbitraryValues.opioid;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            if (opioidLevel > 60) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    85,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    7,
                );
            } else if (opioidLevel > 30) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    45,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    90,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    10,
                );
            } else if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    60,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    95,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    15,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (
                (opioidLevel > 60 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 30)) ||
                (opioidLevel > 0 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 60))
            ) {
                game.doctorIntervention =
                    "You did not treat the patient in time, they are in critical condition. The head doctor intervened and administered a dose of naloxone.";
                game.finished = true;

                return game;
            }

            // TODO: move these to use arbitrary value
            if (game.respiratoryRate < 10) {
                game = addQualitativeSymptom(
                    game,
                    "The patient has shallow breathing.",
                );
            }

            if (game.oxygenSaturation < 90) {
                game = addQualitativeSymptom(
                    game,
                    "The patient's lip appears to be turning blue.",
                );
            }

            // Hint check
            if (
                game.respiratoryRate < 10 &&
                isFirstTimeAboveElapsedTime(game, prevGame, 20)
            ) {
                game.doctorHints.push(
                    "A depressant must be causing the patient's respiratory rate to be low.",
                );
            } else if (
                game.oxygenSaturation &&
                isFirstTimeAboveElapsedTime(game, prevGame, 35)
            ) {
                game.doctorHints.push(
                    "Try checking the patient's respiratory rate or oxygen saturation.",
                );
            }

            return game;
        },
    },
    //NINTH
    {
        name: "Opioid Overdose",
        arbitraryValues: {
            opioid: 100,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
                elapsedTime: 0,
                heartRate: { value: 55, prevValues: [] },
                bloodPressureSystolic: { value: 130, prevValues: [] },
                bloodPressureDiastolic: { value: 130, prevValues: [] },
                bloodGlucose: 120,
                oxygenSaturation: 92,
                respiratoryRate: 17,
                qualitativeSymptoms: [
                    "The patient is drowsy and not very responsive.",
                ],
                doctorHints: [],
                doctorIntervention: null,
                testResults: [],
                finished: false,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const opioidLevel = game.disease.arbitraryValues.opioid;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            if (opioidLevel > 60) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    85,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    7,
                );
            } else if (opioidLevel > 30) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    45,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    90,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    10,
                );
            } else if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    60,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    95,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    15,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (
                (opioidLevel > 60 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 30)) ||
                (opioidLevel > 0 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 60))
            ) {
                game.doctorIntervention =
                    "You did not treat the patient in time, they are in critical condition. The head doctor intervened and administered a dose of naloxone.";
                game.finished = true;

                return game;
            }

            // TODO: move these to use arbitrary value
            if (game.respiratoryRate < 10) {
                game = addQualitativeSymptom(
                    game,
                    "The patient has shallow breathing.",
                );
            }

            if (game.oxygenSaturation < 90) {
                game = addQualitativeSymptom(
                    game,
                    "The patient's lip appears to be turning blue.",
                );
            }

            // Hint check
            if (
                game.respiratoryRate < 10 &&
                isFirstTimeAboveElapsedTime(game, prevGame, 20)
            ) {
                game.doctorHints.push(
                    "A depressant must be causing the patient's respiratory rate to be low.",
                );
            } else if (
                game.oxygenSaturation &&
                isFirstTimeAboveElapsedTime(game, prevGame, 35)
            ) {
                game.doctorHints.push(
                    "Try checking the patient's respiratory rate or oxygen saturation.",
                );
            }

            return game;
        },
    },
    //TENTH
    {
        name: "Laceration",
        arbitraryValues: {
            opioid: 100,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
                elapsedTime: 0,
                heartRate: { value: 80, prevValues: [] },
                bloodPressureSystolic: { value: 130, prevValues: [] },
                bloodPressureDiastolic: { value: 130, prevValues: [] },
                bloodGlucose: 120,
                oxygenSaturation: 92,
                respiratoryRate: 17,
                qualitativeSymptoms: [
                    "There is a large wound on the patient's arm",
                ],
                doctorHints: [],
                doctorIntervention: null,
                testResults: [],
                finished: false,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const opioidLevel = game.disease.arbitraryValues.opioid;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            if (opioidLevel > 60) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    85,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    7,
                );
            } else if (opioidLevel > 30) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    45,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    90,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    10,
                );
            } else if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    60,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    95,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    15,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (
                (opioidLevel > 60 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 30)) ||
                (opioidLevel > 0 &&
                    isFirstTimeAboveElapsedTime(game, prevGame, 60))
            ) {
                game.doctorIntervention =
                    "You did not treat the patient in time, they are in critical condition. The head doctor intervened and administered a dose of naloxone.";
                game.finished = true;

                return game;
            }

            // TODO: move these to use arbitrary value
            if (game.respiratoryRate < 10) {
                game = addQualitativeSymptom(
                    game,
                    "The patient has shallow breathing.",
                );
            }

            if (game.oxygenSaturation < 90) {
                game = addQualitativeSymptom(
                    game,
                    "The patient's lip appears to be turning blue.",
                );
            }

            // Hint check
            if (
                game.respiratoryRate < 10 &&
                isFirstTimeAboveElapsedTime(game, prevGame, 20)
            ) {
                game.doctorHints.push(
                    "A depressant must be causing the patient's respiratory rate to be low.",
                );
            } else if (
                game.oxygenSaturation &&
                isFirstTimeAboveElapsedTime(game, prevGame, 35)
            ) {
                game.doctorHints.push(
                    "Try checking the patient's respiratory rate or oxygen saturation.",
                );
            }

            return game;
        },
    },
];
