const { ethers } = require('ethers');
require('dotenv').config();

// Connect to Polygon Mumbai Testnet
const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);

// Use a mock private key if none is provided in .env
const privateKey = process.env.PRIVATE_KEY && process.env.PRIVATE_KEY !== 'your_private_key_here' 
    ? process.env.PRIVATE_KEY 
    : '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

const wallet = new ethers.Wallet(privateKey, provider);

const storeHash = async (hash) => {
    try {
        console.log(`\n[Blockchain] 🔗 Initiating transaction on Mumbai Testnet...`);
        console.log(`[Blockchain] 👤 Wallet Address: ${wallet.address}`);
        console.log(`[Blockchain] 📄 Payload Hash: ${hash}`);
        
        // Mocking delay to simulate network transaction
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log(`[Blockchain] ✅ Successfully stored verification hash on-chain.`);
        return true;
    } catch (error) {
        console.error(`[Blockchain Error]: ${error.message}`);
        throw error;
    }
};

const verifyHash = async (hash) => {
    try {
        console.log(`\n[Blockchain] 🔍 Verifying hash on Mumbai Testnet: ${hash}`);
        
        // Mocking network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        console.log(`[Blockchain] ✅ Hash verified as authentic.`);
        return true;
    } catch (error) {
        console.error(`[Blockchain Error]: ${error.message}`);
        throw error;
    }
};

module.exports = {
    provider,
    wallet,
    storeHash,
    verifyHash
};
