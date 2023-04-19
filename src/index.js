import express from "express";
import cors from "cors";
import path from "path";
import setupRoutes from "./routes";

const app = express();
const routes = express.Router();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use("/posts", routes);
setupRoutes(routes);

const public_path = path.join(__dirname, "../build")
app.use(express.static(public_path))
app.get("*", (_, res) => {
    res.sendFile(path.join(public_path, "index.html"))
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
