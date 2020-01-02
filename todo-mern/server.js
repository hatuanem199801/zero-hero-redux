const express = require("express");
const database = require("./config/database");
const app = express();
const morgan = require("morgan");

database();

app.use(express.json({ extended: false }));
app.use(morgan("dev"));

app.use("/api/todo", require("./routes/api/todo"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
