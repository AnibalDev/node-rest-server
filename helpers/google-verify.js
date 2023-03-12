const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleVerify() {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,  
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
}

googleVerify().catch(console.error);

module.exports = {
    googleVerify
}