# FishWise

FishWise is a lightweight single-page web app for fishermen to:

- assess current fishing conditions,
- get quick gear recommendations by species and time of day,
- view bite-window strategy tips,
- track successful trips in a local trip log.

## Requirements

- Python 3 (for the local static file server)
- A modern browser (Chrome, Firefox, Safari, Edge)

## Run locally

From the project root:

```bash
python3 -m http.server 8000 --bind 0.0.0.0
```

Then open:

- <http://localhost:8000>
- or <http://127.0.0.1:8000>

## How to check the app works

### 1) Conditions analyzer
1. Enter a location (for example: `Lake Fork`).
2. Enter a water temperature (for example: `68`).
3. Enter a wind speed (for example: `7`).
4. Choose a sky condition.
5. Click **Analyze Conditions**.

Expected result: a score out of 100 and a bite-quality message appears under the form.

### 2) Gear recommender
1. Choose a species.
2. Choose a time of day.
3. Click **Get Tackle Tips**.

Expected result: recommended lure/tackle text appears under the form.

### 3) Bite forecast
Expected result: the forecast card auto-loads with multiple time windows (early morning, late morning, afternoon, sunset, night).

### 4) Trip log persistence
1. Fill the date, spot, species caught, and lure/bait.
2. Click **Save Trip**.
3. Refresh the page.

Expected result: your saved trip is still listed after refresh (stored in `localStorage`).

## Quick command-line checks

```bash
# JavaScript syntax check
node --check app.js

# HTTP availability check (while server is running)
curl -I http://127.0.0.1:8000/index.html
```

Expected `curl` output includes `HTTP/1.0 200 OK`.
