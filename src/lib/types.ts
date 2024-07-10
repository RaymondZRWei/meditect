export type ContinuousSymptoms = "heartRate" | "bloodPressure";
export type TestableSymptoms =
    | "temperature"
    | "oxygenSaturation"
    | "respiratoryRate"
    | "bloodGlucose";

export type QuantitativeSymptoms = ContinuousSymptoms | TestableSymptoms;

export interface Test {
    name: string;
    description: string;
    queriedSymptoms: QuantitativeSymptoms[];
}

export interface Disease {
    name: string;
    arbitraryValues: { [key: string]: number };
    updateSymptoms: (game: GameData) => GameData;
}

type QuantitativeSymptomStore = { [key in QuantitativeSymptoms]: number };

export interface GameData extends QuantitativeSymptomStore {
    finished: boolean;
    elapsedTime: number;
    tests: Test[];
    disease: Disease;
}
