import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.VITE_MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

// Create a schema and model for document storage
const DocumentSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    docType: { type: String, required: true },
    ipfsHash: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Document = mongoose.model('Document', DocumentSchema);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint to store document data
app.post('/api/storeDocument', async (req, res) => {
    const { userID, docType, ipfsHash } = req.body;
    
    try {
        const newDocument = new Document({ userID, docType, ipfsHash });
        await newDocument.save();
        res.status(201).json({ message: "Document stored successfully" });
    } catch (error) {
        console.error("Error storing document:", error);
        res.status(500).json({ error: "Failed to store document" });
    }
});

// Start the server
const PORT = process.env.VITE_SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));