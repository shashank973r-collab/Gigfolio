const mongoose = require('mongoose');
require('dotenv').config();

const Worker = require('./models/Worker');
const Verification = require('./models/Verification');
const Review = require('./models/Review');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding');

        // Clear existing data
        await Worker.deleteMany();
        await Verification.deleteMany();
        await Review.deleteMany();

        console.log('Existing data cleared. Seeding dummy workers...');

        const worker1 = new Worker({
            name: "Alice Johnson",
            email: "alice@trustwork.com",
            bio: "Experienced full-stack developer specializing in React and Node.js. Passionate about building decentralized applications.",
            skills: ["React", "Node.js", "MongoDB", "Express", "Web3"],
            hourlyRate: 50,
            portfolioItems: [
                { title: "DeFi Dashboard", description: "Built a fully functional real-time dashboard", link: "https://example.com/defi" },
                { title: "E-commerce App", description: "Scalable marketplace backend", link: "https://example.com/store" }
            ],
            blockchainIdentity: "0xAlice123MockIdentity"
        });

        const worker2 = new Worker({
            name: "Bob Smith",
            email: "bob@trustwork.com",
            bio: "Expert UI/UX designer with 5+ years of experience crafting premium digital experiences.",
            skills: ["Figma", "UI/UX", "Tailwind CSS", "Framer Motion"],
            hourlyRate: 65,
            portfolioItems: [
                { title: "Fintech Redesign", description: "Redesigned mobile app for a major bank", link: "https://example.com/fintech" }
            ]
        });

        const savedWorker1 = await worker1.save();
        const savedWorker2 = await worker2.save();

        console.log('Workers seeded. Seeding verifications and reviews...');

        const verify1 = new Verification({
            workerId: savedWorker1._id,
            status: "VERIFIED",
            identityCheck: true,
            criminalRecordClear: true,
            blockchainHash: "0x123abc456mockhash789",
            verifiedAt: new Date()
        });

        const review1 = new Review({
            workerId: savedWorker1._id,
            reviewerName: "Crypto Startup Inc",
            rating: 5,
            comment: "Alice was fantastic! Delivered the smart contracts on time and with high quality."
        });

        const review2 = new Review({
            workerId: savedWorker2._id,
            reviewerName: "Design Agency",
            rating: 4,
            comment: "Great eye for detail, though missed one deadline."
        });

        await verify1.save();
        await review1.save();
        await review2.save();

        console.log('Dummy data seeded successfully! You can now test the API.');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
