if (!Object.values) {
  Object.values = function values(obj) {
    return Object.keys(obj).map(function mapKey(key) {
      return obj[key];
    });
  };
}

if (!Array.prototype.includes) {
  Array.prototype.includes = function includes(searchElement, fromIndex) {
    const start = fromIndex || 0;
    return this.indexOf(searchElement, start) !== -1;
  };
}

if (!String.prototype.includes) {
  String.prototype.includes = function includes(searchString, position) {
    const start = position || 0;
    return this.indexOf(searchString, start) !== -1;
  };
}

var DRUGS = {
  bosentan: {
    id: "bosentan",
    name: "Bosentan (Tracleer)",
    classId: "era",
    route: "PO",
    startDose: "62.5 mg twice daily for 4 weeks",
    goalDose: "125 mg twice daily (adults >=40 kg)",
    monitoring: "Baseline + monthly LFTs; hemoglobin periodically; pregnancy testing/prevention program.",
    interactions: "Contraindicated with cyclosporine A and glyburide; broad CYP interaction burden.",
    renal: "No major label-based start dose adjustment in common use; monitor clinically.",
    hepatic: "Hepatotoxic risk; avoid start in meaningful hepatic dysfunction and monitor closely.",
    pregnancy: "Contraindicated in pregnancy."
  },
  ambrisentan: {
    id: "ambrisentan",
    name: "Ambrisentan (Letairis)",
    classId: "era",
    route: "PO",
    startDose: "5 mg once daily",
    goalDose: "Increase to 10 mg once daily after ~4 weeks if tolerated",
    monitoring: "Pregnancy testing/prevention, edema, hemoglobin, clinical right-heart status.",
    interactions: "Check interaction list before use in multidrug regimens.",
    renal: "Use clinically with routine renal surveillance.",
    hepatic: "Not recommended in moderate or severe hepatic impairment.",
    pregnancy: "Contraindicated in pregnancy."
  },
  macitentan: {
    id: "macitentan",
    name: "Macitentan (Opsumit)",
    classId: "era",
    route: "PO",
    startDose: "10 mg once daily",
    goalDose: "Fixed dose (no titration)",
    monitoring: "Baseline hemoglobin and liver enzymes; repeat as clinically indicated.",
    interactions: "Review CYP interactions during combination therapy.",
    renal: "No routine initiation change in mild-moderate renal impairment.",
    hepatic: "Assess liver function before and during therapy as indicated.",
    pregnancy: "Contraindicated in pregnancy."
  },
  sildenafil: {
    id: "sildenafil",
    name: "Sildenafil (Revatio)",
    classId: "pde5i",
    route: "PO (IV available if PO not feasible)",
    startDose: "20 mg three times daily",
    goalDose: "Commonly 20 mg three times daily; labeling allows titration up to 80 mg three times daily",
    monitoring: "Blood pressure, hypotension symptoms, vision/hearing adverse effects.",
    interactions: "Contraindicated with nitrates and riociguat; caution with strong CYP3A modulators.",
    renal: "Typical outpatient starts usually unchanged, adjust by clinical context.",
    hepatic: "Assess hepatic status and interaction burden.",
    pregnancy: "No ERA-like boxed teratogenic warning, but pregnancy in PAH requires specialist management."
  },
  tadalafil: {
    id: "tadalafil",
    name: "Tadalafil (Adcirca)",
    classId: "pde5i",
    route: "PO",
    startDose: "40 mg once daily",
    goalDose: "Fixed maximum 40 mg once daily",
    monitoring: "Blood pressure, renal function, interaction review (especially CYP3A/ritonavir context).",
    interactions: "Contraindicated with nitrates; avoid riociguat coadministration.",
    renal: "Start lower in mild-moderate renal impairment; avoid in severe impairment.",
    hepatic: "Lower start often used in mild-moderate hepatic impairment; avoid severe impairment.",
    pregnancy: "Use only with specialist oversight in pregnancy contexts."
  },
  riociguat: {
    id: "riociguat",
    name: "Riociguat (Adempas)",
    classId: "sgc",
    route: "PO",
    startDose: "1 mg three times daily (or 0.5 mg three times daily if hypotension risk)",
    goalDose: "Increase by 0.5 mg three times daily no sooner than every 2 weeks to max 2.5 mg three times daily",
    monitoring: "BP during titration (about every 2 weeks), pregnancy testing/prevention, smoking status.",
    interactions: "Contraindicated with PDE5 inhibitors and nitrates/NO donors; follow washout rules.",
    renal: "Monitor renal function and hypotension risk during uptitration.",
    hepatic: "Use cautiously with hepatic dysfunction.",
    pregnancy: "Contraindicated in pregnancy."
  },
  epoprostenol_iv: {
    id: "epoprostenol_iv",
    name: "Epoprostenol IV (Flolan or Veletri)",
    classId: "parenteral_prostacyclin",
    route: "Continuous IV infusion",
    startDose: "2 ng/kg/min",
    goalDose: "Increase in small increments (typically every >=15 min during monitored initiation), then individualize",
    monitoring: "Close hemodynamic monitoring at start, pump/line integrity, infection prevention, backup infusion planning.",
    interactions: "Major operational risk is abrupt interruption leading to rapid deterioration.",
    renal: "Dose is individualized by response and tolerance.",
    hepatic: "No fixed hepatic titration algorithm; adjust clinically.",
    pregnancy: "Used in specialized settings when clinically required."
  },
  treprostinil_sciv: {
    id: "treprostinil_sciv",
    name: "Treprostinil infusion (Remodulin SC/IV)",
    classId: "parenteral_prostacyclin",
    route: "Continuous SC preferred, IV alternative",
    startDose: "1.25 ng/kg/min (0.625 ng/kg/min if not tolerated)",
    goalDose: "Titrate weekly or faster in monitored settings to highest tolerated effective dose",
    monitoring: "BP, prostacyclin adverse effects, SC site pain, line/pump safety, infection risk for IV.",
    interactions: "Avoid abrupt discontinuation; review CYP2C8 interaction burden.",
    renal: "Titrate to tolerance with routine renal surveillance.",
    hepatic: "Start lower and titrate cautiously with hepatic impairment.",
    pregnancy: "Specialist-directed use in pregnancy settings when indicated."
  },
  treprostinil_inhaled: {
    id: "treprostinil_inhaled",
    name: "Treprostinil inhaled solution (Tyvaso)",
    classId: "inhaled_oral_prostacyclin",
    route: "Inhaled nebulized",
    startDose: "3 breaths (18 mcg) four times daily",
    goalDose: "Increase by 3 breaths/session every 1-2 weeks toward 9-12 breaths four times daily",
    monitoring: "Hypotension, bleeding risk, bronchospasm risk, inhalation technique and device maintenance.",
    interactions: "No single absolute co-drug ban like riociguat/PDE5i, but additive hypotension and bleeding risk apply.",
    renal: "No typical dose gate based only on renal function.",
    hepatic: "Monitor tolerability in hepatic dysfunction.",
    pregnancy: "Specialist-guided risk-benefit decisions required."
  },
  treprostinil_dpi: {
    id: "treprostinil_dpi",
    name: "Treprostinil inhaled powder (Tyvaso DPI)",
    classId: "inhaled_oral_prostacyclin",
    route: "Inhaled dry powder",
    startDose: "16 mcg cartridge four times daily",
    goalDose: "Increase by 16 mcg/session every 1-2 weeks; common target 48-64 mcg/session",
    monitoring: "As for inhaled prostacyclin: BP, bleeding, bronchospasm, correct device use.",
    interactions: "Caution with additive hypotension/bleeding regimens.",
    renal: "No standard severe renal prohibition in source summary.",
    hepatic: "Monitor tolerability by clinical response.",
    pregnancy: "Specialist-guided risk-benefit decisions required."
  },
  treprostinil_oral: {
    id: "treprostinil_oral",
    name: "Treprostinil oral ER (Orenitram)",
    classId: "inhaled_oral_prostacyclin",
    route: "PO",
    startDose: "0.125 mg three times daily or 0.25 mg twice daily with food",
    goalDose: "Increase no more often than every 3-4 days; goal is highest tolerated dose (label max daily 120 mg)",
    monitoring: "GI tolerance, blood pressure, bleeding risk, signs of clinical worsening if interrupted.",
    interactions: "Strong CYP2C8 inhibitors require dose modification; avoid abrupt withdrawal.",
    renal: "Use clinical judgment with renal dysfunction.",
    hepatic: "Avoid in moderate impairment and contraindicated in severe impairment.",
    pregnancy: "Use under specialist oversight only."
  },
  iloprost: {
    id: "iloprost",
    name: "Iloprost inhaled (Ventavis)",
    classId: "inhaled_oral_prostacyclin",
    route: "Inhaled",
    startDose: "2.5 mcg first dose, then 5 mcg if tolerated",
    goalDose: "6-9 inhalations/day while awake (at least 2 hours apart)",
    monitoring: "BP, syncope, bronchospasm risk, device reliability and backup plan.",
    interactions: "Avoid excessive additive hypotension with other vasodilators.",
    renal: "No central renal start threshold in source summary.",
    hepatic: "Monitor tolerability.",
    pregnancy: "Specialist-guided risk-benefit decisions required."
  },
  selexipag: {
    id: "selexipag",
    name: "Selexipag (Uptravi)",
    classId: "ip_receptor",
    route: "PO",
    startDose: "200 mcg twice daily",
    goalDose: "Increase by 200 mcg twice daily at roughly weekly intervals to highest tolerated dose (up to 1600 mcg twice daily)",
    monitoring: "BP and prostacyclin-type adverse effects (headache, jaw pain, diarrhea).",
    interactions: "Strong CYP2C8 inhibitors (for example gemfibrozil) contraindicated; clopidogrel often requires once-daily dosing.",
    renal: "Use clinical tolerance-based titration.",
    hepatic: "Child-Pugh B often requires once-daily regimen; avoid severe impairment.",
    pregnancy: "Pregnancy safety data are limited; specialist oversight required."
  },
  sotatercept: {
    id: "sotatercept",
    name: "Sotatercept (Winrevair)",
    classId: "activin",
    route: "SC every 3 weeks",
    startDose: "0.3 mg/kg every 3 weeks",
    goalDose: "Increase to 0.7 mg/kg every 3 weeks after confirming acceptable hemoglobin and platelet response",
    monitoring: "Hemoglobin and platelets before each dose for first 5 doses (or longer if unstable), then periodic checks.",
    interactions: "Dose holds/modifications needed for excessive hemoglobin rise or platelet drop.",
    renal: "No simple renal-only algorithm in source summary; monitor full clinical context.",
    hepatic: "No single hepatic start rule in source summary; individualize.",
    pregnancy: "Specialist pregnancy counseling required."
  },
  warfarin_cteph: {
    id: "warfarin_cteph",
    name: "Warfarin (CTEPH lifelong anticoagulation option)",
    classId: "anticoagulation",
    route: "PO",
    startDose: "Individualized loading/maintenance per INR protocol",
    goalDose: "Maintain therapeutic anticoagulation indefinitely",
    monitoring: "INR, bleeding risk, peri-procedural planning, interaction surveillance.",
    interactions: "Large interaction burden with diet and medications.",
    renal: "Can be used in severe renal disease with INR monitoring.",
    hepatic: "Liver disease complicates coagulation management; individualize.",
    pregnancy: "Pregnancy management differs and requires specialist obstetric/cardiopulmonary plan."
  },
  doac_cteph: {
    id: "doac_cteph",
    name: "DOAC (CTEPH anticoagulation option)",
    classId: "anticoagulation",
    route: "PO",
    startDose: "Agent-specific",
    goalDose: "Maintain therapeutic anticoagulation indefinitely",
    monitoring: "Bleeding, renal function, peri-procedural timing, adherence.",
    interactions: "Agent-specific CYP/P-gp interactions.",
    renal: "Dose and eligibility are renal-function dependent.",
    hepatic: "Use caution or avoid in advanced hepatic disease depending on agent.",
    pregnancy: "Avoid in pregnancy unless specialist-directed."
  },
  ccb_vasoreactive: {
    id: "ccb_vasoreactive",
    name: "High-dose CCB pathway (vasoreactivity responders)",
    classId: "ccb",
    route: "PO",
    startDose: "Agent-specific (for example nifedipine, amlodipine, or diltiazem)",
    goalDose: "Dose to sustained response and tolerance with specialist follow-up",
    monitoring: "Symptoms, BP, edema, and repeat hemodynamics to confirm durable response.",
    interactions: "Do not continue as sole strategy unless long-term responder criteria are met.",
    renal: "Agent-specific.",
    hepatic: "Agent-specific.",
    pregnancy: "Specialist-guided pregnancy management required."
  }
};

var CLASS_LABELS = {
  era: "Endothelin receptor antagonist (ERA)",
  pde5i: "PDE5 inhibitor",
  sgc: "sGC stimulator",
  parenteral_prostacyclin: "Parenteral prostacyclin pathway",
  inhaled_oral_prostacyclin: "Inhaled or oral prostacyclin pathway",
  ip_receptor: "IP receptor agonist",
  activin: "Activin signaling inhibitor",
  anticoagulation: "Anticoagulation",
  ccb: "Calcium channel blocker pathway"
};

function getDrugsByClass(classId) {
  return Object.values(DRUGS).filter((drug) => drug.classId === classId);
}

function toNumber(value) {
  if (value === "" || value === null || value === undefined) {
    return null;
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function parseInput(formData) {
  return {
    assessmentStage: formData.get("assessmentStage"),
    riskModel: formData.get("riskModel"),
    whoGroup: formData.get("whoGroup"),
    mPAP: toNumber(formData.get("mPAP")),
    PAWP: toNumber(formData.get("PAWP")),
    PVR: toNumber(formData.get("PVR")),
    whoFc: formData.get("whoFc"),
    walkDistance: toNumber(formData.get("walkDistance")),
    bnp: toNumber(formData.get("bnp")),
    ntProbnp: toNumber(formData.get("ntProbnp")),
    systolicBp: toNumber(formData.get("systolicBp")),
    heartRate: toNumber(formData.get("heartRate")),
    ageYears: toNumber(formData.get("ageYears")),
    sexAtBirth: formData.get("sexAtBirth"),
    egfr: toNumber(formData.get("egfr")),
    pahSubgroup: formData.get("pahSubgroup"),
    dlcoPercentPred: toNumber(formData.get("dlcoPercentPred")),
    mrap: toNumber(formData.get("mrap")),
    platelets: toNumber(formData.get("platelets")),
    recentHospitalization: formData.get("recentHospitalization") === "on",
    pericardialEffusion: formData.get("pericardialEffusion") === "on",
    cardiopulmonaryComorbidities: formData.get("cardiopulmonaryComorbidities") === "on",
    vasoreactivityEligible: formData.get("vasoreactivityEligible") === "on",
    vasoreactivityPositive: formData.get("vasoreactivityPositive") === "on",
    ildAssociated: formData.get("ildAssociated") === "on",
    severeIldPh: formData.get("severeIldPh") === "on",
    rightHeartFailureSigns: formData.get("rightHeartFailureSigns") === "on",
    volumeOverload: formData.get("volumeOverload") === "on",
    pregnantOrTrying: formData.get("pregnantOrTrying") === "on",
    onNitrates: formData.get("onNitrates") === "on",
    strongCyp2c8Inhibitor: formData.get("strongCyp2c8Inhibitor") === "on",
    onClopidogrel: formData.get("onClopidogrel") === "on",
    hepaticImpairment: formData.get("hepaticImpairment"),
    renalStatus: formData.get("renalStatus")
  };
}

function classifyHemodynamics(input) {
  if (input.mPAP === null || input.PAWP === null || input.PVR === null) {
    return {
      hasPH: false,
      profile: "Insufficient hemodynamic data",
      detail: "mPAP, PAWP, and PVR are required for classification."
    };
  }

  const hasPH = input.mPAP > 20;
  if (!hasPH) {
    return {
      hasPH: false,
      profile: "No hemodynamic PH",
      detail: "mPAP <=20 mmHg does not meet current hemodynamic PH definition."
    };
  }

  if (input.PAWP <= 15 && input.PVR > 2) {
    return {
      hasPH: true,
      profile: "Pre-capillary PH phenotype",
      detail: "mPAP >20, PAWP <=15, and PVR >2 WU."
    };
  }

  if (input.PAWP > 15 && input.PVR <= 2) {
    return {
      hasPH: true,
      profile: "Isolated post-capillary PH phenotype",
      detail: "mPAP >20, PAWP >15, and PVR <=2 WU."
    };
  }

  if (input.PAWP > 15 && input.PVR > 2) {
    return {
      hasPH: true,
      profile: "Combined post/pre-capillary PH phenotype",
      detail: "mPAP >20, PAWP >15, and PVR >2 WU."
    };
  }

  return {
    hasPH: true,
    profile: "Unclassified elevated mPAP pattern",
    detail: "mPAP >20 with PAWP <=15 and PVR <=2 WU."
  };
}

function scoreFromThresholds(value, thresholds) {
  if (value === null || value === undefined) {
    return null;
  }
  for (const rule of thresholds) {
    if (rule.check(value)) {
      return rule.score;
    }
  }
  return null;
}

function getBiomarkerScore3Strata(input) {
  const bnpScore = scoreFromThresholds(input.bnp, [
    { check: (v) => v < 50, score: 1 },
    { check: (v) => v <= 800, score: 2 },
    { check: (v) => v > 800, score: 3 }
  ]);

  const ntScore = scoreFromThresholds(input.ntProbnp, [
    { check: (v) => v < 300, score: 1 },
    { check: (v) => v <= 1100, score: 2 },
    { check: (v) => v > 1100, score: 3 }
  ]);

  if (bnpScore === null && ntScore === null) {
    return null;
  }
  if (bnpScore === null) {
    return ntScore;
  }
  if (ntScore === null) {
    return bnpScore;
  }
  return Math.max(bnpScore, ntScore);
}

function getBiomarkerScore4Strata(input) {
  const bnpScore = scoreFromThresholds(input.bnp, [
    { check: (v) => v < 50, score: 1 },
    { check: (v) => v <= 199, score: 2 },
    { check: (v) => v <= 800, score: 3 },
    { check: (v) => v > 800, score: 4 }
  ]);

  const ntScore = scoreFromThresholds(input.ntProbnp, [
    { check: (v) => v < 300, score: 1 },
    { check: (v) => v <= 649, score: 2 },
    { check: (v) => v <= 1100, score: 3 },
    { check: (v) => v > 1100, score: 4 }
  ]);

  if (bnpScore === null && ntScore === null) {
    return null;
  }
  if (bnpScore === null) {
    return ntScore;
  }
  if (ntScore === null) {
    return bnpScore;
  }
  return Math.max(bnpScore, ntScore);
}

function getRenalInsufficiencyFlag(input) {
  if (input.egfr !== null) {
    return input.egfr < 60;
  }
  if (input.renalStatus === "moderate" || input.renalStatus === "severe") {
    return true;
  }
  if (input.renalStatus === "normal") {
    return false;
  }
  return null;
}

function getRenalStatusFromEgfr(egfr) {
  if (egfr === null || egfr === undefined) {
    return null;
  }
  if (egfr >= 60) {
    return "normal";
  }
  if (egfr >= 30) {
    return "moderate";
  }
  return "severe";
}

function getRevealBiomarkerPoints(input) {
  const points = [];

  if (input.bnp !== null) {
    if (input.bnp < 50) {
      points.push(-2);
    } else if (input.bnp <= 199) {
      points.push(0);
    } else if (input.bnp <= 799) {
      points.push(1);
    } else {
      points.push(2);
    }
  }

  if (input.ntProbnp !== null) {
    if (input.ntProbnp < 300) {
      points.push(-2);
    } else if (input.ntProbnp <= 1099) {
      points.push(0);
    } else {
      points.push(2);
    }
  }

  if (!points.length) {
    return null;
  }

  return Math.max.apply(null, points);
}

function getAllowedRiskModels(input) {
  if (input.whoGroup !== "1") {
    return [];
  }
  if (input.assessmentStage === "initial") {
    return ["reveal20_initial"];
  }
  return ["reveal_lite2_followup", "compera20_followup", "french_noninvasive_followup"];
}

function getDefaultRiskModel(input) {
  if (input.assessmentStage === "initial") {
    return "reveal20_initial";
  }
  return "compera20_followup";
}

function classifyComperaFollowRiskFromMean(meanScore) {
  if (meanScore === null) {
    return "unknown";
  }
  if (meanScore <= 1.5) {
    return "low";
  }
  if (meanScore <= 2.5) {
    return "intermediate_low";
  }
  if (meanScore <= 3.5) {
    return "intermediate_high";
  }
  return "high";
}

function getWhoFcScore4(whoFc) {
  if (whoFc === "I" || whoFc === "II") return 1;
  if (whoFc === "III") return 3;
  if (whoFc === "IV") return 4;
  return null;
}

function calculateMeanScore(scoreMap) {
  const values = Object.values(scoreMap).filter((value) => value !== null);
  if (!values.length) {
    return { mean: null, used: 0 };
  }
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return { mean, used: values.length };
}

function toCell(value) {
  return value === null || value === undefined ? "--" : value;
}

function computeReveal20Initial(input) {
  let score = 6;
  let variablesUsed = 0;
  const componentPoints = {
    pahSubgroup: null,
    ageSex: null,
    renal: null,
    whoFc: null,
    systolicBp: null,
    heartRate: null,
    hospitalization: 0,
    sixMwd: null,
    biomarker: null,
    pericardialEffusion: 0,
    dlco: null,
    mrap: null,
    pvr: null
  };

  const addVariable = (points) => {
    score += points;
    variablesUsed += 1;
  };

  if (input.whoGroup === "1" && input.pahSubgroup) {
    const subgroupPoints = {
      ctd: 1,
      heritable: 2,
      poph: 3,
      other: 0
    };
    const subgroupPoint = Object.prototype.hasOwnProperty.call(subgroupPoints, input.pahSubgroup)
      ? subgroupPoints[input.pahSubgroup]
      : 0;
    componentPoints.pahSubgroup = subgroupPoint;
    addVariable(subgroupPoint);
  }

  if (input.sexAtBirth && input.ageYears !== null) {
    componentPoints.ageSex = input.sexAtBirth === "male" && input.ageYears > 60 ? 2 : 0;
    addVariable(componentPoints.ageSex);
  }

  const renalInsufficiency = getRenalInsufficiencyFlag(input);
  if (renalInsufficiency !== null) {
    componentPoints.renal = renalInsufficiency ? 1 : 0;
    addVariable(componentPoints.renal);
  }

  if (input.whoFc) {
    const fcPoints = {
      I: -1,
      II: 0,
      III: 1,
      IV: 2
    };
    const fcPoint = Object.prototype.hasOwnProperty.call(fcPoints, input.whoFc)
      ? fcPoints[input.whoFc]
      : 0;
    componentPoints.whoFc = fcPoint;
    addVariable(fcPoint);
  }

  if (input.systolicBp !== null) {
    componentPoints.systolicBp = input.systolicBp < 110 ? 1 : 0;
    addVariable(componentPoints.systolicBp);
  }

  if (input.heartRate !== null) {
    componentPoints.heartRate = input.heartRate > 96 ? 1 : 0;
    addVariable(componentPoints.heartRate);
  }

  componentPoints.hospitalization = input.recentHospitalization ? 1 : 0;
  addVariable(componentPoints.hospitalization);

  if (input.walkDistance !== null) {
    let walkPoints = 0;
    if (input.walkDistance >= 440) {
      walkPoints = -2;
    } else if (input.walkDistance >= 320) {
      walkPoints = -1;
    } else if (input.walkDistance < 165) {
      walkPoints = 1;
    }
    componentPoints.sixMwd = walkPoints;
    addVariable(walkPoints);
  }

  const biomarkerPoints = getRevealBiomarkerPoints(input);
  if (biomarkerPoints !== null) {
    componentPoints.biomarker = biomarkerPoints;
    addVariable(biomarkerPoints);
  }

  componentPoints.pericardialEffusion = input.pericardialEffusion ? 1 : 0;
  addVariable(componentPoints.pericardialEffusion);

  if (input.dlcoPercentPred !== null) {
    componentPoints.dlco = input.dlcoPercentPred < 40 ? 1 : 0;
    addVariable(componentPoints.dlco);
  }

  if (input.mrap !== null) {
    componentPoints.mrap = input.mrap > 20 ? 1 : 0;
    addVariable(componentPoints.mrap);
  }

  if (input.PVR !== null) {
    componentPoints.pvr = input.PVR < 5 ? -1 : 0;
    addVariable(componentPoints.pvr);
  }

  let label = "high";
  if (score <= 6) {
    label = "low";
  } else if (score <= 8) {
    label = "intermediate";
  }

  return {
    modelId: "reveal20_initial",
    modelName: "REVEAL 2.0",
    label,
    pathwayLabel: label,
    score,
    variablesUsed,
    limitedData: variablesUsed < 7,
    riskTable: {
      columns: [
        "Model",
        "Risk Tier",
        "Total Score",
        "Variables Used",
        "PAH Subgroup pts",
        "Age/Sex pts",
        "Renal pts",
        "WHO-FC pts",
        "SBP pts",
        "HR pts",
        "Hosp pts",
        "6MWD pts",
        "Biomarker pts",
        "Pericardial pts",
        "DLCO pts",
        "mRAP pts",
        "PVR pts"
      ],
      rows: [[
        "REVEAL 2.0",
        label,
        score,
        variablesUsed,
        toCell(componentPoints.pahSubgroup),
        toCell(componentPoints.ageSex),
        toCell(componentPoints.renal),
        toCell(componentPoints.whoFc),
        toCell(componentPoints.systolicBp),
        toCell(componentPoints.heartRate),
        toCell(componentPoints.hospitalization),
        toCell(componentPoints.sixMwd),
        toCell(componentPoints.biomarker),
        toCell(componentPoints.pericardialEffusion),
        toCell(componentPoints.dlco),
        toCell(componentPoints.mrap),
        toCell(componentPoints.pvr)
      ]]
    }
  };
}

function computeRevealLite2Followup(input) {
  let score = 6;
  let variablesUsed = 0;
  const componentPoints = {
    whoFc: null,
    systolicBp: null,
    heartRate: null,
    sixMwd: null,
    biomarker: null,
    renal: null
  };

  const addVariable = (points) => {
    score += points;
    variablesUsed += 1;
  };

  if (input.whoFc) {
    const fcPoints = {
      I: -1,
      II: 0,
      III: 1,
      IV: 2
    };
    const fcPoint = Object.prototype.hasOwnProperty.call(fcPoints, input.whoFc)
      ? fcPoints[input.whoFc]
      : null;
    if (fcPoint !== null) {
      componentPoints.whoFc = fcPoint;
      addVariable(fcPoint);
    }
  }

  if (input.systolicBp !== null) {
    componentPoints.systolicBp = input.systolicBp < 110 ? 1 : 0;
    addVariable(componentPoints.systolicBp);
  }

  if (input.heartRate !== null) {
    componentPoints.heartRate = input.heartRate > 96 ? 1 : 0;
    addVariable(componentPoints.heartRate);
  }

  if (input.walkDistance !== null) {
    let walkPoints = 0;
    if (input.walkDistance >= 440) {
      walkPoints = -2;
    } else if (input.walkDistance >= 320) {
      walkPoints = -1;
    } else if (input.walkDistance < 165) {
      walkPoints = 1;
    }
    componentPoints.sixMwd = walkPoints;
    addVariable(walkPoints);
  }

  const biomarkerPoints = getRevealBiomarkerPoints(input);
  if (biomarkerPoints !== null) {
    componentPoints.biomarker = biomarkerPoints;
    addVariable(biomarkerPoints);
  }

  const renalInsufficiency = getRenalInsufficiencyFlag(input);
  if (renalInsufficiency !== null) {
    componentPoints.renal = renalInsufficiency ? 1 : 0;
    addVariable(componentPoints.renal);
  }

  let label = "high";
  if (variablesUsed === 0) {
    label = "unknown";
  } else if (score <= 5) {
    label = "low";
  } else if (score <= 7) {
    label = "intermediate";
  }

  return {
    modelId: "reveal_lite2_followup",
    modelName: "REVEAL Lite 2",
    label,
    pathwayLabel: label === "intermediate" ? "intermediate_low" : label,
    score: variablesUsed ? score : null,
    variablesUsed,
    limitedData: variablesUsed < 4,
    riskTable: {
      columns: [
        "Model",
        "Risk Tier",
        "Total Score",
        "Variables Used",
        "WHO-FC pts",
        "SBP pts",
        "HR pts",
        "6MWD pts",
        "Biomarker pts",
        "Renal pts"
      ],
      rows: [[
        "REVEAL Lite 2",
        label,
        variablesUsed ? score : "--",
        `${variablesUsed}/6`,
        toCell(componentPoints.whoFc),
        toCell(componentPoints.systolicBp),
        toCell(componentPoints.heartRate),
        toCell(componentPoints.sixMwd),
        toCell(componentPoints.biomarker),
        toCell(componentPoints.renal)
      ]]
    }
  };
}

function computeCompera20Followup(input) {
  const componentScores = {
    whoFc: getWhoFcScore4(input.whoFc),
    sixMwd: scoreFromThresholds(input.walkDistance, [
      { check: (v) => v > 440, score: 1 },
      { check: (v) => v >= 320, score: 2 },
      { check: (v) => v >= 165, score: 3 },
      { check: (v) => v < 165, score: 4 }
    ]),
    biomarker: getBiomarkerScore4Strata(input)
  };

  const meanScore = calculateMeanScore(componentScores);
  const label = classifyComperaFollowRiskFromMean(meanScore.mean);

  return {
    modelId: "compera20_followup",
    modelName: "COMPERA 2.0 4-Risk Strata",
    label,
    pathwayLabel: label,
    score: meanScore.mean,
    variablesUsed: meanScore.used,
    limitedData: meanScore.used < 2,
    riskTable: {
      columns: [
        "Model",
        "Risk Tier",
        "Overall Score",
        "Variables Used",
        "WHO-FC Score",
        "6MWD Score",
        "BNP/NT-proBNP Score"
      ],
      rows: [[
        "COMPERA 2.0",
        label,
        meanScore.mean === null ? "--" : Math.round(meanScore.mean),
        `${meanScore.used}/3`,
        toCell(componentScores.whoFc),
        toCell(componentScores.sixMwd),
        toCell(componentScores.biomarker)
      ]]
    }
  };
}

function computeFrenchNoninvasiveFollowup(input) {
  const criteria = {
    whoFcLow: input.whoFc ? (input.whoFc === "I" || input.whoFc === "II") : null,
    sixMwdLow: input.walkDistance !== null ? input.walkDistance > 440 : null,
    biomarkerLow: (input.bnp !== null || input.ntProbnp !== null)
      ? ((input.bnp !== null && input.bnp < 50) || (input.ntProbnp !== null && input.ntProbnp < 300))
      : null
  };

  const available = Object.values(criteria).filter((value) => value !== null).length;
  const met = Object.values(criteria).filter((value) => value === true).length;
  let label = "unknown";
  if (available > 0) {
    if (met === 3) {
      label = "low";
    } else if (met === 2) {
      label = "intermediate";
    } else {
      label = "high";
    }
  }

  return {
    modelId: "french_noninvasive_followup",
    modelName: "French Noninvasive Criteria",
    label,
    pathwayLabel: label === "intermediate" ? "intermediate_low" : label,
    score: available > 0 ? met : null,
    variablesUsed: available,
    limitedData: available < 3,
    riskTable: {
      columns: [
        "Model",
        "Risk Tier",
        "Low-Risk Criteria Met",
        "Criteria Available",
        "WHO-FC I/II",
        "6MWD >440",
        "BNP<50 or NT-proBNP<300"
      ],
      rows: [[
        "French Noninvasive",
        label,
        available > 0 ? met : "--",
        `${available}/3`,
        criteria.whoFcLow === null ? "--" : (criteria.whoFcLow ? "Yes" : "No"),
        criteria.sixMwdLow === null ? "--" : (criteria.sixMwdLow ? "Yes" : "No"),
        criteria.biomarkerLow === null ? "--" : (criteria.biomarkerLow ? "Yes" : "No")
      ]]
    }
  };
}

function computeRisk(input) {
  const allowedModels = getAllowedRiskModels(input);
  if (!allowedModels.length) {
    return {
      modelId: null,
      modelName: null,
      label: "unknown",
      pathwayLabel: input.assessmentStage === "initial" ? "intermediate" : "intermediate_low",
      score: null,
      variablesUsed: 0,
      limitedData: false,
      riskTable: null
    };
  }

  const selectedModel = allowedModels.includes(input.riskModel)
    ? input.riskModel
    : getDefaultRiskModel(input);

  if (selectedModel === "reveal20_initial") {
    return computeReveal20Initial(input);
  }
  if (selectedModel === "reveal_lite2_followup") {
    return computeRevealLite2Followup(input);
  }
  if (selectedModel === "french_noninvasive_followup") {
    return computeFrenchNoninvasiveFollowup(input);
  }
  return computeCompera20Followup(input);
}

function sortDrugIdsAlphabetically(drugIds) {
  return drugIds.slice().sort((a, b) => {
    const nameA = DRUGS[a] && DRUGS[a].name ? DRUGS[a].name : a;
    const nameB = DRUGS[b] && DRUGS[b].name ? DRUGS[b].name : b;
    return nameA.localeCompare(nameB);
  });
}

function buildSelectionTarget(id, label, note, drugIds, min, max) {
  return { id, label, note, drugIds: sortDrugIdsAlphabetically(drugIds), min, max };
}

function formatRiskLabel(label) {
  return label.replace(/_/g, " ");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function addActionUnique(decision, action) {
  if (!decision.actions.includes(action)) {
    decision.actions.push(action);
  }
}

function appendDiuresisRecommendation(decision, input, hemo) {
  const postCapillaryContext =
    hemo.profile.includes("post-capillary") || hemo.profile.includes("Combined post/pre-capillary");
  const hasCongestionSignals = input.volumeOverload || input.rightHeartFailureSigns;

  if (hasCongestionSignals) {
    addActionUnique(
      decision,
      "Recommend decongestion/diuresis for volume overload (typically loop-diuretic based), with daily weights, intake/output review, and symptom reassessment."
    );
    addActionUnique(
      decision,
      "Monitor renal function and electrolytes (especially sodium and potassium) after diuretic initiation or dose adjustment."
    );
    if (input.whoGroup === "2" || postCapillaryContext) {
      addActionUnique(
        decision,
        "In post-capillary or PH-LHD physiology, prioritize decongestion as a core management step."
      );
    }
    return;
  }

  if (input.whoGroup === "2" || postCapillaryContext) {
    addActionUnique(
      decision,
      "Assess for clinical congestion at each encounter and initiate/adjust diuresis when volume overload is present."
    );
  }
}

function appendTransplantReferralRecommendation(decision, input, riskResult, pathwayRiskLabel) {
  if (input.whoGroup !== "1") {
    return;
  }

  const selectedScore = riskResult.score;
  const selectedModel = riskResult.modelId;
  const modelSpecificHighSignal =
    (selectedModel === "reveal20_initial" && selectedScore !== null && selectedScore >= 8) ||
    (selectedModel === "reveal_lite2_followup" && selectedScore !== null && selectedScore >= 8) ||
    (selectedModel === "french_noninvasive_followup" && selectedScore !== null && selectedScore <= 1);

  const needsReferral =
    modelSpecificHighSignal ||
    pathwayRiskLabel === "intermediate_high" ||
    pathwayRiskLabel === "high";

  if (needsReferral) {
    addActionUnique(decision, "Recommend referral to a lung transplant center for formal evaluation.");
  }

  const needsListingDiscussion =
    (selectedModel === "reveal20_initial" && selectedScore !== null && selectedScore >= 10) ||
    pathwayRiskLabel === "high";

  if (needsListingDiscussion) {
    addActionUnique(
      decision,
      "If high risk persists despite optimized therapy (including parenteral prostacyclin when appropriate), discuss transplant listing candidacy."
    );
  }
}

function buildDecision(input) {
  const hemo = classifyHemodynamics(input);
  const risk = computeRisk(input);
  const showPahRiskScores = input.whoGroup === "1";

  const decision = {
    hemo,
    risk,
    summary: [],
    riskTable: null,
    alerts: [],
    actions: [],
    rationale: [],
    selectionTargets: []
  };

  decision.summary.push(`${hemo.profile}: ${hemo.detail}`);

  if (showPahRiskScores) {
    decision.summary.push(`Risk model selected: ${risk.modelName}.`);
    if (risk.label !== "unknown") {
      decision.summary.push(`Risk tier from selected model: ${formatRiskLabel(risk.label)}.`);
    } else {
      decision.summary.push("Risk tier from selected model: unavailable (insufficient data).");
    }
    decision.riskTable = {
      columns: ["Model", "Risk Tier", "Total Score"],
      rows: [[
        risk.modelName || "--",
        formatRiskLabel(risk.label || "unknown"),
        risk.score === null || risk.score === undefined ? "--" : Math.round(risk.score)
      ]]
    };
    if (risk.limitedData) {
      decision.alerts.push("Selected risk model is based on limited variables. Interpret cautiously.");
    }
  } else {
    decision.summary.push(`WHO Group ${input.whoGroup} pathway selected.`);
  }

  if (!hemo.hasPH) {
    decision.actions.push("Do not initiate PH-targeted therapy based on current hemodynamics alone.");
    decision.actions.push("Reassess diagnosis and repeat workup if clinical suspicion remains high.");
    decision.rationale.push("Current definitions require mPAP >20 mmHg to meet hemodynamic PH criteria.");
    return decision;
  }

  appendDiuresisRecommendation(decision, input, hemo);

  if (input.onNitrates) {
    decision.alerts.push("Nitrates/NO donor therapy is active: avoid PDE5 inhibitors and riociguat combinations.");
  }

  if (input.pregnantOrTrying) {
    decision.alerts.push("Pregnancy context detected: avoid teratogenic pathways (notably ERAs and riociguat) and co-manage with expert PH center.");
  }

  if (input.severeIldPh && !input.ildAssociated) {
    decision.alerts.push("Severe ILD-PH modifier is set without ILD-associated PH; this flag is applied only within the ILD branch.");
  }

  if (input.whoGroup === "2") {
    decision.alerts.push("Group 2 PH-LHD guardrail: routine PAH-targeted therapy is not recommended.");
    decision.actions.push("Prioritize optimization of left-heart disease and volume/hemodynamic management.");
    decision.actions.push("Refer to a PH center when diagnosis is uncertain or there is severe pre-capillary component/RV dysfunction.");
    decision.rationale.push("PH-LHD guidance emphasizes treating underlying left-heart disease and avoiding routine PAH-drug use in Group 2 PH.");
    return decision;
  }

  if (input.whoGroup === "3") {
    decision.actions.push("Optimize underlying lung disease, oxygenation, and supportive care first.");
    if (input.ildAssociated) {
      decision.actions.push("PH-ILD branch: inhaled treprostinil can be considered with specialist oversight.");
      decision.selectionTargets.push(
        buildSelectionTarget(
          "ild_targeted",
          "Optional targeted therapy for ILD-PH",
          "Select one inhaled prostacyclin option if pursuing targeted therapy.",
          ["treprostinil_inhaled", "treprostinil_dpi"],
          0,
          1
        )
      );
      if (input.severeIldPh) {
        decision.actions.push("Severe ILD-PH branch: PDE5 inhibitor may be considered in PH-center directed care.");
        decision.selectionTargets.push(
          buildSelectionTarget(
            "ild_pde5_optional",
            "Optional PDE5 inhibitor in severe ILD-PH",
            "Consider only in severe phenotype and PH-center supervision.",
            ["sildenafil", "tadalafil"],
            0,
            1
          )
        );
      }
    } else {
      decision.alerts.push("Most PAH-targeted drugs are not recommended in non-severe Group 3 PH.");
    }
    decision.rationale.push("Guidance supports selective use of inhaled treprostinil in PH-ILD and generally discourages broad PAH-drug use in non-severe Group 3 PH.");
    return decision;
  }

  if (input.whoGroup === "4") {
    decision.actions.push("Initiate/continue lifelong therapeutic anticoagulation unless contraindicated.");
    decision.actions.push("Ensure CTEPH team evaluation for operability (PEA) and BPA candidacy.");
    decision.actions.push("For inoperable or persistent/recurrent symptomatic PH after PEA, consider riociguat.");

    decision.selectionTargets.push(
      buildSelectionTarget(
        "cteph_anticoag",
        "CTEPH anticoagulation strategy",
        "Select one preferred anticoagulation pathway.",
        ["warfarin_cteph", "doac_cteph"],
        1,
        1
      )
    );

    decision.selectionTargets.push(
      buildSelectionTarget(
        "cteph_riociguat_optional",
        "Optional CTEPH-targeted therapy",
        "Riociguat option for inoperable/persistent disease after procedural assessment.",
        ["riociguat"],
        0,
        1
      )
    );

    decision.rationale.push("CTEPH escalation is interventional-first (PEA/BPA) plus lifelong anticoagulation, with riociguat in selected residual/inoperable disease.");
    return decision;
  }

  if (input.whoGroup === "5") {
    decision.actions.push("Focus treatment on the underlying multifactorial/associated disorder.");
    decision.actions.push("Use PH-center consultation for individualized decisions on targeted therapy.");
    decision.rationale.push("Group 5 has heterogeneous mechanisms and no broadly standardized PAH-targeted algorithm.");
    return decision;
  }

  if (input.whoGroup !== "1") {
    decision.alerts.push("Unknown WHO group selection; unable to map therapy path safely.");
    return decision;
  }

  const pathwayRiskLabel =
    risk.pathwayLabel !== "unknown"
      ? risk.pathwayLabel
      : (input.assessmentStage === "initial" ? "intermediate" : "intermediate_low");

  if (risk.pathwayLabel === "unknown") {
    decision.alerts.push("Using conservative fallback risk tier because score inputs are incomplete.");
  }

  decision.actions.push("Group 1 PAH pathway active. Treat-to-low-risk strategy applied.");

  if (input.vasoreactivityEligible && input.vasoreactivityPositive) {
    decision.actions.push("Positive vasoreactivity branch: consider high-dose CCB strategy with strict reassessment.");
    decision.selectionTargets.push(
      buildSelectionTarget(
        "vasoreactive_ccb",
        "Initial vasoreactivity-responder therapy",
        "Select a CCB pathway if pursuing responder strategy.",
        ["ccb_vasoreactive"],
        1,
        1
      )
    );
    decision.rationale.push("Continue CCB-only strategy only if durable responder criteria remain satisfied on follow-up.");
  }

  if (input.cardiopulmonaryComorbidities) {
    decision.actions.push("Comorbidity-heavy PAH phenotype: start with cautious oral monotherapy and individualize escalation.");
    decision.selectionTargets.push(
      buildSelectionTarget(
        "comorbidity_monotherapy",
        "Initial monotherapy choice",
        "Pick one ERA or one PDE5 inhibitor for cautious start.",
        ["bosentan", "ambrisentan", "macitentan", "sildenafil", "tadalafil"],
        1,
        1
      )
    );
    decision.rationale.push("Evidence is weaker in comorbidity-heavy phenotypes; monotherapy-first pathway is often preferred.");
    appendTransplantReferralRecommendation(decision, input, risk, pathwayRiskLabel);
    return decision;
  }

  if (input.assessmentStage === "initial") {
    if (pathwayRiskLabel === "high") {
      decision.actions.push("High baseline risk: use upfront combination including parenteral prostacyclin + ERA + PDE5 inhibitor.");
      decision.actions.push("Initiate early advanced-therapy planning with transplant center involvement.");
      decision.selectionTargets.push(
        buildSelectionTarget("initial_era", "ERA selection", "Select one ERA.", ["bosentan", "ambrisentan", "macitentan"], 1, 1),
        buildSelectionTarget("initial_pde5", "PDE5 inhibitor selection", "Select one PDE5 inhibitor.", ["sildenafil", "tadalafil"], 1, 1),
        buildSelectionTarget(
          "initial_parenteral",
          "Parenteral prostacyclin selection",
          "Select one continuous infusion strategy.",
          ["epoprostenol_iv", "treprostinil_sciv"],
          1,
          1
        ),
        buildSelectionTarget(
          "initial_sotatercept_optional",
          "Optional add-on pathway",
          "Sotatercept can be considered as an add-on per center practice and eligibility.",
          ["sotatercept"],
          0,
          1
        )
      );
    } else {
      decision.actions.push("Low/intermediate baseline risk: start foundational oral dual therapy (ERA + PDE5 inhibitor).");
      decision.selectionTargets.push(
        buildSelectionTarget("initial_era", "ERA selection", "Select one ERA.", ["bosentan", "ambrisentan", "macitentan"], 1, 1),
        buildSelectionTarget("initial_pde5", "PDE5 inhibitor selection", "Select one PDE5 inhibitor.", ["sildenafil", "tadalafil"], 1, 1)
      );
    }
    decision.rationale.push("Initial PAH regimen intensity is risk-stratified with dual oral therapy for low/intermediate risk and parenteral-inclusive strategy for high risk.");
    appendTransplantReferralRecommendation(decision, input, risk, pathwayRiskLabel);
    return decision;
  }

  if (pathwayRiskLabel === "low") {
    decision.actions.push("Low follow-up risk achieved: continue current regimen and reassess every 3-6 months.");
    decision.rationale.push("Therapeutic goal is maintenance of low-risk status.");
    appendTransplantReferralRecommendation(decision, input, risk, pathwayRiskLabel);
    return decision;
  }

  if (pathwayRiskLabel === "intermediate_low" || pathwayRiskLabel === "intermediate") {
    decision.actions.push("Intermediate-low follow-up risk: escalate add-on therapy and reassess within 3-6 months.");
    decision.actions.push("Options include adding selexipag/prostacyclin pathway agent and/or considering PDE5 inhibitor to riociguat switch.");
    decision.selectionTargets.push(
      buildSelectionTarget(
        "followup_addon_prostacyclin",
        "Optional prostacyclin pathway add-on",
        "Select one add-on pathway agent if escalating.",
        ["selexipag", "treprostinil_oral", "treprostinil_inhaled", "treprostinil_dpi", "iloprost"],
        0,
        1
      ),
      buildSelectionTarget(
        "followup_switch_riociguat",
        "Optional PDE5 to riociguat switch",
        "Select riociguat only as a switch strategy (not combined with PDE5 inhibitor).",
        ["riociguat"],
        0,
        1
      )
    );
    decision.rationale.push("Intermediate-low risk after foundational therapy should trigger additional pathway therapy or strategic switch.");
    appendTransplantReferralRecommendation(decision, input, risk, pathwayRiskLabel);
    return decision;
  }

  decision.actions.push("Intermediate-high/high follow-up risk: escalate to parenteral prostacyclin-centered regimen and refer to transplant center.");
  decision.selectionTargets.push(
    buildSelectionTarget("highrisk_era", "ERA selection", "Ensure one ERA is in the regimen.", ["bosentan", "ambrisentan", "macitentan"], 1, 1),
    buildSelectionTarget("highrisk_pde5", "PDE5 inhibitor selection", "Ensure one PDE5 inhibitor is in the regimen.", ["sildenafil", "tadalafil"], 1, 1),
    buildSelectionTarget(
      "highrisk_parenteral",
      "Parenteral prostacyclin selection",
      "Select one continuous infusion strategy.",
      ["epoprostenol_iv", "treprostinil_sciv"],
      1,
      1
    ),
    buildSelectionTarget(
      "highrisk_sotatercept_optional",
      "Optional additional pathway",
      "Sotatercept can be considered based on eligibility and center protocol.",
      ["sotatercept"],
      0,
      1
    )
  );
  decision.rationale.push("Failure to achieve low risk at higher strata should trigger aggressive escalation and advanced therapy referral.");
  appendTransplantReferralRecommendation(decision, input, risk, pathwayRiskLabel);
  return decision;
}

function countByClass(selectedDrugIds) {
  const counts = {};
  selectedDrugIds.forEach((id) => {
    const drug = DRUGS[id];
    if (!drug) return;
    counts[drug.classId] = (counts[drug.classId] || 0) + 1;
  });
  return counts;
}

function validateSelection(decision, input, selectedDrugIds) {
  const issues = [];
  const cautions = [];

  for (const target of decision.selectionTargets) {
    const selectedForTarget = target.drugIds.filter((id) => selectedDrugIds.includes(id));
    if (selectedForTarget.length < target.min) {
      issues.push(`Requirement not met for "${target.label}": select at least ${target.min}.`);
    }
    if (selectedForTarget.length > target.max) {
      issues.push(`Too many selections for "${target.label}": select no more than ${target.max}.`);
    }
  }

  const selectedClasses = new Set(
    selectedDrugIds
      .map((id) => {
        const drug = DRUGS[id];
        return drug ? drug.classId : null;
      })
      .filter(Boolean)
  );

  const hasRiociguat = selectedDrugIds.includes("riociguat");
  const hasPde5 = selectedClasses.has("pde5i");

  if (hasRiociguat && hasPde5) {
    issues.push("Contraindicated combination: riociguat must not be combined with a PDE5 inhibitor.");
  }

  if (input.onNitrates && (hasRiociguat || hasPde5)) {
    issues.push("Contraindicated context: nitrates/NO donors with PDE5 inhibitors or riociguat can cause severe hypotension.");
  }

  const hasEra = selectedClasses.has("era");
  if (input.pregnantOrTrying && (hasEra || hasRiociguat)) {
    issues.push("Pregnancy guardrail: avoid ERAs and riociguat in pregnancy/trying-to-conceive context.");
  }

  if (input.strongCyp2c8Inhibitor && selectedDrugIds.includes("selexipag")) {
    issues.push("Contraindicated interaction: selexipag with strong CYP2C8 inhibitor (for example gemfibrozil).");
  }

  if (input.onClopidogrel && selectedDrugIds.includes("selexipag")) {
    cautions.push("Interaction caution: clopidogrel with selexipag often requires once-daily dosing adjustment.");
  }

  if (selectedDrugIds.includes("sotatercept") && input.platelets !== null && input.platelets < 50) {
    issues.push("Sotatercept initiation rule: do not start if platelets are below 50 x10^3/uL (50,000/mm3).");
  }

  if (selectedDrugIds.includes("riociguat") && input.systolicBp !== null && input.systolicBp < 95) {
    issues.push("Riociguat initiation caution: low systolic BP (<95 mmHg) increases hypotension risk.");
  }

  if (selectedDrugIds.includes("treprostinil_oral") && input.hepaticImpairment === "severe") {
    issues.push("Oral treprostinil: severe hepatic impairment is a contraindication.");
  }

  if (selectedDrugIds.includes("ambrisentan") && (input.hepaticImpairment === "moderate" || input.hepaticImpairment === "severe")) {
    cautions.push("Ambrisentan is generally not recommended in moderate or severe hepatic impairment.");
  }

  const severeRenalContext = input.renalStatus === "severe" || (input.egfr !== null && input.egfr < 30);
  if (selectedDrugIds.includes("tadalafil") && severeRenalContext) {
    issues.push("Tadalafil: avoid in severe renal impairment.");
  }

  const classCounts = countByClass(selectedDrugIds);
  for (const [classId, count] of Object.entries(classCounts)) {
    if (count > 1 && ["era", "pde5i", "sgc", "ip_receptor"].includes(classId)) {
      cautions.push(`Multiple agents selected from ${CLASS_LABELS[classId]} class; verify intended strategy.`);
    }
  }

  return { issues, cautions };
}

function renderDecision(decision) {
  const summaryEl = document.getElementById("decision-summary");
  const alertsEl = document.getElementById("alerts");
  const actionsEl = document.getElementById("action-items");
  const rationaleEl = document.getElementById("recommendation-rationale");
  const selectorEl = document.getElementById("medication-selector");
  const validationEl = document.getElementById("regimen-validation");
  const detailsEl = document.getElementById("medication-details");

  const riskTableHtml = decision.riskTable && decision.riskTable.columns && decision.riskTable.rows && decision.riskTable.rows.length
    ? `
      <div class="risk-table-wrap">
        <table class="risk-table">
          <thead>
            <tr>
              ${decision.riskTable.columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${decision.riskTable.rows.map((row) => `
              <tr>
                ${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `
    : "";

  summaryEl.classList.remove("muted");
  summaryEl.innerHTML = `
    <div class="ok-card">
      <strong>Summary</strong>
      <ul>${decision.summary.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
      ${riskTableHtml}
    </div>
  `;

  if (decision.alerts.length) {
    alertsEl.innerHTML = decision.alerts
      .map((alert) => `<div class="alert-card"><strong>Guardrail:</strong> ${escapeHtml(alert)}</div>`)
      .join("");
  } else {
    alertsEl.innerHTML = `<div class="ok-card">No immediate high-risk guardrails triggered from entered inputs.</div>`;
  }

  actionsEl.innerHTML = `
    <strong>Recommended Actions</strong>
    <ol>${decision.actions.map((action) => `<li>${escapeHtml(action)}</li>`).join("")}</ol>
  `;

  rationaleEl.innerHTML = decision.rationale.length
    ? `<strong>Rationale</strong><ul>${decision.rationale.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
    : "";

  validationEl.innerHTML = "";
  detailsEl.innerHTML = "";

  if (!decision.selectionTargets.length) {
    selectorEl.innerHTML = "<strong>Medication Selection</strong><p>No medication selection required in this branch.</p>";
    return;
  }

  selectorEl.innerHTML = `
    <strong>Medication Selection</strong>
    <p>Select preferred medications where options exist, then validate the regimen.</p>
    <form id="med-select-form">
      <div class="reco-grid">
        ${decision.selectionTargets
          .map((target) => {
            const isSingleSelect = target.max === 1;
            return `
              <div class="selector-group">
                <h4>${escapeHtml(target.label)}</h4>
                <small>${escapeHtml(target.note)} (${target.min === 0 ? "optional" : `required minimum ${target.min}`})</small>
                ${target.drugIds
                  .map((drugId) => {
                    const drug = DRUGS[drugId];
                    if (!drug) return "";
                    return `
                      <label class="selector-option">
                        <input type="${isSingleSelect ? "radio" : "checkbox"}" name="target_${target.id}" value="${drug.id}" />
                        ${escapeHtml(drug.name)} <span class="muted">(${escapeHtml(CLASS_LABELS[drug.classId])})</span>
                      </label>
                    `;
                  })
                  .join("")}
              </div>
            `;
          })
          .join("")}
      </div>
      <button class="validate-btn" type="submit">Validate Regimen and Show Drug Details</button>
    </form>
  `;

  document.getElementById("med-select-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const checkedInputs = Array.prototype.slice.call(form.querySelectorAll("input:checked"));
    const selectedDrugIds = sortDrugIdsAlphabetically(checkedInputs.map((el) => el.value));
    const input = window.__CURRENT_INPUT;
    const validation = validateSelection(decision, input, selectedDrugIds);

    const validationCards = [];
    if (validation.issues.length) {
      validationCards.push.apply(
        validationCards,
        validation.issues.map((issue) => `<div class="alert-card"><strong>Contraindication/Hard Stop:</strong> ${escapeHtml(issue)}</div>`)
      );
    }
    if (validation.cautions.length) {
      validationCards.push.apply(
        validationCards,
        validation.cautions.map((caution) => `<div class="alert-card"><strong>Caution:</strong> ${escapeHtml(caution)}</div>`)
      );
    }
    if (!validation.issues.length && !validation.cautions.length) {
      validationCards.push(`<div class="ok-card">No high-risk conflicts detected from selected regimen and entered patient context.</div>`);
    }

    validationEl.innerHTML = `<strong>Regimen Validation</strong>${validationCards.join("")}`;

    if (!selectedDrugIds.length) {
      detailsEl.innerHTML = "<strong>Medication Details</strong><p>No medications selected.</p>";
      return;
    }

    detailsEl.innerHTML = `
      <strong>Medication Details</strong>
      ${selectedDrugIds
        .map((drugId) => {
          const d = DRUGS[drugId];
          return `
            <article class="drug-card">
              <h4>${escapeHtml(d.name)}</h4>
              <p class="detail-row"><strong>Class:</strong> ${escapeHtml(CLASS_LABELS[d.classId])}</p>
              <p class="detail-row"><strong>Route:</strong> ${escapeHtml(d.route)}</p>
              <p class="detail-row"><strong>Start dose:</strong> ${escapeHtml(d.startDose)}</p>
              <p class="detail-row"><strong>Goal/titration:</strong> ${escapeHtml(d.goalDose)}</p>
              <p class="detail-row"><strong>Monitoring:</strong> ${escapeHtml(d.monitoring)}</p>
              <p class="detail-row"><strong>Key interactions:</strong> ${escapeHtml(d.interactions)}</p>
              <p class="detail-row"><strong>Renal considerations:</strong> ${escapeHtml(d.renal)}</p>
              <p class="detail-row"><strong>Hepatic considerations:</strong> ${escapeHtml(d.hepatic)}</p>
              <p class="detail-row"><strong>Pregnancy considerations:</strong> ${escapeHtml(d.pregnancy)}</p>
            </article>
          `;
        })
        .join("")}
    `;
  });
}

function clearFormMessage(formMessage) {
  if (!formMessage) {
    return;
  }
  formMessage.classList.remove("show");
  formMessage.textContent = "";
}

function showFormMessage(formMessage, message) {
  if (!formMessage) {
    return;
  }
  formMessage.classList.add("show");
  formMessage.textContent = message;
  if (typeof formMessage.scrollIntoView === "function") {
    formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function handlePatientFormSubmit(form, formMessage) {
  clearFormMessage(formMessage);
  const input = parseInput(new FormData(form));
  window.__CURRENT_INPUT = input;
  const decision = buildDecision(input);
  renderDecision(decision);
}

function bindGlobalFormHandlers() {
  if (window.__PH_GLOBAL_FORM_HANDLERS_BOUND) {
    return;
  }
  window.__PH_GLOBAL_FORM_HANDLERS_BOUND = true;

  document.addEventListener("invalid", (event) => {
    const target = event.target;
    if (!target || !target.form || target.form.id !== "patient-form") {
      return;
    }
    const formMessage = document.getElementById("form-message");
    showFormMessage(formMessage, "Please complete required fields before generating recommendations.");
  }, true);

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!form || form.id !== "patient-form") {
      return;
    }
    event.preventDefault();
    const formMessage = document.getElementById("form-message");
    try {
      handlePatientFormSubmit(form, formMessage);
    } catch (error) {
      showFormMessage(
        formMessage,
        `Unable to generate recommendation: ${error instanceof Error ? error.message : "Unexpected error"}`
      );
      console.error(error);
    }
  }, true);
}

function init() {
  const form = document.getElementById("patient-form");
  const assessmentStageSelect = document.querySelector("select[name='assessmentStage']");
  const whoGroupSelect = document.querySelector("select[name='whoGroup']");
  const egfrInput = document.querySelector("input[name='egfr']");
  const renalStatusSelect = document.querySelector("select[name='renalStatus']");
  const riskScoreInputs = document.getElementById("risk-score-inputs");
  const riskModelSelect = document.getElementById("risk-model");
  const riskModelFields = Array.prototype.slice.call(document.querySelectorAll(".risk-model-field"));

  if (!form) {
    return false;
  }

  if (form.dataset.phBound === "1") {
    return true;
  }
  form.dataset.phBound = "1";

  const riskModelOptionsByStage = {
    initial: [
      { value: "reveal20_initial", label: "REVEAL 2.0" }
    ],
    follow_up: [
      { value: "reveal_lite2_followup", label: "REVEAL Lite 2" },
      { value: "compera20_followup", label: "COMPERA 2.0 4-Risk Strata" },
      { value: "french_noninvasive_followup", label: "French Noninvasive Criteria" }
    ]
  };

  const setRiskModelOptions = () => {
    if (!assessmentStageSelect || !riskModelSelect) {
      return;
    }
    const stage = assessmentStageSelect.value === "initial" ? "initial" : "follow_up";
    const options = riskModelOptionsByStage[stage];
    const current = riskModelSelect.value;
    riskModelSelect.innerHTML = options
      .map((option) => `<option value="${option.value}">${option.label}</option>`)
      .join("");
    const hasCurrent = options.some((option) => option.value === current);
    if (hasCurrent) {
      riskModelSelect.value = current;
    }
  };

  const updateRiskModelFieldVisibility = () => {
    if (!riskModelSelect) {
      return;
    }
    const selectedModel = riskModelSelect.value;
    riskModelFields.forEach((field) => {
      const models = (field.getAttribute("data-models") || "").split(",").map((entry) => entry.trim());
      const showField = models.includes(selectedModel);
      if (showField) {
        field.classList.remove("is-hidden");
      } else {
        field.classList.add("is-hidden");
      }
      const controls = field.querySelectorAll("input, select, textarea, button");
      for (let i = 0; i < controls.length; i += 1) {
        controls[i].disabled = !showField;
      }
    });
  };

  const updateRiskInputsVisibility = () => {
    if (!whoGroupSelect || !riskScoreInputs || !riskModelSelect) {
      return;
    }
    const show = whoGroupSelect.value === "1";
    if (show) {
      riskScoreInputs.classList.remove("is-hidden");
      setRiskModelOptions();
      riskModelSelect.disabled = false;
      updateRiskModelFieldVisibility();
    } else {
      riskScoreInputs.classList.add("is-hidden");
      const controls = riskScoreInputs.querySelectorAll("input, select, textarea, button");
      for (let i = 0; i < controls.length; i += 1) {
        controls[i].disabled = true;
      }
    }
  };

  const syncRenalStatusFromEgfr = () => {
    if (!egfrInput || !renalStatusSelect) {
      return;
    }
    const egfr = toNumber(egfrInput.value);
    const mappedStatus = getRenalStatusFromEgfr(egfr);
    if (!mappedStatus) {
      return;
    }
    renalStatusSelect.value = mappedStatus;
  };

  updateRiskInputsVisibility();
  syncRenalStatusFromEgfr();
  if (whoGroupSelect) {
    whoGroupSelect.addEventListener("change", updateRiskInputsVisibility);
  }
  if (assessmentStageSelect) {
    assessmentStageSelect.addEventListener("change", updateRiskInputsVisibility);
  }
  if (riskModelSelect) {
    riskModelSelect.addEventListener("change", updateRiskModelFieldVisibility);
  }
  if (egfrInput) {
    egfrInput.addEventListener("input", syncRenalStatusFromEgfr);
    egfrInput.addEventListener("change", syncRenalStatusFromEgfr);
  }

  return true;
}

function bootApp(attempt) {
  const currentAttempt = typeof attempt === "number" ? attempt : 0;
  bindGlobalFormHandlers();
  const form = document.getElementById("patient-form");
  if (window.__PH_APP_READY && form && form.dataset.phBound === "1") {
    return;
  }
  const initialized = init();
  if (initialized) {
    window.__PH_APP_READY = true;
    return;
  }
  if (currentAttempt < 200) {
    window.setTimeout(() => bootApp(currentAttempt + 1), 50);
    return;
  }
  const formMessage = document.getElementById("form-message");
  if (formMessage) {
    formMessage.classList.add("show");
    formMessage.textContent = "App initialization failed in this environment. In CodePen, set HTML/CSS/JS preprocessors to None and re-paste the latest panel code.";
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootApp);
} else {
  bootApp();
}
