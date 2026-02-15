const conditionsForm = document.querySelector('#conditions-form');
const gearForm = document.querySelector('#gear-form');
const logForm = document.querySelector('#log-form');
const conditionsResult = document.querySelector('#conditions-result');
const gearResult = document.querySelector('#gear-result');
const forecastList = document.querySelector('#forecast-list');
const tripList = document.querySelector('#trip-list');

const tripStorageKey = 'fishwise-trips';

function conditionScore(temp, wind, sky) {
  let score = 50;

  if (temp >= 58 && temp <= 75) score += 25;
  if (temp < 50 || temp > 85) score -= 15;

  if (wind >= 4 && wind <= 12) score += 15;
  if (wind > 20) score -= 20;

  if (sky === 'overcast' || sky === 'partly-cloudy') score += 10;
  if (sky === 'clear') score -= 5;
  if (sky === 'rain') score += 5;

  return Math.max(0, Math.min(100, score));
}

function biteCategory(score) {
  if (score >= 80) return '🔥 Excellent bite window';
  if (score >= 60) return '✅ Good conditions';
  if (score >= 40) return '⚠️ Fair — adjust lure depth and speed';
  return '🧊 Tough bite — fish structure slowly';
}

conditionsForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const location = document.querySelector('#location').value.trim();
  const temp = Number(document.querySelector('#waterTemp').value);
  const wind = Number(document.querySelector('#wind').value);
  const sky = document.querySelector('#sky').value;

  const score = conditionScore(temp, wind, sky);
  conditionsResult.textContent = `${location}: ${score}/100 — ${biteCategory(score)}`;
});

const gearMatrix = {
  bass: {
    dawn: 'Topwater popper, 12 lb mono, medium-heavy rod',
    day: 'Texas-rig worm near cover, 15 lb fluorocarbon',
    dusk: 'Spinnerbait along weed edges, 14 lb braid',
    night: 'Dark jig with slow retrieve, focus on structure'
  },
  trout: {
    dawn: 'Inline spinner in natural colors, 6 lb fluorocarbon',
    day: 'Small spoon in deeper runs, drift naturally',
    dusk: 'Dry fly or small crankbait near current seams',
    night: 'Suspending minnow bait, long pauses'
  },
  walleye: {
    dawn: 'Jig and minnow combo near drop-offs',
    day: 'Crawler harness on slow troll, 10 lb mono',
    dusk: 'Shallow-running crankbait on rocky flats',
    night: 'Slip-bobber with leech around points'
  },
  catfish: {
    dawn: 'Cut bait on circle hook near channel edges',
    day: 'Stink bait on bottom rig in deeper holes',
    dusk: 'Live bait around timber and current breaks',
    night: 'Heavy bottom rig, fish scent trails down-current'
  }
};

gearForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const species = document.querySelector('#species').value;
  const time = document.querySelector('#time').value;

  gearResult.textContent = gearMatrix[species][time];
});

function renderForecast() {
  const windows = [
    ['Early Morning', 'High activity near shallows'],
    ['Late Morning', 'Transition to mid-depth structure'],
    ['Afternoon', 'Slow bite; finesse presentations'],
    ['Sunset', 'Second major feeding window'],
    ['Night', 'Target structure and low-light edges']
  ];

  forecastList.innerHTML = windows
    .map(([window, tip]) => `<li><strong>${window}:</strong> ${tip}</li>`)
    .join('');
}

function loadTrips() {
  return JSON.parse(localStorage.getItem(tripStorageKey) || '[]');
}

function saveTrips(trips) {
  localStorage.setItem(tripStorageKey, JSON.stringify(trips));
}

function renderTrips() {
  const trips = loadTrips();

  if (!trips.length) {
    tripList.innerHTML = '<li>No trips logged yet — add one after your next outing.</li>';
    return;
  }

  tripList.innerHTML = trips
    .map(
      ({ tripDate, spot, caughtSpecies, lure }) =>
        `<li><strong>${tripDate}</strong> — ${spot}: Caught ${caughtSpecies} on ${lure}</li>`
    )
    .join('');
}

logForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const entry = {
    tripDate: document.querySelector('#tripDate').value,
    spot: document.querySelector('#spot').value.trim(),
    caughtSpecies: document.querySelector('#caughtSpecies').value.trim(),
    lure: document.querySelector('#lure').value.trim()
  };

  const trips = loadTrips();
  trips.unshift(entry);
  saveTrips(trips.slice(0, 12));

  logForm.reset();
  renderTrips();
});

renderForecast();
renderTrips();
