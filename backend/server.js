import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = 'mongodb+srv://amanwhoooo:VuKVdMuGEHjQRmOG@cluster0.vygshnz.mongodb.net/checkMate';

mongoose.connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

const DocumentSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    type: { type: String, required: true },
    hash: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    verificationDate: { type: Date, default: null },
    status: { type: String, enum: ['Pending', 'Verified'], default: 'Pending' }
});

const Document = mongoose.model('Document', DocumentSchema);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint to store documents
app.post('/api/storeDocument', async (req, res) => {
    const { userID, type, hash, status } = req.body;
    
    try {
        const newDocument = new Document({ userID, type, hash, status: status || 'Pending' });
        await newDocument.save();
        res.status(201).json({ message: "Document stored successfully" });
    } catch (error) {
        console.error("Error storing document:", error);
        res.status(500).json({ error: "Failed to store document" });
    }
});

// Endpoint to fetch documents
app.get('/api/getDocuments', async (req, res) => {
    try {
        const documents = await Document.find();
        res.status(200).json(documents);
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({ error: "Failed to fetch documents" });
    }
});

// Start the server
const PORT = process.env.VITE_SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
