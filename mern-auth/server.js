const express = require("express");
const app = express();
const morgan = require("morgan");
const User = require("./models/user");
const auth = require("./middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const connectDB = require("./config/db");

connectDB();
app.use(morgan("dev"));
app.use(express.json({ extended: false }));

//get user
app.get("/api/auth", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-_id -password -__v");
    if (!user) {
      return res.status(404).json({ msg: "User is not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

//login
app.post("/api/auth", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User is exists" });
    }
    const isMatchPassword = await bcrypt.compareSync(password, user.password);
    if (!isMatchPassword) {
      return res.status(400).json({ msg: "Invalid credential" });
    }
    let payload = {
      user: {
        id: user.id,
        fullName: user.fullName
      }
    };

    jwt.sign(
      payload,
      config.get("jwt"),
      {
        expiresIn: "2d"
      },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

//register
app.post("/api/user", async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User is exists" });
    }
    user = new User({
      email,
      fullName
    });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    user.password = hashPassword;
    await user.save();
    let payload = {
      user: {
        id: user.id,
        fullName: user.fullName
      }
    };

    jwt.sign(
      payload,
      config.get("jwt"),
      {
        expiresIn: "2d"
      },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
