const jwt = require('jsonwebtoken');

async function test() {
  try {
    const token = jwt.sign(
      { userId: "65e23b2c1234567890abcdef", username: "sha" },
      "supersecretjwt",
      { expiresIn: '7d' }
    );

    const res = await fetch('http://localhost:5000/api/jobs/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        jobTitle: "fan installation",
        clientName: "srijan",
        jobDate: "2026-11-03",
        amount: "2500",
        description: "nicee work"
      })
    });
    const data = await res.text();
    console.log(res.status, res.headers);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
test();
