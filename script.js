const FINNHUB_API_KEY = "YOUR_FINNHUB_API_KEY"; // Replace with real API key

let alertsData = [];

function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
}

function filterAlerts() {
  const query = document.getElementById('search').value.toLowerCase();
  const filtered = alertsData.filter(alert => alert.headline.toLowerCase().includes(query));
  renderAlerts(filtered);
}

function renderAlerts(alerts) {
  const container = document.getElementById('alerts-list');
  container.innerHTML = '';
  if (!alerts.length) {
    container.textContent = 'No alerts found.';
    return;
  }
  alerts.forEach(alert => {
    const div = document.createElement('div');
    div.innerHTML = \`<a href="\${alert.url}" target="_blank">🔔 \${alert.headline}</a><p>\${alert.summary.slice(0, 100)}...</p>\`;
    container.appendChild(div);
  });
}

async function loadAlerts() {
  try {
    const res = await fetch(\`https://finnhub.io/api/v1/news?category=general&token=\${FINNHUB_API_KEY}\`);
    const data = await res.json();
    alertsData = data.slice(0, 10);
    renderAlerts(alertsData);
  } catch (e) {
    document.getElementById('alerts-list').textContent = 'Failed to load alerts.';
  }
}

async function getAISummary() {
  const input = document.getElementById('aiInput').value;
  const output = document.getElementById('aiOutput');
  output.textContent = 'Loading...';

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a financial analyst AI.' },
        { role: 'user', content: input }
      ]
    })
  });

  const data = await res.json();
  output.textContent = data.choices?.[0]?.message?.content || 'No response.';
}

function downloadSummary() {
  const text = document.getElementById('aiOutput').textContent;
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'ai_summary.txt';
  a.click();
}

loadAlerts();
