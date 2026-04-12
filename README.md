# PH Therapy Navigator Prototype

A local, static prototype for clinician decision support on adult pulmonary hypertension therapy initiation/escalation.

## What it does
- Collects key patient inputs from hemodynamics, risk variables, and safety context.
- Computes:
  - hemodynamic phenotype from mPAP/PAWP/PVR
  - REVEAL 2.0 score for initial WHO Group 1 assessment
  - Follow-up WHO Group 1 risk via REVEAL Lite 2, COMPERA 2.0 4-risk strata, or French noninvasive criteria
- Applies WHO-group-specific recommendation logic.
- Adds decongestion/diuresis recommendations when congestion/right-heart-failure context is entered.
- Lets clinician select preferred medication options when multiple options are valid.
- Validates selected regimen for high-risk combinations and key contraindications.
- Displays medication-level details (dose, route, titration, monitoring, interactions, renal/hepatic/pregnancy considerations).

## Files
- `index.html`
- `styles.css`
- `app.js`
- `PH_TOOL_DESIGN.md`

## Run locally
Open `index.html` in a browser.

## Mobile reliability note
- Some phone file-preview browsers block or partially run local JavaScript.
- If mobile tap actions do not respond, host the folder on a simple web server and open via `http://`/`https://` instead of direct file preview.

## Important
This is a prototype decision support tool, not an autonomous prescribing system.
Final treatment decisions must use current label/guideline sources, local protocols, and specialist clinical judgment.
