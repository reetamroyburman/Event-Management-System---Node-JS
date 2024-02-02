const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");


dotenv.config("./.env");


const authRouter = require('./routes/authRouter');
const commentRouter = require('./routes/commentRouter');
const eventRouter = require('./routes/eventRouter');
const ticketRouter = require('./routes/ticketRouter');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


app.use("/auth", authRouter);
app.use("/comment", commentRouter);
app.use("/event", eventRouter);
app.use("/ticket", ticketRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
