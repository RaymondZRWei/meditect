import type { Disease, GameData, StoredDisease } from "../types";

const isFirstTimeAboveElapsedTime = (
    game: GameData,
    prevGame: GameData,
    time: number,
) => {
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
    const differenceIncrement = difference / 30;

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

const defaultGameData = {
    elapsedTime: 0,
    doctorHints: [],
    doctorIntervention: null,
    testResults: [],
    finished: false,
    notes: "",
    pageIndex: 0,
};

export const diseases: StoredDisease[] = [
    {
        name: "Opioid Overdose",
        arbitraryValues: {
            opioid: 100,
        },
        statHints: {
            respiratoryRate: -1,
            oxygenSaturation: -1,
            bloodGlucose: 0,
            pain: 1,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
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
                pain: 20 + Math.round(Math.random() * 10) / 2 - 10,
                qualitativeSymptoms: [
                    "The patient is drowsy, pale, and has a decreased level of responsiveness.",
                ],
                ...defaultGameData,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const opioidLevel = game.disease.arbitraryValues.opioid;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            // outdated didnt add glucose lvl
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
                    40,
                );
                game.bloodGlucose = moveSymptomTowardsValue(
                    game.bloodGlucose,
                    timeSinceLastUpdate,
                    90,
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
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game = addQualitativeSymptom(
                    game,
                    "The patient is losing mobility and appears confused.",
                );
            }

            if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game = addQualitativeSymptom(
                    game,
                    "A purple hue develop's on the patient's skin from cyanosis.",
                );
            }

            // Hint check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game.doctorHints.push(
                    "Hint: The patient was found near an empty pill bottle before hospitalized",
                );
            } else if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game.doctorHints.push(
                    "Hint: Patient has a history of prescription pain medication usage.",
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
        statHints: {
            respiratoryRate: -2,
            oxygenSaturation: -1,
            bloodGlucose: 0,
            pain: 2,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
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
                    "The patient suffers from intense chest pain and difficulty breathing.",
                ],
                ...defaultGameData,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const pulmonaryLevel = game.disease.arbitraryValues.pulmonary;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            if (pulmonaryLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    140,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    70,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    8,
                );
                game.bloodPressureSystolic.value = moveSymptomTowardsValue(
                    game.bloodPressureSystolic.value,
                    timeSinceLastUpdate,
                    160,
                );
                game.bloodPressureDiastolic.value = moveSymptomTowardsValue(
                    game.bloodPressureDiastolic.value,
                    timeSinceLastUpdate,
                    100,
                );
                game.pain = moveSymptomTowardsValue(
                    game.pain,
                    timeSinceLastUpdate,
                    95,
                );
                game.bloodGlucose = moveSymptomTowardsValue(
                    game.bloodGlucose,
                    timeSinceLastUpdate,
                    90,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 27)) {
                game.doctorIntervention =
                    "The patient suffers from excrutiating pain. The head doctor intervenes and administers a dose of rivaroxaban.";
                game.finished = true;

                return game;
            }

            // TODO: move these to use arbitrary value
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game = addQualitativeSymptom(
                    game,
                    "The patient is sweating heavily and their skin becomes pale.",
                );
            }

            if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game = addQualitativeSymptom(
                    game,
                    "The patient complains that chest pain worsens.",
                );
            }

            // Hint check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game.doctorHints.push(
                    "Hint: Reports show the patient recently returned from a long flight.",
                );
            } else if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game.doctorHints.push(
                    "Hint: The patient has a history of cardiac issuesof cardiac issues.",
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
        statHints: {
            respiratoryRate: 1,
            oxygenSaturation: -1,
            bloodGlucose: 1,
            pain: 1,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
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
                pain: 50 + Math.round(Math.random() * 20) / 2 - 10,
                qualitativeSymptoms: [
                    "The patient is wheezing and feels a tightness in their chest",
                ],
                ...defaultGameData,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const asthmaLevel = game.disease.arbitraryValues.asthma;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            if (asthmaLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    140,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    75,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    30,
                );
                game.bloodPressureSystolic.value = moveSymptomTowardsValue(
                    game.bloodPressureSystolic.value,
                    timeSinceLastUpdate,
                    180,
                );
                game.bloodPressureDiastolic.value = moveSymptomTowardsValue(
                    game.bloodPressureDiastolic.value,
                    timeSinceLastUpdate,
                    100,
                );
                game.pain = moveSymptomTowardsValue(
                    game.pain,
                    timeSinceLastUpdate,
                    70,
                );
                game.bloodGlucose = moveSymptomTowardsValue(
                    game.bloodGlucose,
                    timeSinceLastUpdate,
                    130,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 27)) {
                game.doctorIntervention =
                    "Patient becomes unresponsive from lack of oxygen. Head doctor reprimands you for not using an inhaler (puffer) earlier.";
                game.finished = true;

                return game;
            }

            // TODO: move these to use arbitrary value
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game = addQualitativeSymptom(
                    game,
                    "More wheezing noises comes from the patient.",
                );
            }

            if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game = addQualitativeSymptom(
                    game,
                    "You hear severe gasping as the patient is losing consciousnesss.",
                );
            }

            // Hint check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game.doctorHints.push(
                    "Hint: The patient was recently exposed to a known allergen.",
                );
            } else if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game.doctorHints.push("Hint: The patient's airway narrows.");
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
        statHints: {
            respiratoryRate: -2,
            oxygenSaturation: -1,
            bloodGlucose: 1,
            pain: 2,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
                heartRate: {
                    value: Math.round(150 + Math.random() * 20),
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
                pain: 80 + Math.round(Math.random() * 20) / 2 - 10,
                qualitativeSymptoms: [
                    "The patient is in agony and feels a tightness in their chest",
                ],
                ...defaultGameData,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const heartLevel = game.disease.arbitraryValues.heart;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            if (heartLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    60,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    65,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    33,
                );
                game.bloodPressureSystolic.value = moveSymptomTowardsValue(
                    game.bloodPressureSystolic.value,
                    timeSinceLastUpdate,
                    80,
                );
                game.bloodPressureDiastolic.value = moveSymptomTowardsValue(
                    game.bloodPressureDiastolic.value,
                    timeSinceLastUpdate,
                    55,
                );
                game.pain = moveSymptomTowardsValue(
                    game.pain,
                    timeSinceLastUpdate,
                    60,
                );
                game.bloodGlucose = moveSymptomTowardsValue(
                    game.bloodGlucose,
                    timeSinceLastUpdate,
                    110,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 27)) {
                game.doctorIntervention =
                    "The patient went unconscious from a heart attack. The head doctor intervenes and administers thrombolytics.";
                game.finished = true;

                return game;
            }

            // TODO: move these to use arbitrary value
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game = addQualitativeSymptom(
                    game,
                    "The patient is sweating heavily and their skin becomes pale.",
                );
            }

            if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game = addQualitativeSymptom(
                    game,
                    "The patient complains that chest pain worsens",
                );
            }

            // Hint check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game.doctorHints.push(
                    "Hint: The patient has a history of high cholesterol and hypertension.",
                );
            } else if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game.doctorHints.push(
                    "Hint: Patient has a history of prescription pain medication usage.",
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
        statHints: {
            respiratoryRate: 1,
            oxygenSaturation: -1,
            bloodGlucose: 2,
            pain: 0,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
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
                pain: 40 + Math.round(Math.random() * 10) / 2,
                qualitativeSymptoms: [
                    "The patient feels numb and their speech is impeded.",
                ],
                ...defaultGameData,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const strokeLevel = game.disease.arbitraryValues.stroke;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            if (strokeLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    140,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    75,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    32,
                );
                game.bloodPressureSystolic.value = moveSymptomTowardsValue(
                    game.bloodPressureSystolic.value,
                    timeSinceLastUpdate,
                    190,
                );
                game.bloodPressureDiastolic.value = moveSymptomTowardsValue(
                    game.bloodPressureDiastolic.value,
                    timeSinceLastUpdate,
                    120,
                );
                game.pain = moveSymptomTowardsValue(
                    game.pain,
                    timeSinceLastUpdate,
                    40,
                );
                game.bloodGlucose = moveSymptomTowardsValue(
                    game.bloodGlucose,
                    timeSinceLastUpdate,
                    125,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 27)) {
                game.doctorIntervention =
                    "Patient is completely paralyzed. The head doctor intervenes and administers tissue plasminogen activator (tPA).";
                game.finished = true;
                return game;
            }

            // TODO: move these to use arbitrary value
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game = addQualitativeSymptom(
                    game,
                    "Patient's vision becomes blurred.",
                );
            }

            if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game = addQualitativeSymptom(
                    game,
                    "Speech and vision becomes severely impeded.",
                );
            }

            // Hint check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game.doctorHints.push(
                    "Hint: Patient unable to perform a simple symmetrical arm-raising test.",
                );
            } else if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game.doctorHints.push(
                    "You suspect there is a blood clot in an artery leading to the brain.",
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
        statHints: {
            respiratoryRate: 1,
            oxygenSaturation: -1,
            bloodGlucose: 2,
            pain: 2,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
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
                pain: 40 + Math.round(Math.random() * 20) / 2 - 10,
                qualitativeSymptoms: [
                    "The patient appears disoriented, agitated, and confused.",
                ],
                ...defaultGameData,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const sepsisLevel = game.disease.arbitraryValues.sepsis;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            if (sepsisLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    130,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    78,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    33,
                );
                game.bloodPressureSystolic.value = moveSymptomTowardsValue(
                    game.bloodPressureSystolic.value,
                    timeSinceLastUpdate,
                    90,
                );
                game.bloodPressureDiastolic.value = moveSymptomTowardsValue(
                    game.bloodPressureDiastolic.value,
                    timeSinceLastUpdate,
                    70,
                );
                game.pain = moveSymptomTowardsValue(
                    game.pain,
                    timeSinceLastUpdate,
                    80,
                );
                game.bloodGlucose = moveSymptomTowardsValue(
                    game.bloodGlucose,
                    timeSinceLastUpdate,
                    135,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 27)) {
                game.doctorIntervention =
                    "Sepsis was not treated properly. The head doctor intervenes and hooks patient on Intravenous Crystalloid IV.";
                game.finished = true;

                return game;
            }

            // TODO: move these to use arbitrary value
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game = addQualitativeSymptom(
                    game,
                    "Patient's skin becomes cool and clammy.",
                );
            }

            if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game = addQualitativeSymptom(
                    game,
                    "Patient develops severe confusion and shallow breathing.",
                );
            }

            // Hint check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game.doctorHints.push(
                    "Hint: Complications may have developed from an untreated infection.",
                );
            } else if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game.doctorHints.push(
                    "Hint: Records show a rapid decline in patient health following a minor infection.",
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
        statHints: {
            respiratoryRate: 1,
            oxygenSaturation: 0,
            bloodGlucose: 1,
            pain: 2,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
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
                pain: 30 + Math.round(Math.random() * 20) / 2 - 10,
                qualitativeSymptoms: [
                    "The patient feels a sharp pain in their stomach and is sweating profusely.",
                ],
                ...defaultGameData,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const foodLevel = game.disease.arbitraryValues.food;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            if (foodLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    125,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    99,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    20,
                );
                game.bloodPressureSystolic.value = moveSymptomTowardsValue(
                    game.bloodPressureSystolic.value,
                    timeSinceLastUpdate,
                    90,
                );
                game.bloodPressureDiastolic.value = moveSymptomTowardsValue(
                    game.bloodPressureDiastolic.value,
                    timeSinceLastUpdate,
                    70,
                );
                game.pain = moveSymptomTowardsValue(
                    game.pain,
                    timeSinceLastUpdate,
                    75,
                );
                game.bloodGlucose = moveSymptomTowardsValue(
                    game.bloodGlucose,
                    timeSinceLastUpdate,
                    115,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 27)) {
                game.doctorIntervention =
                    "Food poisoning not treated properly. The head doctor intervenes and prescribes loperamide.";
                game.finished = true;

                return game;
            }

            // TODO: move these to use arbitrary value
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game = addQualitativeSymptom(
                    game,
                    "Patient suffers from abdominal cramps and sweats profusely.",
                );
            }

            if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game = addQualitativeSymptom(
                    game,
                    "The patient frequently visits the restroom due to diarrhea.",
                );
            }

            // Hint check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game.doctorHints.push(
                    "Hint: Patient had lunch at a questionable restaurant.",
                );
            } else if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game.doctorHints.push(
                    "Hint: Patient believes symptoms are caused by foods they ate.",
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
        statHints: {
            respiratoryRate: 1,
            oxygenSaturation: -1,
            bloodGlucose: 2,
            pain: 2,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
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
                pain: 70 + Math.round(Math.random() * 20) / 2 - 10,
                qualitativeSymptoms: [
                    "The patient has difficulty breathing and feels an acute epigastric pain.",
                ],
                ...defaultGameData,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const acuteLevel = game.disease.arbitraryValues.acute;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            if (acuteLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    120,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    85,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    30,
                );
                game.bloodPressureSystolic.value = moveSymptomTowardsValue(
                    game.bloodPressureSystolic.value,
                    timeSinceLastUpdate,
                    100,
                );
                game.bloodPressureDiastolic.value = moveSymptomTowardsValue(
                    game.bloodPressureDiastolic.value,
                    timeSinceLastUpdate,
                    70,
                );
                game.pain = moveSymptomTowardsValue(
                    game.pain,
                    timeSinceLastUpdate,
                    80,
                );
                game.bloodGlucose = moveSymptomTowardsValue(
                    game.bloodGlucose,
                    timeSinceLastUpdate,
                    128,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 27)) {
                game.doctorIntervention =
                    "Inflamed pancreas was not treated. The head doctor intervenes and hooks patient to Intravenous Crystalloid IV.";
                game.finished = true;

                return game;
            }

            // TODO: move these to use arbitrary value
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game = addQualitativeSymptom(
                    game,
                    "Patient develops shallow breathing and worsening epigastric pain.",
                );
            }

            if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game = addQualitativeSymptom(
                    game,
                    "Patient suffers from extreme distress and fluid build-up in the belly.",
                );
            }

            // Hint check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game.doctorHints.push(
                    "Hint: Severe abdominal pain radiates to the back, worsened by eating.",
                );
            } else if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game.doctorHints.push(
                    "Hint: The patient has a history of heavy alcohol usage.",
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
        statHints: {
            respiratoryRate: 1,
            oxygenSaturation: -1,
            bloodGlucose: 0,
            pain: 1,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
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
                pain: 40 + Math.round(Math.random() * 20) / 2 - 10,
                qualitativeSymptoms: [
                    "There are swollen red bumps on the patient's skin.",
                ],
                ...defaultGameData,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const staphLevel = game.disease.arbitraryValues.staph;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            if (staphLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    100,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    98,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    20,
                );
                game.bloodPressureSystolic.value = moveSymptomTowardsValue(
                    game.bloodPressureSystolic.value,
                    timeSinceLastUpdate,
                    110,
                );
                game.bloodPressureDiastolic.value = moveSymptomTowardsValue(
                    game.bloodPressureDiastolic.value,
                    timeSinceLastUpdate,
                    75,
                );
                game.pain = moveSymptomTowardsValue(
                    game.pain,
                    timeSinceLastUpdate,
                    75,
                );
                game.bloodGlucose = moveSymptomTowardsValue(
                    game.bloodGlucose,
                    timeSinceLastUpdate,
                    110,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 27)) {
                game.doctorIntervention =
                    "Patient approaching state of septic shock. Head doctor intervenes and injects nafcillin.";
                game.finished = true;

                return game;
            }

            // TODO: move these to use arbitrary value
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game = addQualitativeSymptom(
                    game,
                    "Skin is constantly itching and begins to swell.",
                );
            }

            if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game = addQualitativeSymptom(
                    game,
                    "Abscesses become visible as blood appears on skin.",
                );
            }

            // Hint check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game.doctorHints.push(
                    "Hint: There are painful areas on the skin that are warm to the touch.",
                );
            } else if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game.doctorHints.push(
                    "Hint: The skin is infected by small, pus-filled blisters.",
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
        statHints: {
            respiratoryRate: 1,
            oxygenSaturation: -1,
            bloodGlucose: 0,
            pain: 1,
        },
        getDefaultGameData(this): GameData {
            return {
                disease: storedDiseaseToDisease(this),
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
                pain: 60 + Math.round(Math.random() * 20) / 2 - 10,
                qualitativeSymptoms: [
                    "There is a large wound on the patient's arm",
                ],
                ...defaultGameData,
            };
        },
        updateSymptoms: (game: GameData, prevGame: GameData): GameData => {
            const lacerationLevel = game.disease.arbitraryValues.laceration;

            const timeSinceLastUpdate = game.elapsedTime - prevGame.elapsedTime;

            if (lacerationLevel > 0) {
                game.heartRate.value = moveSymptomTowardsValue(
                    game.heartRate.value,
                    timeSinceLastUpdate,
                    120,
                );
                game.oxygenSaturation = moveSymptomTowardsValue(
                    game.oxygenSaturation,
                    timeSinceLastUpdate,
                    88,
                );
                game.respiratoryRate = moveSymptomTowardsValue(
                    game.respiratoryRate,
                    timeSinceLastUpdate,
                    21,
                );
                game.bloodPressureSystolic.value = moveSymptomTowardsValue(
                    game.bloodPressureSystolic.value,
                    timeSinceLastUpdate,
                    90,
                );
                game.bloodPressureDiastolic.value = moveSymptomTowardsValue(
                    game.bloodPressureDiastolic.value,
                    timeSinceLastUpdate,
                    60,
                );
                game.pain = moveSymptomTowardsValue(
                    game.pain,
                    timeSinceLastUpdate,
                    70,
                );
                game.bloodGlucose = moveSymptomTowardsValue(
                    game.bloodGlucose,
                    timeSinceLastUpdate,
                    110,
                );
            } else {
                game.finished = true;
                return game;
            }

            // Intervention check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 27)) {
                game.doctorIntervention =
                    "Laceration not treated adequately. Head doctor intervenes to apply ibuprofen and gauze.";
                game.finished = true;

                return game;
            }

            // TODO: move these to use arbitrary value
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game = addQualitativeSymptom(
                    game,
                    "Bleeding becomes more severe and wounds begins to swell.",
                );
            }

            if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game = addQualitativeSymptom(
                    game,
                    "Blood clotting and oozing at site of laceration.",
                );
            }

            // Hint check
            if (isFirstTimeAboveElapsedTime(game, prevGame, 10)) {
                game.doctorHints.push(
                    "Hint: A deep cut on the arm occurred after a sharp object injury.",
                );
            } else if (isFirstTimeAboveElapsedTime(game, prevGame, 20)) {
                game.doctorHints.push("Hint: Wound must be disinfected.");
            }

            return game;
        },
    },
];
