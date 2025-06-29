import autocannon from 'autocannon';

const urlBase = 'http://localhost:3000';

// Benchmark for the root URL
const instanceRoot = autocannon({
  url: urlBase,
  connections: 100, // Number of concurrent connections
  duration: 30,      // Test duration in seconds
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'GET',     // or POST, PUT, etc. depending on your API
  // body: JSON.stringify({ key: 'value' }) // Use if method is POST/PUT
}, (err, res) => {
  if (err) {
    console.error('Benchmark for root URL failed:', err);
  } else {
    console.log('Benchmark for root URL finished');
    // console.log(res); // Uncomment to see full results
  }
});

// Benchmark for the /stressTest URL
const instanceStressTest = autocannon({
  url: `${urlBase}/stressTest`, // Updated URL
  connections: 100,
  duration: 30,
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'GET',
}, (err, res) => {
  if (err) {
    console.error('Benchmark for /stressTest failed:', err);
  } else {
    console.log('Benchmark for /stressTest finished');
    // console.log(res); // Uncomment to see full results
  }
});

// Optionally, track progress in the terminal for both instances
autocannon.track(instanceRoot, { renderProgressBar: true, title: 'Root URL Benchmark' });
autocannon.track(instanceStressTest, { renderProgressBar: true, title: '/stressTest Benchmark' });