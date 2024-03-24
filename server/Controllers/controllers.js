const User = require("../Models/AdminSchema.js");
const clubMember = require("../Models/user-model.js");
const Admin = require("../Models/admin-model.js");
const cQ = require("../Models/custom-question-model.js");
const mongoose = require("mongoose");
const { hashPwd, comparePwd } = require("../helpers/auth.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv");
const cookies = require("cookies");
const test = (req, res) => {
  res.json({ error: true });
  /* res.redirect(301, "http://localhost:3000");*/
};

require("dotenv").config();

const firstTimeQ = async (req, res) => {
  try {
    // console.log(req);
    console.log(req.query);
    // rename req.body information sent by user
    const UID = req.query.UID;
    const { name, major, gradDate } = req.query.data;
    console.log(name);
    console.log(major);
    console.log(gradDate);
    const clubName = req.query.clubName;
    console.log(req.query.clubName);

    // three if statements check if form fields are entered
    // toast picks up error body and displays as notification
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    if (!major) {
      return res.json({
        error: "major is required",
      });
    }
    if (!gradDate) {
      return res.json({
        error: "Grad Date Required",
      });
    }
    if (!clubName) {
      return res.json({
        error: "Club Name Required",
      });
    }

    const exist = await clubMember.findOne({ UID });
    if (exist) {
      return res.json({
        error: true,
      });
    }

    // create a hashed password using hashPwd helper function
    // const hashedPwd = await hashPwd(password);
    //console.log("Addded");
    // create user with req.body infromation
    const user = clubMember.create({
      UID,
      name,
      major,
      gradDate,
      clubName,
      paidDues: false,
      customQ: [],
    });

    (await user).save();

    if (clubMember.find()) {
      console.log("Addded");
    }
    return res.json(user.clubName);
  } catch (error) {
    console.log(error);
  }
};

const updateQR = async (req, res) => {
  // console.log("request from qr on main", req);
  // console.log(req);
  // const uid = req.query;
  // console.log(uid);
  //const exist = await User1.findOne({ UID: req });
  //if (exist) {
  return res.json({
    error: "test",
  });
  //}
};
const defaultAdmin = async (req, res) => {
  const password = "123456";
  const hashedPwd = await hashPwd(password);
  var count = 0;

  const admin = await Admin.findOne({
    username: "default",
    password: hashedPwd,
  });
  if (!admin) {
    try {
      var defAdmin = new Admin({
        username: "default",
        password: hashedPwd,
      });
      if (count == 0) {
        await defAdmin.save();
        count = 1;
      }
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.json({ error: true });
  }
};
// Register Endpoint; endpoint connected to route in LoginOut.js
const register = async (req, res) => {
  try {
    // rename req.body information sent by user
    const { email, username, password } = req.body;
    // three if statements check if form fields are entered
    // toast picks up error body and displays as notification
    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }
    if (!username) {
      return res.json({
        error: "username is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "pwd is required and should be greater than 6 letters",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email Exists",
      });
    }

    // create a hashed password using hashPwd helper function
    const hashedPwd = await hashPwd(password);

    // create user with req.body infromation
    const user = User.create({
      email,
      username,
      password: hashedPwd,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};
// Login Endpoint;endpoint connected to route in LoginOut.js
const login = async (req, res) => {
  defaultAdmin(req, res);
  try {
    // take the username user logs in with and store in const username
    const { username, password } = req.body;
    console.log("username", username, password);
    // Check if user exists
    const user = await Admin.findOne({ username });
    console.log(user);
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }

    // If user exists, then check passwords match
    const match = await comparePwd(password, user.password);
    console.log(match);

    if (match) {
      jwt.sign(
        { username: user.username, id: user._id, email: user.email },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) {
            throw err;
          }
          res
            .cookie("token", token)
            .json(user)
            .status(200);
          res.json("Password Match");
        }
      );
    } else {
      return res.json({
        error: "Incorrect Password",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const Logout = async (req, res) => {
  console.log(req.cookies.token);
  res.clearCookie("token");
  res.status(200).json({ error: true });
};
const profile = (req, res) => {
  try {
    const { token } = req.cookies.token;
    console.log(token);
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        res.json(decoded);
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          console.error("JWT token has expired");
          // Handle expired token error
        } else if (err.name === "JsonWebTokenError") {
          console.error("JWT verification failed:", err.message);
          // Handle other JWT verification errors
        } else {
          console.error("JWT verification failed:", err);
          // Handle other errors
        }
      }
      /*
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        throw err;
      }
      console.log("here");
      res.json(user);
      if (err) {
        if (err.name === "TokenExpiredError") {
          console.error("JWT token has expired");
          // Handle expired token error
        } else if (err.name === "JsonWebTokenError") {
          console.error("JWT verification failed:", err.message);
          // Handle other JWT verification errors
        } else {
          console.error("JWT verification failed:", err);
          // Handle other errors
        }
      } else {
        console.log("Decoded token:", user);
        res.json(user);
      }
    });*/
    } else {
      res.json({ error: true });
    }
  } catch (err) {
    console.log(err);
  }
};

const display = (req, res) => {
  clubMember
    .find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};
/*
const authenticate = async (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("token", token);
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.clearCookie("access_token");
    // token = req.cookies.access_token;
    if (!token) {
      console.log("here");
      res.redirect(301, "http://localhost:3000/");
    }
  }
};*/

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    res.send(req.user);
    // console.log("AUTHENTICATE:   ", req);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("TOKEN EXPIRED");
      token = req.cookies.refresh_token;
      user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      console.log("AUTHENTICATE:   ", req.user);
    }
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    // clear cookies and redirect to influx main page
    // essentially session logs out and user has to come back
    // res.redirect("localhost:3000/");
    const redirect_url = "http://localhost:3000";
    console.log(error);
    res.send(req.user);
    //  res.redirect(301, redirect_url);
  }
};

const retrieveCustomQ = async (req, res) => {
  try {
    const check = await cQ.find();

    console.log(check);
    if (check.length > 0) {
      const updatedQArray = await cQ.findOne().where(check[0]._id);
      console.log("NEW Q in Display:", updatedQArray);
      res.json(updatedQArray);
    } else {
      res.json([]);
    }
    // res.json({ error: true });
    /*
    const questions = await cQ.find();
    if (questions) {
      console.log("QUESTIONS: ", questions);
      res.json({ data: questions });
      /res.json([
        { question: "Age?", answer: "" },
        { question: "Experience?", answer: "" },
        { question: "Hobbies?", answer: "" },
      ]);
    } else {
      res.json([{}]);
    }*/
  } catch (err) {
    console.log(err);
  }

  /*custom q:

  Software Development Experience (1/2/3/4/5) [How much do you know about software development?]
  */
};

const updateCQForm = async (req, res) => {
  console.log("UPDATECGFROM");
  console.log(req.query.q);
  const newQ = req.query.q;
  const check = await cQ.find();
  console.log(check);
  if (check.length > 0) {
    const updatedQArray = await cQ
      .findOneAndUpdate({
        $push: {
          customquestion: { question: newQ, answer: "" },
        },
      })
      .where(check[0]._id);
    console.log("NEW Q:", updatedQArray);
  } else {
    const data = new cQ({
      question: newQ,
      answer: "",
    });
    data.save();
  }
};

const displayCustomQ = async (req, res) => {
  const check = await cQ.find();

  console.log(check);
  if (check.length > 0) {
    const updatedQArray = await cQ.findOne().where(check[0]._id);
    console.log("NEW Q in Display:", updatedQArray);
    res.json(updatedQArray);
  } else {
    res.json([]);
  }
  // res.json([{ question: "How are you?" }]);
};

const deleteCustomQ = async (req, res) => {
  const check = await cQ.find();
  // const questionID = req.query;
  const documentID = check[0]._id;
  const itemIdToRemove = req.query.qID;
  const itemId = new mongoose.Types.ObjectId(itemIdToRemove);
  const filter = { _id: documentID };
  const update = {
    $pull: { customquestion: { _id: itemId } },
  };
  cQ.updateOne(filter, update)
    .then(async (result) => {
      console.log(result);
      const updatedQArray = await cQ.findOne().where(check[0]._id);
      console.log("NEW Q in Display:", updatedQArray);
      res.json(updatedQArray);
      // Handle success
    })
    .catch((error) => {
      console.error("Update error:", error);
      // Handle update error
    });
  console.log("qid IN DELETE:", itemIdToRemove);
  console.log("iN dELETE:", check);
};

const updateDuesPaid = async (req, res) => {
  const token = req.cookies.access_token;
  // console.log("TOKEN IN FTQ:  ", token);
  const decodedToken = jwt.decode(token);

  const updatedDuesMember = await clubMember
    .findOneAndUpdate({
      paidDues: true,
    })
    .where(decodedToken._id);

  console.log(updatedDuesMember);

  res.redirect(301, "http://localhost:3002/pay/Dues/Stripe");
};

const checkPaid = async (req, res) => {
  console.log(req);
  try {
    console.log("REQ QUERY:", req.query);
    const decodedToken = jwt.decode(req.query.TOKEN);
    console.log("DECODED TOKEN:", decodedToken);
    const updatedDuesMember = await clubMember
      .findOneAndUpdate({
        paidDues: true,
      })
      .where(decodedToken._id);
    console.log(updatedDuesMember);

    console.log(("IS IT TRUE?", updatedDuesMember.paidDues));
    res.json({ paidDues: updatedDuesMember.paidDues });
  } catch (err) {
    console.log(err);
    res.json({});
  }
};

const updateAnswers = async (req, res) => {
  //res.json({ msg: true });
  console.log("UPDATE ANSWER", req.query.submit);
  const answerArray = req.query.submit;
  console.log("UPDATE ANSWER", req.query.token);

  const user = await clubMember
    .findOneAndUpdate({
      $push: {
        customQ: answerArray,
      },
    })
    .where(req.query.token._id);
  console.log(user);

  res.json({ msg: user });
};

module.exports = {
  test,
  register,
  login,
  profile,
  display,
  firstTimeQ,
  authenticate,
  updateQR,
  defaultAdmin,
  Logout,
  retrieveCustomQ,
  updateDuesPaid,
  checkPaid,
  updateCQForm,
  updateAnswers,
  displayCustomQ,
  deleteCustomQ,
};
