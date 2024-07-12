import type { Test } from "../types";

export const tests: Test[] = [
    {
        name: "Respiratory Rate Monitor",
        description: "Measures the patient's respiratory rate.",
        queriedSymptoms: ["respiratoryRate"],
        duration: 1,
    },
    {
        name: "Oximeter",
        description: "Measures the patient's oxygen saturation.",
        queriedSymptoms: ["oxygenSaturation"],
        duration: 1,
    },
    {
        name: "Blood Glucose Monitor",
        description: "Measures the patient's blood glucose.",
        queriedSymptoms: ["bloodGlucose"],
        duration: 1,
    },
    {
        name: "Pain Response",
        description: "Measures the patient's pain level.",
        queriedSymptoms: ["pain"],
        duration: 1,
    },
];
