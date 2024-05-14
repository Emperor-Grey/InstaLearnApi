const express = require('express');
const cors = require('cors');
const pdfRoutes = require('./routes/pdfRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const {db} = require('./config/firebaseConfig');

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/pdf', pdfRoutes);
app.use('/api/user', userRoutes);
app.use('/api/payment', paymentRoutes);

// Firebase Firestore
db.settings({timestampsInSnapshots: true});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
