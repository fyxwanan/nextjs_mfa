const speakeasy = require('speakeasy');

const secret = 'LZ5WS5CWIRNFKWS2KFEHA3RZJN4E2YSBII5DI5C5OJ2SCQ3MPAZQ';
const token = '509272';

console.log('--- Debug Info ---');
console.log('Server Time:', new Date().toISOString());
console.log('Secret:', secret);
console.log('Token provided:', token);

// Check what the token SHOULD be right now
const expectedToken = speakeasy.totp({
    secret: secret,
    encoding: 'base32'
});
console.log('Expected Token (now):', expectedToken);

// Check if it verifies with default window
const verifyResult = speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
    window: 2
});
console.log('Verify Result (window 2):', verifyResult);

// Check surrounding tokens to see if it's a time drift
console.log('\n--- Checking surrounding time windows ---');
for (let i = -5; i <= 5; i++) {
    const time = Date.now() / 1000 + (i * 30);
    const t = speakeasy.totp({
        secret: secret,
        encoding: 'base32',
        time: time
    });
    console.log(`Window ${i} (${i * 30}s): ${t} ${t === token ? '<-- MATCH' : ''}`);
}
