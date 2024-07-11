import type { Test } from "../types";

export const tests: Test[] = [
    {
        name: "Thermometer",
        description: "Measures the patient's temperature.",
        queriedSymptoms: ["temperature"],
        duration: 1,
    },
    {
        name: "Oximeter",
        description: "Measures the patient's oxygen saturation.",
        queriedSymptoms: ["oxygenSaturation"],
        duration: 2,
    },
    {
        name: "Respiratory Rate Monitor",
        description: "Measures the patient's respiratory rate.",
        queriedSymptoms: ["respiratoryRate"],
        duration: 2,
    },
    {
        name: "Blood Glucose Monitor",
        description: "Measures the patient's blood glucose.",
        queriedSymptoms: ["bloodGlucose"],
        duration: 2,
    },
];
