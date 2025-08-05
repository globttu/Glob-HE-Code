const iterations = 1e8;
const start = performance.now();

let total = 0;
for (let i = 0; i < iterations; i++) {
    total += Math.sqrt(i); // Heavy enough to test performance
}

const end = performance.now();
console.log(`Loop completed in ${(end - start).toFixed(2)} ms, total: ${total}`);
