# Pulmonary Hypertension Therapy Decision Tool Design

## Goal
Create a clinician-facing decision support tool that helps determine when to initiate and/or escalate adult pulmonary hypertension therapy, while preserving clinician choice among recommended medication options and surfacing safety-critical guardrails.

## Source Basis
Design logic is derived from the two local Word documents in this folder:
- `Designing a Clinical Decision Algorithm for Starting and Escalating Therapy in Adult Pulmonary Hyper.docx`
- `Medication Initiation and Monitoring Considerations for Adult Pulmonary Hypertension Therapies.docx`

## Clinical Workflow Embedded in the Tool
1. Collect core patient inputs.
2. Compute hemodynamic phenotype from mPAP/PAWP/PVR.
3. Compute risk category using available score components.
4. Route by WHO group (1-5) with group-specific guardrails.
5. Generate therapy actions (initiate/escalate/avoid/center referral), including diuresis/decongestion recommendations when congestion or right-heart-failure context is present.
6. Present selectable medication options where multiple valid choices exist.
7. Validate selected regimen for contraindicated combinations and context-specific hard stops.
8. Display structured medication details (dose, route, goal, monitoring, interactions, renal/hepatic and pregnancy considerations).

## Required Inputs
- Assessment moment: initial vs follow-up
- WHO group
- Hemodynamics: mPAP, PAWP, PVR
- WHO functional class
- 6MWD
- BNP and/or NT-proBNP
- Systolic BP
- Platelets
- Additional optional risk variables for REVEAL 2.0:
  - age/sex
  - heart rate
  - eGFR
  - PAH subgroup
  - recent hospitalization
  - pericardial effusion
  - DLCO
  - mRAP
- Flags:
  - cardiopulmonary comorbidity phenotype
  - vasoreactivity testing indicated and result
  - ILD-associated PH and severe ILD-PH
  - right-heart-failure signs and volume overload/congestion
  - pregnant/trying to conceive
  - nitrates/NO donors
  - strong CYP2C8 inhibitor
  - clopidogrel
- Hepatic impairment status
- Renal status

## Score and Phenotype Computation
### Hemodynamic phenotype
- No PH: mPAP <= 20
- Pre-capillary PH: mPAP > 20, PAWP <= 15, PVR > 2
- Isolated post-capillary PH: mPAP > 20, PAWP > 15, PVR <= 2
- Combined post/pre-capillary PH: mPAP > 20, PAWP > 15, PVR > 2
- Unclassified elevated mPAP pattern: mPAP > 20, PAWP <= 15, PVR <= 2

### Risk logic
- WHO Group 1 initial decision supports REVEAL 2.0 scoring.
- WHO Group 1 follow-up decision supports:
  - REVEAL Lite 2
  - COMPERA 2.0 4-risk strata
  - French noninvasive criteria
- Risk tiering is derived from the selected model and flagged when variable coverage is limited.

## Recommendation Logic
### WHO Group 1 (PAH)
- Low/intermediate initial risk: recommend ERA + PDE5 inhibitor dual therapy.
- High initial risk: recommend parenteral prostacyclin + ERA + PDE5 inhibitor and early advanced-therapy planning.
- Follow-up intermediate-low: recommend escalation with add-on prostacyclin-pathway agent and/or PDE5i to riociguat switch strategy.
- Follow-up intermediate-high/high: recommend parenteral prostacyclin-centered escalation and transplant evaluation.
- Recommend transplant-center referral when indicated by higher-risk profiles (for example intermediate-high/high trajectories or elevated REVEAL score).
- Vasoreactivity responders: CCB branch with strict durable-response reassessment.
- Comorbidity-heavy phenotype: cautious monotherapy-first approach.

### WHO Group 2 (PH-LHD)
- Guardrail against routine PAH-targeted therapy.
- Route to optimization of left-heart disease and selective PH-center referral.

### WHO Group 3 (Lung disease/hypoxia)
- Optimize underlying lung disease first.
- ILD-PH branch allows inhaled treprostinil consideration.
- Severe ILD-PH branch allows PH-center PDE5 inhibitor consideration.

### WHO Group 4 (CTEPH)
- Lifelong anticoagulation pathway required.
- Interventional pathway (PEA/BPA) via CTEPH team.
- Riociguat option for inoperable/persistent/recurrent symptomatic disease after procedural evaluation.

### WHO Group 5
- Treat underlying cause with individualized specialist decisions.

## Medication Selection UX
- Recommendations are presented as one or more selection targets.
- Each target has:
  - allowed medication options
  - minimum required selections
  - maximum allowed selections
  - optional vs required designation
- This supports clinician preference for single-agent choice or combination strategy where appropriate.

## Safety Engine and Combination Rules
Hard-stop checks implemented:
- riociguat + PDE5 inhibitor
- nitrates/NO donors with PDE5 inhibitor or riociguat
- pregnancy context with ERA or riociguat
- strong CYP2C8 inhibitor with selexipag
- platelets <50,000 with sotatercept initiation
- severe hepatic impairment with oral treprostinil
- severe renal impairment with tadalafil

Caution checks implemented:
- clopidogrel with selexipag (dose-frequency considerations)
- moderate/severe hepatic impairment with ambrisentan
- multiple same-class selections where usually one agent per class is intended

## Medication Information Model
Each medication card includes:
- class
- route
- starting dose
- goal/titration target
- key initiation monitoring
- major interactions/contraindications
- renal considerations
- hepatic considerations
- pregnancy considerations

## Current Prototype Files
- `index.html`: clinician input + recommendation + medication selection interface
- `styles.css`: responsive visual design and result presentation styles
- `app.js`: decision engine, risk scoring, safety checks, medication knowledge base

## Intended Next Enhancements
1. Add structured storage for current regimen and explicit switch logic (for example PDE5i -> riociguat washout timer).
2. Add mandatory missing-data prompts for high-stakes fields before allowing a final recommendation.
3. Export summary as note text for EHR copy-forward.
4. Add versioned guideline metadata and source links in the UI.
5. Add unit tests for decision branches and interaction rules.
