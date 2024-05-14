const {db, bucket} = require('../config/firebaseConfig')

const uploadPDF = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({message: 'No file uploaded'});
        }

        const {title, description, uploaderName} = req.body;
        const file = req.file;
        const fileName = `${Date.now()}-${file.originalname}`;

        const fileUpload = bucket.file(fileName);
        const fileStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        fileStream.on('error', (err) => {
            console.error(err);
            res.status(500).send({message: 'Error uploading file'});
        });

        fileStream.on('finish', async () => {
            await fileUpload.makePublic();
            const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`

            // Save metadata to Firestore
            await db.collection('pdfs').add({
                title, description, uploaderName, fileUrl,
            });

            res.status(200).send({message: 'File uploaded successfully', fileUrl});
        });

        fileStream.end(file.buffer);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Server error'});
    }
};

const getAllPDFs = async (req, res) => {
    try {
        const snapshot = await db.collection('pdfs').get();
        const pdfs = [];
        snapshot.forEach((doc) => {
            pdfs.push(doc.data());
        });
        res.status(200).send(pdfs);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Server error'});
    }

};

module.exports = {uploadPDF, getAllPDFs};
