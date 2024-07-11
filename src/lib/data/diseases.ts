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
                    value: Math.round(50 + Math.random() * 10),
                    prevValues: [],
                },
                bloodPressureSystolic: {
                    value: Math.round(100 + Math.random() * 10 - 7),
                    prevValues: [],
                },
                bloodPressureDiastolic: {
                    value: Math.round(60 + Math.random() * 6 - 4),
                    prevValues: [],
                },
                bloodGlucose: 70 + Math.round(Math.random() * 30),
                oxygenSaturation: 95 - Math.round(Math.random() * 10),
                respiratoryRate: 12 + Math.round(Math.random() * 3) - 2,
                pain: 20 + Math.round(Math.random() * 10) / 2 - 1,
                qualitativeSymptoms: [
                    "The patient is drowsy, pale, and has a decreased level of responsiveness.",
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

            // if (opioidLevel > 60) {
            //     game.heartRate.value = moveSymptomTowardsValue(
            //         game.heartRate.value,
            //         timeSinceLastUpdate,
            //         35,
            //     );
            //     game.oxygenSaturation = moveSymptomTowardsValue(
            //         game.oxygenSaturation,
            //         timeSinceLastUpdate,
            //         75,
            //     );
            //     game.respiratoryRate = moveSymptomTowardsValue(
            //         game.respiratoryRate,
            //         timeSinceLastUpdate,
            //         2,
            //     );
            // } else if (opioidLevel > 30) {
            //     game.heartRate.value = moveSymptomTowardsValue(
            //         game.heartRate.value,
            //         timeSinceLastUpdate,
            //         45,
            //     );
            //     game.oxygenSaturation = moveSymptomTowardsValue(
            //         game.oxygenSaturation,
            //         timeSinceLastUpdate,
            //         90,
            //     );
            //     game.respiratoryRate = moveSymptomTowardsValue(
            //         game.respiratoryRate,
            //         timeSinceLastUpdate,
            //         10,
            //     );
            // } else if (opioidLevel > 0) {
            //     game.heartRate.value = moveSymptomTowardsValue(
            //         game.heartRate.value,
            //         timeSinceLastUpdate,
            //         60,
            //     );
            //     game.oxygenSaturation = moveSymptomTowardsValue(
            //         game.oxygenSaturation,
            //         timeSinceLastUpdate,
            //         95,
            //     );
            //     game.respiratoryRate = moveSymptomTowardsValue(
            //         game.respiratoryRate,
            //         timeSinceLastUpdate,
            //         15,
            //     );

            if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    75,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    2,
                );
                game.pain = moveSymptomTowardsValue(
                    game.pain,
                    timeSinceLastUpdate,
                    20,
                );
                game.bloodPressureSystolic.value = moveSymptomTowardsValue(
                    game.bloodPressureSystolic.value,
                    timeSinceLastUpdate,
                    70,
                );
                game.bloodPressureDiastolic.value = moveSymptomTowardsValue(
                    game.bloodPressureDiastolic.value,
                    timeSinceLastUpdate,
                    35,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 27)) {
                game.doctorIntervention =
                    "The patient becomes unresponsive. The head doctor intervenes and administers a dose of naloxone.";
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
                heartRate: {
                    value: Math.round(100 + Math.random() * 20),
                    prevValues: [],
                },
                bloodPressureSystolic: {
                    value: Math.round(140 - Math.random() * 5),
                    prevValues: [],
                },
                bloodPressureDiastolic: {
                    value: Math.round(90 - Math.random() * 4),
                    prevValues: [],
                },
                bloodGlucose: 70 + Math.round(Math.random() * 30),
                oxygenSaturation: 90 - Math.round(Math.random() * 10),
                respiratoryRate: 22 + Math.round(Math.random() * 3) - 2,
                pain: 60 + Math.round(Math.random() * 20) / 2,
                qualitativeSymptoms: [
                    "The patient suffers from intense chest pain and has difficulty breathing",
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

            if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    75,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    2,
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
        name: "Asthma Attack",
        arbitraryValues: {
            asthma: 100,
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
                bloodPressureDiastolic: {
                    value: Math.round(90 - Math.random() * 4),
                    prevValues: [],
                },
                bloodGlucose: 70 + Math.round(Math.random() * 30),
                oxygenSaturation: 92 - Math.round(Math.random() * 10),
                respiratoryRate: 20 + Math.round(Math.random() * 3) - 2,
                pain: 5 + Math.round(Math.random() * 2) / 2 - 1,
                qualitativeSymptoms: [
                    "The patient is wheezing and feels a tightness in their chest",
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

            if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    75,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    2,
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
        name: "Heart Attack",
        arbitraryValues: {
            heart: 100,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
                elapsedTime: 0,
                heartRate: {
                    value: Math.round(110 + Math.random() * 20),
                    prevValues: [],
                },
                bloodPressureSystolic: {
                    value: Math.round(160 - Math.random() * 4),
                    prevValues: [],
                },
                bloodPressureDiastolic: {
                    value: Math.round(95 - Math.random() * 3),
                    prevValues: [],
                },
                bloodGlucose: 70 + Math.round(Math.random() * 30),
                oxygenSaturation: 90 - Math.round(Math.random() * 10),
                respiratoryRate: 24 + Math.round(Math.random() * 4) - 2,
                pain: 8 + Math.round(Math.random() * 2) / 2 - 1,
                qualitativeSymptoms: [
                    "The patient is in agony. They are struggling to breath, confused and feel a tightness in their chest",
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

            if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    75,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    2,
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
        name: "Stroke",
        arbitraryValues: {
            stroke: 100,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
                elapsedTime: 0,
                heartRate: {
                    value: Math.round(90 + Math.random() * 20),
                    prevValues: [],
                },
                bloodPressureSystolic: {
                    value: Math.round(170 - Math.random() * 5),
                    prevValues: [],
                },
                bloodPressureDiastolic: {
                    value: Math.round(90 - Math.random() * 4),
                    prevValues: [],
                },
                bloodGlucose: 70 + Math.round(Math.random() * 30),
                oxygenSaturation: 85 - Math.round(Math.random() * 10),
                respiratoryRate: 25 + Math.round(Math.random() * 3) - 2,
                pain: 4 + Math.round(Math.random() * 1) / 2,
                qualitativeSymptoms: [
                    "The patient feels numb and their speech is impeded",
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

            if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    75,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    2,
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
        name: "Sepsis",
        arbitraryValues: {
            sepsis: 100,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
                elapsedTime: 0,
                heartRate: {
                    value: Math.round(90 + Math.random() * 20),
                    prevValues: [],
                },
                bloodPressureSystolic: {
                    value: Math.round(110 - Math.random() * 4),
                    prevValues: [],
                },
                bloodPressureDiastolic: {
                    value: Math.round(70 - Math.random() * 4),
                    prevValues: [],
                },
                bloodGlucose: 70 + Math.round(Math.random() * 30),
                oxygenSaturation: 92 - Math.round(Math.random() * 4),
                respiratoryRate: 20 + Math.round(Math.random() * 5) - 2,
                pain: 4 + Math.round(Math.random() * 2) / 2 - 1,
                qualitativeSymptoms: [
                    "The patient seems to be confused and they are very uncomfortable",
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

            if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    75,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    2,
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
        name: "Food Poisoning",
        arbitraryValues: {
            food: 100,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
                elapsedTime: 0,
                heartRate: {
                    value: Math.round(100 + Math.random() * 10),
                    prevValues: [],
                },
                bloodPressureSystolic: {
                    value: Math.round(115 - Math.random() * 5),
                    prevValues: [],
                },
                bloodPressureDiastolic: {
                    value: Math.round(75 - Math.random() * 4),
                    prevValues: [],
                },
                bloodGlucose: 70 + Math.round(Math.random() * 30),
                oxygenSaturation: 97 - Math.round(Math.random() * 5),
                respiratoryRate: 17 + Math.round(Math.random() * 4) - 2,
                pain: 3 + Math.round(Math.random() * 2) / 2 - 1,
                qualitativeSymptoms: [
                    "The patient feels a sharp pain in their stomach and is sweating profusely",
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

            if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    75,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    2,
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
        name: "Acute Pancreatitis",
        arbitraryValues: {
            acute: 100,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
                elapsedTime: 0,
                heartRate: {
                    value: Math.round(95 + Math.random() * 10),
                    prevValues: [],
                },
                bloodPressureSystolic: {
                    value: Math.round(130 - Math.random() * 5),
                    prevValues: [],
                },
                bloodPressureDiastolic: {
                    value: Math.round(80 - Math.random() * 4),
                    prevValues: [],
                },
                bloodGlucose: 70 + Math.round(Math.random() * 30),
                oxygenSaturation: 94 - Math.round(Math.random() * 10),
                respiratoryRate: 22 + Math.round(Math.random() * 4) - 2,
                pain: 7 + Math.round(Math.random() * 2) / 2 - 1,
                qualitativeSymptoms: [
                    "The patient has difficulty breathing and feels an acute epigastric pain",
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

            if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    75,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    2,
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
        name: "Staph",
        arbitraryValues: {
            staph: 100,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
                elapsedTime: 0,
                heartRate: {
                    value: Math.round(80 + Math.random() * 10),
                    prevValues: [],
                },
                bloodPressureSystolic: {
                    value: Math.round(120 - Math.random() * 5),
                    prevValues: [],
                },
                bloodPressureDiastolic: {
                    value: Math.round(80 - Math.random() * 4),
                    prevValues: [],
                },
                bloodGlucose: 70 + Math.round(Math.random() * 30),
                oxygenSaturation: 97 - Math.round(Math.random() * 5),
                respiratoryRate: 15 + Math.round(Math.random() * 3) - 2,
                pain: 4 + Math.round(Math.random() * 2) / 2 - 1,
                qualitativeSymptoms: [
                    "There are swollen red bumps on the patient's skin",
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

            if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    75,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    2,
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
            laceration: 100,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
                elapsedTime: 0,
                heartRate: {
                    value: Math.round(80 + Math.random() * 20),
                    prevValues: [],
                },
                bloodPressureSystolic: {
                    value: Math.round(130 - Math.random() * 5),
                    prevValues: [],
                },
                bloodPressureDiastolic: {
                    value: Math.round(90 - Math.random() * 4),
                    prevValues: [],
                },
                bloodGlucose: 70 + Math.round(Math.random() * 30),
                oxygenSaturation: 95 - Math.round(Math.random() * 10),
                respiratoryRate: 15 + Math.round(Math.random() * 3) - 2,
                pain: 6 + Math.round(Math.random() * 2) / 2 - 1,
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

            if (opioidLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    35,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    75,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    2,
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
