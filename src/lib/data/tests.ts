import type { Test } from "../types";

export const tests: Test[] = [
  {
      name: "Respiratory Rate",
      unit: "Breaths per Min",
      actionMessage: "Use Spirometer",
      queriedSymptom: "respiratoryRate",
      maxValue: 40,
      duration: 2,
  },
  {
      name: "Oxygen Saturation",
      unit: "% Sp02",
      actionMessage: "Use Oximeter",
      queriedSymptom: "oxygenSaturation",
      maxValue: 100,
      duration: 2,
  },
  {
      name: "Blood Glucose",
      unit: "mg / dL",
      actionMessage: "Use Glucometer",
      queriedSymptom: "bloodGlucose",
      maxValue: 150,
      duration: 2,
  },
  {
      name: "Pain Level",
      unit: "Scale 0-100",
      actionMessage: "Ask Patient",
      queriedSymptom: "pain",
      maxValue: 100,
      duration: 1,
  },
];