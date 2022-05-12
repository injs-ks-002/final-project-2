const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const userRouter = require('./routes/user.js');
const photoRouter = require('./routes/photo');

app.use(express.json())

app.use("/users", userRouter);
app.use("/photo", photoRouter);


app.listen(3000, function () {
    console.log('Contoh server berjalan di port 3000!')
})