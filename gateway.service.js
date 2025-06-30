import express from "express";
import proxy from "express-http-proxy";

const app = express();

app.use('/stress-test', proxy("http://localhost:3002"));
// if some one want use /stress-text route then redirect them to this localhost route
app.use("/", proxy("http://localhost:3001"));

app.listen(3000, () => {
    console.log("gateway service running at port 3000");
})