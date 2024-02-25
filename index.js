const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route');
const dotenv = require('dotenv')
const cors = require('cors')

const app = express();
const PORT = 5000;

dotenv.config()
app.use(cors({
    credentials : true, origin : '*'
}))
app.use(express.json())
app.use(bodyParser.json());
app.use(route)


app.listen(PORT, () => {
    console.log(`server runing http://localhost:${PORT}`)
})