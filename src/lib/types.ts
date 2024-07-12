export const continuousSymptoms = [
    "heartRate",
    "bloodPressureSystolic",
    "bloodPressureDiastolic",
] as const;

export type ContinuousSymptoms = (typeof continuousSymptoms)[number];

export type TestableSymptoms =
    | "oxygenSaturation"
    | "respiratoryRate"
    | "bloodGlucose"
    | "pain";

export type QuantitativeSymptoms = ContinuousSymptoms | TestableSymptoms;

export interface Test {
    name: string;
    description: string;
    queriedSymptoms: TestableSymptoms[];
    duration: number;
}

export interface TestResult {
    testName: string;
    timeAdministered: number;
    results: Partial<{ [key in TestableSymptoms]: number }>;
    duration: number;
}

export interface Disease {
    name: string;
    arbitraryValues: { [key: string]: number };
}

export interface Medicine {
    name: string;
    description: string;
    duration: number;
    updateGame: (game: GameData) => GameData;
}

export interface StoredDisease extends Disease {
    updateSymptoms: (game: GameData, prevGame: GameData) => GameData;
    getDefaultGameData: () => GameData;
}

interface ContinuousSymptomStorage {
    value: number;
    prevValues: number[];
}

type ContinuousSymptomStore = {
    [key in ContinuousSymptoms]: ContinuousSymptomStorage;
};
type TestableSymptomStore = { [key in TestableSymptoms]: number };

export interface GameData extends ContinuousSymptomStore, TestableSymptomStore {
    finished: boolean;
    elapsedTime: number;
    testResults: TestResult[];
    disease: Disease;
    qualitativeSymptoms: string[];
    pain: number;
    doctorHints: string[];
    doctorIntervention: string | null;
}

export type StoredGameData = GameData | null | undefined;

export interface GameResult extends ContinuousSymptomStore {
    elapsedTime: number;
    disease: Disease;
    doctorHints: string[];
    doctorIntervention: string | null;
}

export interface UserData {
    games: GameResult[];
}

export type StoredUserData = UserData | null | undefined;
