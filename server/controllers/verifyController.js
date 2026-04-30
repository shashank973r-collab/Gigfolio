const Verification = require('../models/Verification');
const { storeHash, verifyHash } = require('../utils/blockchain');

const requestVerification = async (req, res) => {
    try {
        const { workerId, identityCheck, criminalRecordClear } = req.body;
        
        let verification = await Verification.findOne({ workerId });
        if (verification) {
            return res.status(400).json({ message: 'Verification already requested or exists' });
        }

        // Mock verification logic
        const status = (identityCheck && criminalRecordClear) ? 'VERIFIED' : 'REJECTED';
        const blockchainHash = `0x${Math.random().toString(16).slice(2, 42)}mockhash`;
        
        // Store hash on blockchain
        if (status === 'VERIFIED') {
            await storeHash(blockchainHash);
        }

        verification = new Verification({
            workerId,
            status,
            identityCheck,
            criminalRecordClear,
            blockchainHash,
            verifiedAt: status === 'VERIFIED' ? new Date() : null
        });

        await verification.save();
        res.status(201).json(verification);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getVerificationStatus = async (req, res) => {
    try {
        const verification = await Verification.findOne({ workerId: req.params.workerId });
        if (!verification) return res.status(404).json({ message: 'Verification record not found' });

        let isHashValid = false;
        if (verification.blockchainHash) {
            isHashValid = await verifyHash(verification.blockchainHash);
        }

        res.json({ verification, isHashValid });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { requestVerification, getVerificationStatus };
