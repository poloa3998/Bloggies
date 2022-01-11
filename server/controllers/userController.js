const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

const issueJWT = (user) => {
  const _id = user._id;
  const expiresIn = 60 * 60;

  const payload = {
    sub: _id,
    iat: Date.now(),
  };
  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });
  return {
    token: signedToken,
    expires: expiresIn,
  };
};

const issueRefreshJWT = (user) => {
  const _id = user._id;
  const expiresIn = 60 * 60;

  const payload = {
    sub: _id,
    iat: Date.now(),
  };
  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });
  return {
    token: signedToken,
    expires: expiresIn,
  };
};
const refreshToken = (req, res) => {
  const refreshToken = req.body.token;
  if (!token) {
    return res.status(401).json("You're not authenticated");
  }
};
const getUsers = async (req, res) => {
  User.find({}, { password: 0 }).exec((error, users) => {
    if (error) {
      res.status(500).json(error);
    }
    console.log(users);
    res.status(200).json({ users });
  });
};

const getUser = async (req, res) => {
  User.findById(req.params.id, (error, user) => {
    if (error) {
      res.json(error);
    }
    res
      .status(200)
      .json({ id: user._id, username: user.username, email: user.email });
  });
};
const registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    newUser.save();
    const jwt = issueJWT(newUser);
    const refreshToken = issueRefreshJWT(newUser);
    await User.findOneAndUpdate({ refreshToken: refreshToken });

    res.status(200).json({
      success: true,
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token: jwt.token,
      refreshToken: refreshToken.token,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//login endpoint
const login = async (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        res.status(401).json({ success: false, msg: "Could not find user" });
      }
      bcrypt.compare(req.body.password, user.password, (err, valid) => {
        if (valid) {
          // passwords match! log user in
          const tokenObject = issueJWT(user);
          const refreshToken = issueRefreshJWT(user);
          User.findOneAndUpdate({ refreshToken: refreshToken });

          res.status(200).json({
            success: true,
            id: user._id,
            username: user.username,
            email: user.email,
            token: tokenObject.token,
            refreshToken: refreshToken.token,
          });
        } else {
          // passwords do not match!
          res
            .status(401)
            .json({ success: false, msg: "You entered the wrong password" });
        }
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.registerUser = registerUser;
exports.login = login;
