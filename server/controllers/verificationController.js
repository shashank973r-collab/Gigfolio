const Verification = require('../models/Verification');
const crypto = require('crypto');

exports.getStatus = async (req, res) => {
  try {
    let verification = await Verification.findOne({ workerId: req.user.userId });
    if (!verification) {
      verification = {
        workerId: req.user.userId,
        workerUsername: req.user.username,
        aadhaar: { status: 'pending', number: '', name: '' },
        drivingLicense: { status: 'pending', number: '' },
        policeVerification: { status: 'pending', reportNumber: '' },
        overallStatus: 'unverified',
        blockchainHash: ''
      };
    }
    res.json(verification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const checkOverallStatus = (verification) => {
  if (verification.aadhaar.status === 'verified' && verification.drivingLicense.status === 'verified' && verification.policeVerification.status === 'clear') {
    verification.overallStatus = 'verified';
    if (!verification.blockchainHash) {
      verification.blockchainHash = '0x' + crypto.createHash('sha256')
        .update(verification.workerId.toString() + verification.aadhaar.number + Date.now())
        .digest('hex').substring(0, 40);
    }
  } else if (verification.aadhaar.status === 'verified' || verification.drivingLicense.status === 'verified' || verification.policeVerification.status === 'clear') {
    verification.overallStatus = 'partial';
  } else {
    verification.overallStatus = 'unverified';
  }
};

exports.verifyAadhaar = async (req, res) => {
  try {
    const { aadhaarNumber, fullName } = req.body;
    if (!aadhaarNumber || aadhaarNumber.length !== 12) {
      return res.status(400).json({ message: 'Invalid Aadhaar number' });
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    let status = 'verified';
    if (aadhaarNumber.startsWith('9')) {
      status = 'failed';
    }

    let verification = await Verification.findOne({ workerId: req.user.userId });
    if (!verification) {
      verification = new Verification({ workerId: req.user.userId, workerUsername: req.user.username });
    }

    verification.aadhaar = {
      status,
      number: status === 'verified' ? aadhaarNumber.slice(-4) : '',
      name: status === 'verified' ? fullName : '',
      verifiedAt: status === 'verified' ? new Date() : null
    };

    checkOverallStatus(verification);
    await verification.save();

    if (status === 'failed') {
      return res.status(400).json({ message: 'Aadhaar verification failed', verification });
    }

    res.json(verification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.verifyLicense = async (req, res) => {
  try {
    const { licenseNumber } = req.body;
    if (!licenseNumber || licenseNumber.length < 8) {
      return res.status(400).json({ message: 'Invalid License number' });
    }

    await new Promise(resolve => setTimeout(resolve, 1500));

    let status = 'verified';
    if (licenseNumber.startsWith('X')) {
      status = 'failed';
    }

    let verification = await Verification.findOne({ workerId: req.user.userId });
    if (!verification) {
      verification = new Verification({ workerId: req.user.userId, workerUsername: req.user.username });
    }

    verification.drivingLicense = {
      status,
      number: status === 'verified' ? licenseNumber : '',
      verifiedAt: status === 'verified' ? new Date() : null
    };

    checkOverallStatus(verification);
    await verification.save();

    if (status === 'failed') {
      return res.status(400).json({ message: 'License verification failed', verification });
    }

    res.json(verification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.verifyPolice = async (req, res) => {
  try {
    const { reportNumber } = req.body;
    
    await new Promise(resolve => setTimeout(resolve, 3000));

    let status = 'clear';
    let generatedReportNumber = reportNumber || '';
    if (generatedReportNumber.startsWith('F')) {
      status = 'flagged';
    } else {
      generatedReportNumber = 'PCR-2024-' + Math.floor(Math.random()*10000);
    }

    let verification = await Verification.findOne({ workerId: req.user.userId });
    if (!verification) {
      verification = new Verification({ workerId: req.user.userId, workerUsername: req.user.username });
    }

    verification.policeVerification = {
      status,
      reportNumber: status === 'clear' ? generatedReportNumber : '',
      verifiedAt: status === 'clear' ? new Date() : null
    };

    checkOverallStatus(verification);
    await verification.save();

    if (status === 'flagged') {
      return res.status(400).json({ message: 'Record found - manual review required', verification });
    }

    res.json(verification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
