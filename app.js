const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const userRouter = require('./routes/user.js');

app.use(express.json())

app.use("/users", userRouter);


app.listen(3000, function () {
    console.log('Contoh server berjalan di port 3000!')
})