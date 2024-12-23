const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;


mongoose.connect('mongodb+srv://lokeshpamarthi022:Lokesh9989@cluster0.afn8pqp.mongodb.net/spareparts?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB - spareparts'))
  .catch((err) => console.error('MongoDB connection error:', err));

const bikeMarketConnection = mongoose.createConnection('mongodb+srv://lokeshpamarthi022:Lokesh9989@cluster0.afn8pqp.mongodb.net/bikeMarket?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const membershipDBConnection = mongoose.createConnection('mongodb+srv://lokeshpamarthi022:Lokesh9989@cluster0.afn8pqp.mongodb.net/membershipDB?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

bikeMarketConnection.on('connected', () => {
  console.log('Connected to MongoDB - bikeMarket');
});

membershipDBConnection.on('connected', () => {
  console.log('Connected to MongoDB - membershipDB');
});

bikeMarketConnection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

membershipDBConnection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});


const bikeSchema = new mongoose.Schema({
  bikeModel: String,
  companyName: String,
  price: String,
  imageUrl: String, 
});

const SparePartsBike = mongoose.model('SparePartsBike', bikeSchema);
const BikeMarketBike = bikeMarketConnection.model('BikeMarketBike', bikeSchema);


const membershipSchema = new mongoose.Schema({
  plan: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  rcNumber: { type: String },
  aadharNumber: { type: String },
  state: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Membership = membershipDBConnection.model('Membership', membershipSchema);


const sparePartsS3 = new S3Client({
  region: 'us-west-1',
  credentials: {
    accessKeyId: 'AKIAVFIWI5HRDEYL32MA',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const bikeMarketS3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'AKIAVFIWI5HRDEYL32MA',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


const upload = multer({ dest: 'uploads/' });


app.use(cors());
app.use(express.json());


app.post('/api/spareparts/bikes', upload.single('image'), async (req, res) => {
  try {
    const { bikeModel, companyName, price } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: 'Image file is required.' });
    }

    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
      Bucket: 'spare-parts',
      Key: `uploads/${Date.now()}_${file.originalname}`,
      Body: fileStream,
      ContentType: file.mimetype,
    };

    const result = await sparePartsS3.send(new PutObjectCommand(uploadParams));
    console.log('File uploaded to S3 (spare-parts):', result);

    fs.unlinkSync(file.path);

    const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
    const bike = new SparePartsBike({
      bikeModel,
      companyName,
      price,
      imageUrl,
    });
    await bike.save();

    res.status(201).json({ success: true, message: 'Bike uploaded successfully to spareparts.', bike });
  } catch (error) {
    console.error('Error uploading bike to spareparts:', error);
    res.status(500).json({ success: false, message: 'Error uploading bike to spareparts.', error });
  }
});


app.post('/api/bikemarket/bikes', upload.single('image'), async (req, res) => {
  try {
    const { bikeModel, companyName, price } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: 'Image file is required.' });
    }

    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
      Bucket: 'bike-profile',
      Key: `uploads/${Date.now()}_${file.originalname}`,
      Body: fileStream,
      ContentType: file.mimetype,
    };

    const result = await bikeMarketS3.send(new PutObjectCommand(uploadParams));
    console.log('File uploaded to S3 (bike-profile):', result);

    fs.unlinkSync(file.path);

    const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
    const bike = new BikeMarketBike({
      bikeModel,
      companyName,
      price,
      imageUrl,
    });
    await bike.save();

    res.status(201).json({ success: true, message: 'Bike uploaded successfully to bikeMarket.', bike });
  } catch (error) {
    console.error('Error uploading bike to bikeMarket:', error);
    res.status(500).json({ success: false, message: 'Error uploading bike to bikeMarket.', error });
  }
});


app.get('/api/spareparts/bikes', async (req, res) => {
  try {
    const bikes = await SparePartsBike.find();
    res.json(bikes);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching bikes from spareparts.', error: err });
  }
});


app.get('/api/bikemarket/bikes', async (req, res) => {
  try {
    const bikes = await BikeMarketBike.find();
    res.json(bikes);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching bikes from bikeMarket.', error: err });
  }
});


app.get("/", (req, res) => {
  res.send("Membership API is running!");
});

app.post("/subscribe", async (req, res) => {
  try {
    const membershipData = req.body;

    if (!membershipData.plan || !membershipData.name || !membershipData.email || !membershipData.phone || !membershipData.state || !membershipData.district || !membershipData.address) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const newMembership = new Membership(membershipData);
    await newMembership.save();

    res.status(201).json({ message: "Membership subscribed successfully!", data: newMembership });
  } catch (error) {
    console.error("Error saving membership:", error);
    res.status(500).json({ message: "Server Error: Unable to process request." });
  }
});

app.get("/memberships", async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.status(200).json(memberships);
  } catch (error) {
    console.error("Error fetching memberships:", error);
    res.status(500).json({ message: "Server Error: Unable to fetch memberships." });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
