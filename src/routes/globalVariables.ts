interface affliction {
  name: string;
  responseHR: number[];
  responseBP1: number[];
  responseBP2: number[];

  responseQualitative: string[][];

  effectiveCures: string[];

  testResultsRespiratoryRate: number[];
  testResultsOxygenSaturation: number[];
  testResultsBloodGlucoseLevels: string[];
  testResultsPainLevel: string[];
}
export let currentAffliction: affliction;
function giveAffliction() {
  let rand = Math.floor(Math.random() * 10);
  if (rand == 0) {
    currentAffliction.name = "Opioid Overdose";
    currentAffliction.responseHR[0] = Math.round(50 + Math.random() * 10);
    currentAffliction.responseBP1[0] = Math.round(100 + Math.random() * 10 - 7);
    currentAffliction.responseBP2[0] = Math.round(60 + Math.random() * 6 - 4);

    currentAffliction.responseHR[1] = Math.round(35 + Math.random() * 10);
    currentAffliction.responseBP1[1] = Math.round(80 + Math.random() * 10 - 7);
    currentAffliction.responseBP2[1] = Math.round(45 + Math.random() * 6 - 4);


    currentAffliction.responseHR[2] = currentAffliction.responseHR[1] - Math.round(Math.random() * 10);
    currentAffliction.responseBP1[2] = currentAffliction.responseBP1[1] - Math.round(Math.random() * 10);
    currentAffliction.responseBP2[2] = currentAffliction.responseBP1[1] - Math.round(Math.random() * 6);

    currentAffliction.responseQualitative[0].push("Pale skin");
    currentAffliction.responseQualitative[0].push("Shallow breaths");
    currentAffliction.responseQualitative[0].push("Confusion");

    currentAffliction.responseQualitative[1].push("Unconscious");
    currentAffliction.responseQualitative[1].push("Cyanosis");

    currentAffliction.responseQualitative[2].push("Completely unresponsive");

    currentAffliction.effectiveCures.push("placeholder");

    currentAffliction.testResultsRespiratoryRate[0] = 12 + Math.round(Math.random() * 3) - 2;
    currentAffliction.testResultsRespiratoryRate[1] = 7 + Math.round(Math.random() * 3);
    currentAffliction.testResultsRespiratoryRate[2] = 2 + Math.round(Math.random() * 6);

    currentAffliction.testResultsOxygenSaturation[0] = 95 - Math.round(Math.random() * 10);
    currentAffliction.testResultsOxygenSaturation[1] = 85 - Math.round(Math.random() * 7);
    currentAffliction.testResultsOxygenSaturation[2] = 75 - Math.round(Math.random() * 5);

    currentAffliction.testResultsBloodGlucoseLevels[0] = "normal";
    currentAffliction.testResultsBloodGlucoseLevels[1] = "normal";
    currentAffliction.testResultsBloodGlucoseLevels[2] = "normal";

    currentAffliction.testResultsPainLevel[0] = "mild";
    currentAffliction.testResultsPainLevel[1] = "mild";
    currentAffliction.testResultsPainLevel[2] = "unresponsive";
  } else if (rand == 1) {
    currentAffliction.name = "Pulmonary Embolism";
    currentAffliction.responseHR[0] = Math.round(100 + Math.random() * 20);
    currentAffliction.responseBP1[0] = Math.round(140 - Math.random() * 5);
    currentAffliction.responseBP2[0] = Math.round(90 - Math.random() * 4);

    currentAffliction.responseHR[1] = Math.round(130 + Math.random() * 10);
    currentAffliction.responseBP1[1] = Math.round(160 + Math.random() * 10 - 7);
    currentAffliction.responseBP2[1] = Math.round(100 + Math.random() * 7);


    currentAffliction.responseHR[2] = currentAffliction.responseHR[1] - Math.round(Math.random() * 10) - 100;
    currentAffliction.responseBP1[2] = currentAffliction.responseBP1[1] - Math.round(Math.random() * 10) - 90;
    currentAffliction.responseBP2[2] = currentAffliction.responseBP1[1] - Math.round(Math.random() * 6) - 55;

    currentAffliction.responseQualitative[0].push("Intense chest pain");
    currentAffliction.responseQualitative[0].push("Pale skin");
    currentAffliction.responseQualitative[0].push("Stress");
    currentAffliction.responseQualitative[0].push("Anxiety");
    currentAffliction.responseQualitative[0].push("Heavy sweating");
    currentAffliction.responseQualitative[0].push("Difficulty breathing");
    currentAffliction.responseQualitative[0].push("Confusion");

    currentAffliction.responseQualitative[1].push("Excruciating chest pain");
    currentAffliction.responseQualitative[1].push("Cyanosis");
    currentAffliction.responseQualitative[1].push("Extreme distress");
    currentAffliction.responseQualitative[1].push("Breathing becomes more difficult");
    currentAffliction.responseQualitative[1].push("Extreme sweating");

    currentAffliction.responseQualitative[2].push("Completely unresponsive");
    currentAffliction.responseQualitative[2].push("Agonal breathing");
    currentAffliction.responseQualitative[1].push("Cyanosis worsens");

    currentAffliction.effectiveCures.push("placeholder");

    currentAffliction.testResultsRespiratoryRate[0] = 22 + Math.round(Math.random() * 3) - 2;
    currentAffliction.testResultsRespiratoryRate[1] = 24 + Math.round(Math.random() * 3);
    currentAffliction.testResultsRespiratoryRate[2] = 5 + Math.round(Math.random() * 2);

    currentAffliction.testResultsOxygenSaturation[0] = 90 - Math.round(Math.random() * 10);
    currentAffliction.testResultsOxygenSaturation[1] = 80 - Math.round(Math.random() * 7);
    currentAffliction.testResultsOxygenSaturation[2] = 70 - Math.round(Math.random() * 5);

    currentAffliction.testResultsBloodGlucoseLevels[0] = "normal";
    currentAffliction.testResultsBloodGlucoseLevels[1] = "normal";
    currentAffliction.testResultsBloodGlucoseLevels[2] = "normal";

    currentAffliction.testResultsPainLevel[0] = "high";
    currentAffliction.testResultsPainLevel[1] = "excruciating";
    currentAffliction.testResultsPainLevel[2] = "unresponsive";
  } else if (rand == 2) {
    currentAffliction.name = "Asthma Attack";
    currentAffliction.responseHR[0] = Math.round(100 + Math.random() * 20);
    currentAffliction.responseBP1[0] = Math.round(140 - Math.random() * 5);
    currentAffliction.responseBP2[0] = Math.round(90 - Math.random() * 4);

    currentAffliction.responseHR[1] = Math.round(130 + Math.random() * 10);
    currentAffliction.responseBP1[1] = Math.round(170 + Math.random() * 10 - 7);
    currentAffliction.responseBP2[1] = Math.round(105 + Math.random() * 7);


    currentAffliction.responseHR[2] = currentAffliction.responseHR[1] - Math.round(Math.random() * 10) - 100;
    currentAffliction.responseBP1[2] = currentAffliction.responseBP1[1] - Math.round(Math.random() * 10) - 90;
    currentAffliction.responseBP2[2] = currentAffliction.responseBP1[1] - Math.round(Math.random() * 6) - 55;

    currentAffliction.responseQualitative[0].push("Tightness in chest");
    currentAffliction.responseQualitative[0].push("Wheezing");
    currentAffliction.responseQualitative[0].push("Difficulty breathing");

    currentAffliction.responseQualitative[1].push("Losing consciousness");
    currentAffliction.responseQualitative[1].push("Cyanosis");
    currentAffliction.responseQualitative[1].push("Severe gasping");

    currentAffliction.responseQualitative[2].push("Completely unresponsive");
    currentAffliction.responseQualitative[1].push("Cyanosis worsens");

    currentAffliction.effectiveCures.push("placeholder");

    currentAffliction.testResultsRespiratoryRate[0] = 20 + Math.round(Math.random() * 3) - 2;
    currentAffliction.testResultsRespiratoryRate[1] = 25 + Math.round(Math.random() * 3);
    currentAffliction.testResultsRespiratoryRate[2] = 30 - Math.round(Math.random() * 2);

    currentAffliction.testResultsOxygenSaturation[0] = 92 - Math.round(Math.random() * 10);
    currentAffliction.testResultsOxygenSaturation[1] = 85 - Math.round(Math.random() * 7);
    currentAffliction.testResultsOxygenSaturation[2] = 70 - Math.round(Math.random() * 5);

    currentAffliction.testResultsBloodGlucoseLevels[0] = "normal";
    currentAffliction.testResultsBloodGlucoseLevels[1] = "elevated";
    currentAffliction.testResultsBloodGlucoseLevels[2] = "high";

    currentAffliction.testResultsPainLevel[0] = "normal";
    currentAffliction.testResultsPainLevel[1] = "high";
    currentAffliction.testResultsPainLevel[2] = "unresponsive";
  } else if (rand == 3) {
    currentAffliction.name = "Heart Attack";
    currentAffliction.responseHR[0] = Math.round(110 + Math.random() * 20);
    currentAffliction.responseBP1[0] = Math.round(160 - Math.random() * 5);
    currentAffliction.responseBP2[0] = Math.round(95 - Math.random() * 4);
  
    currentAffliction.responseHR[1] = currentAffliction.responseHR[0] - Math.round(Math.random() * 10) - 100;
    currentAffliction.responseBP1[1] = currentAffliction.responseBP1[0] - Math.round(Math.random() * 10) - 90;
    currentAffliction.responseBP2[1] = currentAffliction.responseBP1[0] - Math.round(Math.random() * 6) - 55;

    currentAffliction.responseHR[2] = 0; 
    currentAffliction.responseBP1[2] = 0;
    currentAffliction.responseBP2[2] = 0;
  
    currentAffliction.responseQualitative[0].push("Extreme chest tightness", "Struggling to breathe", "Sweating", "Pale skin", "Stress", "Anxiety", "Confusion");
    currentAffliction.responseQualitative[1].push("Unconscious", "Agonal breathing", "Cyanosis");
    currentAffliction.responseQualitative[2].push("Completely unresponsive");
  
    currentAffliction.effectiveCures.push("placeholder");
  
    currentAffliction.testResultsRespiratoryRate[0] = 24 + Math.round(Math.random() * 4) - 2;
    currentAffliction.testResultsRespiratoryRate[1] = 8 + Math.round(Math.random() * 3);
    currentAffliction.testResultsRespiratoryRate[2] = 5 + Math.round(Math.random() * 1);
  
    currentAffliction.testResultsOxygenSaturation[0] = 90 - Math.round(Math.random() * 10);
    currentAffliction.testResultsOxygenSaturation[1] = 75 - Math.round(Math.random() * 5);
    currentAffliction.testResultsOxygenSaturation[2] = 65 - Math.round(Math.random() * 5);
  
    currentAffliction.testResultsBloodGlucoseLevels[0] = "normal";
    currentAffliction.testResultsBloodGlucoseLevels[1] = "elevated";
    currentAffliction.testResultsBloodGlucoseLevels[2] = "elevated";
  
    currentAffliction.testResultsPainLevel[0] = "excruciating";
    currentAffliction.testResultsPainLevel[1] = "unconscious";
    currentAffliction.testResultsPainLevel[2] = "unresponsive";
  } else if (rand == 4) {
    currentAffliction.name = "Stroke";
    currentAffliction.responseHR[0] = Math.round(90 + Math.random() * 20);
    currentAffliction.responseBP1[0] = Math.round(170 - Math.random() * 5);
    currentAffliction.responseBP2[0] = Math.round(90 - Math.random() * 4);
  
    currentAffliction.responseHR[1] = Math.round(95 + Math.random() * 25);
    currentAffliction.responseBP1[1] = Math.round(180 + Math.random() * 20 - 7);
    currentAffliction.responseBP2[1] = Math.round(100 + Math.random() * 20);
  
    currentAffliction.responseHR[2] = Math.round(110 + Math.random() * 30);
    currentAffliction.responseBP1[2] = Math.round(200 + Math.random() * 20 - 10);
    currentAffliction.responseBP2[2] = Math.round(120 + Math.random() * 10);
  
    currentAffliction.responseQualitative[0].push("Numbness", "Speech impeded", "Vision problems");
    currentAffliction.responseQualitative[1].push("Very numb", "Very hard to speak and see");
    currentAffliction.responseQualitative[2].push("Severe paralysis", "Loss of speech", "Loss of vision");
  
    currentAffliction.effectiveCures.push("placeholder");
  
    currentAffliction.testResultsRespiratoryRate[0] = 25 + Math.round(Math.random() * 3) - 2;
    currentAffliction.testResultsRespiratoryRate[1] = 28 + Math.round(Math.random() * 3);
    currentAffliction.testResultsRespiratoryRate[2] = 32 + Math.round(Math.random() * 2);
  
    currentAffliction.testResultsOxygenSaturation[0] = 85 - Math.round(Math.random() * 10);
    currentAffliction.testResultsOxygenSaturation[1] = 78 - Math.round(Math.random() * 7);
    currentAffliction.testResultsOxygenSaturation[2] = 75 - Math.round(Math.random() * 5);
  
    currentAffliction.testResultsBloodGlucoseLevels[0] = "normal";
    currentAffliction.testResultsBloodGlucoseLevels[1] = "mild";
    currentAffliction.testResultsBloodGlucoseLevels[2] = "high";
  
    currentAffliction.testResultsPainLevel[0] = "normal";
    currentAffliction.testResultsPainLevel[1] = "mild";
    currentAffliction.testResultsPainLevel[2] = "mild";
  } else if (rand == 5) {
    currentAffliction.name = "Sepsis";
    currentAffliction.responseHR[0] = Math.round(90 + Math.random() * 20);
    currentAffliction.responseBP1[0] = Math.round(110 - Math.random() * 5);
    currentAffliction.responseBP2[0] = Math.round(70 - Math.random() * 4);
  
    currentAffliction.responseHR[1] = Math.round(100 + Math.random() * 20);
    currentAffliction.responseBP1[1] = Math.round(100 + Math.random() * 10 - 7);
    currentAffliction.responseBP2[1] = Math.round(70 + Math.random() * 6 - 4);
  
    currentAffliction.responseHR[2] = Math.round(110 + Math.random() * 20);
    currentAffliction.responseBP1[2] = Math.round(90 - Math.random() * 10);
    currentAffliction.responseBP2[2] = Math.round(70 - Math.random() * 6);
  
    currentAffliction.responseQualitative[0].push("Disoriented", "Agitated", "Confused");
    currentAffliction.responseQualitative[1].push("Cool and clammy skin", "Vomiting", "Nausea");
    currentAffliction.responseQualitative[2].push("Severe confusion", "Very shallow breathing");
  
    currentAffliction.effectiveCures.push("placeholder");
  
    currentAffliction.testResultsRespiratoryRate[0] = 20 + Math.round(Math.random() * 5) - 2;
    currentAffliction.testResultsRespiratoryRate[1] = 25 + Math.round(Math.random() * 5);
    currentAffliction.testResultsRespiratoryRate[2] = 30 + Math.round(Math.random() * 4);
  
    currentAffliction.testResultsOxygenSaturation[0] = 92 - Math.round(Math.random() * 10);
    currentAffliction.testResultsOxygenSaturation[1] = 85 - Math.round(Math.random() * 7);
    currentAffliction.testResultsOxygenSaturation[2] = 78 - Math.round(Math.random() * 5);
  
    currentAffliction.testResultsBloodGlucoseLevels[0] = "elevated";
    currentAffliction.testResultsBloodGlucoseLevels[1] = "high";
    currentAffliction.testResultsBloodGlucoseLevels[2] = "high";
  
    currentAffliction.testResultsPainLevel[0] = "normal";
    currentAffliction.testResultsPainLevel[1] = "high";
    currentAffliction.testResultsPainLevel[2] = "excruciating";
  }else if (rand == 6) {
    currentAffliction.name = "Food Poisoning";
    currentAffliction.responseHR[0] = Math.round(100 + Math.random() * 10);
    currentAffliction.responseBP1[0] = Math.round(115 - Math.random() * 5);
    currentAffliction.responseBP2[0] = Math.round(75 - Math.random() * 4);
  
    currentAffliction.responseHR[1] = Math.round(110 + Math.random() * 10);
    currentAffliction.responseBP1[1] = Math.round(100 + Math.random() * 10 - 7);
    currentAffliction.responseBP2[1] = Math.round(70 + Math.random() * 6 - 4);
  
    currentAffliction.responseHR[2] = Math.round(120 + Math.random() * 5);
    currentAffliction.responseBP1[2] = Math.round(100 - Math.random() * 10);
    currentAffliction.responseBP2[2] = Math.round(70 - Math.random() * 6);
  
    currentAffliction.responseQualitative[0].push("Skin becoming pale", "Abdominal cramps/pain", "Discomfort", "Sweating", "Signs of diarrhea");
    currentAffliction.responseQualitative[1].push("Body temperature decreasing", "Pale", "Anxiety/stress", "Profuse sweating", "Nausea", "Vomiting", "Dehydration");
    currentAffliction.responseQualitative[2].push("Body temperature decreasing", "Pale", "Anxiety/stress", "Profuse cold sweating", "Nausea", "Vomiting", "Severe dehydration", "Slight delirium");
  
    currentAffliction.effectiveCures.push("Loperamide", "Ondansetron");
  
    currentAffliction.testResultsRespiratoryRate[0] = 17 + Math.round(Math.random() * 4) - 2;
    currentAffliction.testResultsRespiratoryRate[1] = 19 + Math.round(Math.random() * 3);
    currentAffliction.testResultsRespiratoryRate[2] = 21 + Math.round(Math.random() * 2);
  
    currentAffliction.testResultsOxygenSaturation[0] = 97 - Math.round(Math.random() * 10);
    currentAffliction.testResultsOxygenSaturation[1] = 97 - Math.round(Math.random() * 7);
    currentAffliction.testResultsOxygenSaturation[2] = 98 - Math.round(Math.random() * 5);
  
    currentAffliction.testResultsBloodGlucoseLevels[0] = "normal";
    currentAffliction.testResultsBloodGlucoseLevels[1] = "elevated";
    currentAffliction.testResultsBloodGlucoseLevels[2] = "elevated";
  
    currentAffliction.testResultsPainLevel[0] = "mild";
    currentAffliction.testResultsPainLevel[1] = "high";
    currentAffliction.testResultsPainLevel[2] = "excruciating";
  } else if (rand == 7) {
    currentAffliction.name = "Acute Pancreatitis";
    currentAffliction.responseHR[0] = Math.round(95 + Math.random() * 10);
    currentAffliction.responseBP1[0] = Math.round(130 - Math.random() * 5);
    currentAffliction.responseBP2[0] = Math.round(80 - Math.random() * 4);
  
    currentAffliction.responseHR[1] = Math.round(105 + Math.random() * 10);
    currentAffliction.responseBP1[1] = Math.round(120 + Math.random() * 10 - 7);
    currentAffliction.responseBP2[1] = Math.round(75 + Math.random() * 6 - 4);
  
    currentAffliction.responseHR[2] = Math.round(115 + Math.random() * 10);
    currentAffliction.responseBP1[2] = Math.round(110 - Math.random() * 10);
    currentAffliction.responseBP2[2] = Math.round(70 - Math.random() * 6);
  
    currentAffliction.responseQualitative[0].push("Shallow breathing", "Severe epigastric pain", "Feeling ill");
    currentAffliction.responseQualitative[1].push("Rapid shallow breathing", "Worsening epigastric pain", "Nausea", "Vomiting");
    currentAffliction.responseQualitative[2].push("Severe distress", "Further breathing complications", "Fluid Build-up in Belly");
  
    currentAffliction.effectiveCures.push("placeholder");
  
    currentAffliction.testResultsRespiratoryRate[0] = 22 + Math.round(Math.random() * 4) - 2;
    currentAffliction.testResultsRespiratoryRate[1] = 26 + Math.round(Math.random() * 3);
    currentAffliction.testResultsRespiratoryRate[2] = 30 + Math.round(Math.random() * 2);
  
    currentAffliction.testResultsOxygenSaturation[0] = 94 - Math.round(Math.random() * 10);
    currentAffliction.testResultsOxygenSaturation[1] = 92 - Math.round(Math.random() * 7);
    currentAffliction.testResultsOxygenSaturation[2] = 90 - Math.round(Math.random() * 5);
  
    currentAffliction.testResultsBloodGlucoseLevels[0] = "normal";
    currentAffliction.testResultsBloodGlucoseLevels[1] = "elevated";
    currentAffliction.testResultsBloodGlucoseLevels[2] = "high";
  
    currentAffliction.testResultsPainLevel[0] = "high";
    currentAffliction.testResultsPainLevel[1] = "very high";
    currentAffliction.testResultsPainLevel[2] = "excruciating";
  } else if (rand == 8) {
    currentAffliction.name = "Staph Infection";
    currentAffliction.responseHR[0] = Math.round(80 + Math.random() * 10);
    currentAffliction.responseBP1[0] = Math.round(120 - Math.random() * 5);
    currentAffliction.responseBP2[0] = Math.round(80 - Math.random() * 4);
  
    currentAffliction.responseHR[1] = Math.round(90 + Math.random() * 5);
    currentAffliction.responseBP1[1] = Math.round(120 + Math.random() * 10 - 7);
    currentAffliction.responseBP2[1] = Math.round(80 + Math.random() * 6 - 4);
  
    currentAffliction.responseHR[2] = Math.round(95 + Math.random() * 5);
    currentAffliction.responseBP1[2] = Math.round(110 - Math.random() * 10);
    currentAffliction.responseBP2[2] = Math.round(70 - Math.random() * 6);
  
    currentAffliction.responseQualitative[0].push("Constant itching", "Red bumps", "Swelling");
    currentAffliction.responseQualitative[1].push("More itching", "Abscesses visible", "Blood on skin");
    currentAffliction.responseQualitative[2].push("Sensitive and bloodied skin", "Confusion", "Distress");
  
    currentAffliction.effectiveCures.push("placeholder");
  
    currentAffliction.testResultsRespiratoryRate[0] = 15 + Math.round(Math.random() * 3) - 2;
    currentAffliction.testResultsRespiratoryRate[1] = 18 + Math.round(Math.random() * 2);
    currentAffliction.testResultsRespiratoryRate[2] = 20 + Math.round(Math.random() * 1);
  
    currentAffliction.testResultsOxygenSaturation[0] = 97 - Math.round(Math.random() * 5);
    currentAffliction.testResultsOxygenSaturation[1] = 97 - Math.round(Math.random() * 3);
    currentAffliction.testResultsOxygenSaturation[2] = 98;
  
    currentAffliction.testResultsBloodGlucoseLevels[0] = "normal";
    currentAffliction.testResultsBloodGlucoseLevels[1] = "elevated";
    currentAffliction.testResultsBloodGlucoseLevels[2] = "elevated";
  
    currentAffliction.testResultsPainLevel[0] = "mild";
    currentAffliction.testResultsPainLevel[1] = "normal";
    currentAffliction.testResultsPainLevel[2] = "high";
  } else if (rand == 9) {
    currentAffliction.name = "Laceration (arm)";
    currentAffliction.responseHR[0] = Math.round(80 + Math.random() * 20);
    currentAffliction.responseBP1[0] = Math.round(130 - Math.random() * 5);
    currentAffliction.responseBP2[0] = Math.round(90 - Math.random() * 4);
  
    currentAffliction.responseHR[1] = Math.round(90 + Math.random() * 20);
    currentAffliction.responseBP1[1] = Math.round(110 + Math.random() * 10 - 7);
    currentAffliction.responseBP2[1] = Math.round(70 + Math.random() * 6 - 4);
  
    currentAffliction.responseHR[2] = Math.round(100 + Math.random() * 20);
    currentAffliction.responseBP1[2] = Math.round(100 - Math.random() * 10);
    currentAffliction.responseBP2[2] = Math.round(60 - Math.random() * 6);
  
    currentAffliction.responseQualitative[0].push("Visible wound on arm", "Bleeding");
    currentAffliction.responseQualitative[1].push("Bleeding more severely", "Swelling at wound");
    currentAffliction.responseQualitative[2].push("Blood clotting slightly", "Oozing at site of laceration");
  
    currentAffliction.effectiveCures.push("placeholder");
  
    currentAffliction.testResultsRespiratoryRate[0] = 15 + Math.round(Math.random() * 3) - 2;
    currentAffliction.testResultsRespiratoryRate[1] = 18 + Math.round(Math.random() * 2);
    currentAffliction.testResultsRespiratoryRate[2] = 20 + Math.round(Math.random() * 1);
  
    currentAffliction.testResultsOxygenSaturation[0] = 97 - Math.round(Math.random() * 10);
    currentAffliction.testResultsOxygenSaturation[1] = 95 - Math.round(Math.random() * 7);
    currentAffliction.testResultsOxygenSaturation[2] = 93 - Math.round(Math.random() * 5);
  
    currentAffliction.testResultsBloodGlucoseLevels[0] = "normal";
    currentAffliction.testResultsBloodGlucoseLevels[1] = "slightly elevated";
    currentAffliction.testResultsBloodGlucoseLevels[2] = "elevated";
  
    currentAffliction.testResultsPainLevel[0] = "normal";
    currentAffliction.testResultsPainLevel[1] = "normal";
    currentAffliction.testResultsPainLevel[2] = "high";
  }
  
}