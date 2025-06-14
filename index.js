const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });

const db_url = process.env.DB_URL;
const port = process.env.PORT || 2000;

mongoose.connect(db_url).then(() => {
    console.log('Database is connected Successfully !')
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}).catch((error) => {
    console.log('Error getting from Database!', error);
});
