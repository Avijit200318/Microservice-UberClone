import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan('dev'));

app.get("/", (req, res) => {
    for(let i = 0; i < 1000000; i++){

    }
    res.send("Hello World");
})

app.listen(3002, () => {
    console.log("server is running at port 3002");
})