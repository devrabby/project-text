document.getElementById('checkBtn').addEventListener('click', () => {
  const imei = document.getElementById('imeiInput').value.trim();
  const result = document.getElementById('result');

  if (!/^\d{15}$/.test(imei)) {
    result.style.color = 'red';
    result.textContent = '❌ Invalid IMEI — must be exactly 15 digits.';
    return;
  }

  result.style.color = 'blue';
  result.textContent = '⏳ Checking...';

  fetch('https://api.imeicheck.net/checks', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer zGrC7TRYpQkoWuPJPZt0I4oftF11yiWtYFLEyMoxb2fc2798',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ serviceId: 1, deviceId: imei }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 1) {
        result.style.color = 'green';
        result.textContent = `✅ Device: ${data.response?.Model ?? 'Info unavailable (demo)'}`
      } else {
        result.style.color = 'orange';
        result.textContent = `⚠️ API error: ${data.message ?? 'Unknown error'}`;
      }
    })
    .catch(err => {
      result.style.color = 'red';
      result.textContent = `❌ Network error: ${err.message}`;
    });
});
