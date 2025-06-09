const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });

const db_url = process.env.DB_URL;

mongoose.connect(db_url).then(() => {
    console.log('Database is connected Successfully !')
}).catch((error) => {
    console.log('Error getting from Database!', error);
});

const port = process.env.PORT || 2000;

app.listen(port, () => {
    console.log(`server is running on port${port}...`);
})