// =======================
// DATA (as provided)
// =======================

const dateArray = [
  '24-Apr-2024',
  '02-May-2024',
  '09-May-2024',
  '31-May-2024',
  '21-Jun-2024'
];

const strategyArray = [
  {
    View: 'Bullish',
    Value: {
      '24-Apr-2024': [
        'Bull Call Spread',
        'Bull Put Spread',
        'Bull Put Spread',
        'Long Call',
        'Bull Put Spread',
        'Bull Call Spread',
        'Strategy1',
        'Bull Call Spread',
        'Strategy1',
        'SpreadStrategy',
        'Bull Call Spread'
      ],
      '02-May-2024': [
        'Bull Call Spread',
        'Bull Call Spread',
        'Bull Put Spread',
        'Long Call',
        'Long Call',
        'Bull Put Spread',
        'Bull Call Spread',
        'Strategy1',
        'Bull Call Spread',
        'Strategy2',
        'Strategy1',
        'Strategy2',
        'Bull Call Spread'
      ],
      '09-May-2024': [
        'Strategy Put',
        'Strategy Call',
        'Strategy Call',
        'Strategy Call',
        'Strategy Put'
      ]
    }
  },
  {
    View: 'Bearish',
    Value: {
      '24-Apr-2024': [
        'Bear Call Spread',
        'Bear Call Spread',
        'Bear Call Spread',
        'Long Put',
        'Long Put',
        'Bear Call Spread'
      ],
      '31-May-2024': [
        'Long Put',
        'Long Put',
        'Long Put',
        'Long Put',
        'Long Put'
      ],
      '21-Jun-2024': [
        'Strategy3',
        'Strategy3',
        'Bear Put Spread',
        'Strategy3',
        'Long Put',
        'Long Put'
      ]
    }
  },
  {
    View: 'Rangebound',
    Value: {
      '24-Apr-2024': [
        'Short Straddle',
        'Short Strangle',
        'Short Strangle',
        'Iron Butterfly',
        'Short Strangle',
        'Short Straddle',
        'Strategy1',
        'Short Straddle',
        'Strategy1',
        'SpreadStrategy',
        'Short Straddle'
      ],
      '02-May-2024': [
        'Short Straddle',
        'Short Straddle',
        'Short Strangle',
        'Iron Butterfly',
        'Iron Butterfly',
        'Short Strangle',
        'Short Straddle',
        'Strategy1',
        'Short Straddle',
        'Strategy2',
        'Strategy1',
        'Strategy2',
        'Short Straddle'
      ],
      '21-Jun-2024': [
        'Iron Condor',
        'Iron Butterfly',
        'Iron Butterfly',
        'Iron Butterfly',
        'Iron Condor'
      ]
    }
  },
  {
    View: 'Volatile',
    Value: {
      '02-May-2024': [
        'Long Straddle',
        'Long Strangle',
        'Long Strangle',
        'Long Strangle',
        'Long Straddle',
        'Strategy1',
        'Long Straddle',
        'Strategy1',
        'Strategy1',
        'SpreadStrategy',
        'Long Straddle'
      ],
      '09-May-2024': [
        'Long Straddle',
        'Long Straddle',
        'Long Strangle',
        'Long Strangle',
        'Long Straddle',
        'Strategy1',
        'Long Straddle',
        'Strategy2',
        'Strategy1',
        'Strategy2',
        'Long Straddle'
      ],
      '31-May-2024': [
        'Long Straddle',
        'Long Strangle',
        'Long Strangle',
        'Long Strangle',
        'Long Straddle'
      ]
    }
  }
];

// =======================
// STATE
// =======================

let selectedView = 'Bullish';
let selectedDate = dateArray[0];

// =======================
// DOM ELEMENTS
// =======================

const dateSelect = document.getElementById('dateSelect');
const cardsContainer = document.getElementById('cardsContainer');
const emptyState = document.getElementById('emptyState');
const tabs = document.querySelectorAll('.tab');

// =======================
// INIT
// =======================

// Populate dropdown
dateArray.forEach(date => {
  const option = document.createElement('option');
  option.value = date;
  option.textContent = date;
  dateSelect.appendChild(option);
});

dateSelect.value = selectedDate;

// =======================
// EVENT LISTENERS
// =======================

// Tab click
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    selectedView = tab.dataset.view;
    renderStrategies();
  });
});

// Date change
dateSelect.addEventListener('change', (e) => {
  selectedDate = e.target.value;
  renderStrategies();
});

// =======================
// CORE FUNCTION
// =======================

function renderStrategies() {
  cardsContainer.innerHTML = '';
  emptyState.classList.add('hidden');

  const viewData = strategyArray.find(item => item.View === selectedView);

  if (!viewData || !viewData.Value[selectedDate]) {
    showEmptyState();
    return;
  }

const strategies = viewData.Value[selectedDate];

// 🔹 FILTER OUT invalid strategy names
const validStrategies = strategies.filter(
  name => !name.startsWith('Strategy')
);

if (validStrategies.length === 0) {
  showEmptyState();
  return;
}

// Count ONLY valid strategies
const countMap = {};
validStrategies.forEach(name => {
  countMap[name] = (countMap[name] || 0) + 1;
});

// Render cards
Object.entries(countMap).forEach(([name, count]) => {
  const card = document.createElement('div');
  card.className = 'card';

  const label = count === 1 ? 'Strategy' : 'Strategies';

  card.innerHTML = `
    <span>${name}</span>
    <span>• ${count} ${label}</span>
  `;

  cardsContainer.appendChild(card);
});

}

function showEmptyState() {
  emptyState.textContent = `There are no strategies for ${selectedDate}`;
  emptyState.classList.remove('hidden');
}

// Initial render
renderStrategies();
