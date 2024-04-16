const Admin1 = require("../Models/AdminSchema.js");
const clubMember = require("../Models/user-model.js");
const Admin = require("../Models/admin-model.js");
const cQ = require("../Models/custom-question-model.js");
const Events = require("../Models/event-model.js");
const mongoose = require("mongoose");
const { hashPwd, comparePwd } = require("../helpers/auth.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("./sendEmail.js");
require("dotenv");
const cookies = require("cookies");
let countDefAdmin = 0;
const test = (req, res) => {
  res.json({ error: true });
  /* res.redirect(301, "http://localhost:3000");*/
};

require("dotenv").config();

const firstTimeQ = async (req, res) => {
  try {
    console.log(req);

    const f_name = req.query.firstName;
    const surname = req.query.surname;
    const email = req.query.email;
    const NID = req.query.nid;
    const Gender = req.query.gender;
    const major = req.query.major;
    const classStanding = req.query.classStanding;
    const UID = req.query.UID;
    console.log(UID, f_name, surname, email, NID, Gender, major, classStanding);

    const exist = await clubMember.findOne({ UID });
    if (exist) {
      return res.json({
        error: true,
      });
    }
    const user = clubMember.create({
      UID,
      f_name,
      surname,
      email,
      NID,
      Gender,
      major,
      classStanding,
      paidDues: false,
      customQ: [],
    });

    (await user).save();

    if (clubMember.find()) {
      console.log("Addded");
    }
    return res.json(user);
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
      if (countDefAdmin == 0) {
        await defAdmin.save();
        countDefAdmin = 1;
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
    const { username, password } = req.query;
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
    console.log("MATCH:", match);

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

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    res.send(req.user);

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

    // const redirect_url = "http://localhost:3000";
    const redirect_url = `${process.env.INFLUX_URL}`;
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
  } catch (err) {
    console.log(err);
  }
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

const deleteEvent = async (req, res) => {
  const check = await Events.find();
  const documentID = check[0]._id;
  const itemIdToRemove = req.query.eID;
  const itemId = new mongoose.Types.ObjectId(itemIdToRemove);
  const filter = { _id: documentID };
  const update = {
    $pull: { event: { _id: itemId } },
  };
  Events.updateOne(filter, update)
    .then(async (result) => {
      console.log(result);
      const updatedEArray = await Events.findOne().where(check[0]._id);
      console.log("NEW Q in Display:", updatedEArray);
      res.json(updatedEArray);
      // Handle success
    })
    .catch((error) => {
      console.error("Update error:", error);
      // Handle update error
    });
  console.log("eid IN DELETE:", itemIdToRemove);
  console.log("iN dELETE:", check);
};
// start copying from here
const updateDuesPaid = async (req, res) => {
  console.log("UPDATE DUES PAID");
  try {
    const token = req.cookies.access_token;
    console.log("TOKEN IN FTQ:  ", token);
    const decodedToken = jwt.decode(token);
    console.log("UPDATE DUES PAID", decodedToken);

    const updatedDuesMember = await clubMember.findOneAndUpdate(
      { UID: decodedToken.UID }, // Query condition
      { paidDues: true }, // Update field
      { new: true } // To return the updated document
    );

    // Check if user was found and updated
    if (updatedDuesMember) {
      console.log("Updated dues for user:", updatedDuesMember);
    } else {
      console.log("User not found or dues not updated.");
      // Handle case where user is not found or dues not updated
    }

    // find by UID
    // then update and paidDues to true
    console.log(updatedDuesMember);
    const paidInUser = await clubMember.findOne().where(decodedToken.UID);
    console.log("PAID IN USER:", paidInUser);
  } catch (err) {
    console.log(err);
  }
  res.redirect(
    301,
    `http://localhost:${process.env.CLIENT_PORT}/pay/Dues/Stripe`
  );
};

const displayEvents = async (req, res) => {
  const check = await Events.find();

  console.log(check);
  if (check.length > 0) {
    const updatedEArray = await Events.findOne().where(check[0]._id);
    console.log("NEW Q in Display:", updatedEArray);
    console.log("UPDATED E ARRAY:", updatedEArray.event);
    res.json(updatedEArray.event);
  } else {
    res.json([]);
  }
};

const updateEventsList = async (req, res) => {
  console.log("UPDATE EVENTS FROM");
  const event = req.query.entry;
  console.log(req);
  const title = event.title;
  const desc = event.description;
  const location = event.location;
  const date = event.date;
  console.log("consts", title, desc, location, date);
  const check = await Events.find();

  if (check.length > 0) {
    const updatedEArray = await Events.findOneAndUpdate({
      $push: {
        event: {
          eventTitle: title,
          Description: desc,
          Location: location,
          Date: date,
        },
      },
    }).where(check[0]._id);

    console.log("NEW Q:", updatedEArray);
  } else {
    console.log("HERE");
  }
};

const checkPaid = async (req, res) => {
  //  console.log(req);
  console.log("checkPaid");
  try {
    console.log("REQ QUERY:", req.query);
    const decodedToken =
      jwt.decode(req.query.token) || jwt.decode(req.cookies.access_token);
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
    res.json({ paidDues: false });
  }
};

const checkDues = async (req, res) => {
  // console.log(req);
  console.log("check Dues");
  try {
    console.log("REQ QUERY:", req.query);

    const decodedToken =
      jwt.decode(req.query.token) || jwt.decode(req.cookies.access_token);
    console.log("DECODED TOKEN:", decodedToken);
    console.log("UID:", decodedToken.UID);
    const duesmember = await clubMember.find({ UID: decodedToken.UID });

    console.log("DUES MEMBER:", duesmember, duesmember[0].paidDues);
    res.json({ paidDues: duesmember[0].paidDues });
  } catch (err) {
    console.log(err);
  }
};
const updateAnswers = async (req, res) => {
  //res.json({ msg: true });
  console.log("UPDATE ANSWER ARRAY", req.query.submit);
  const answerArray = req.query.submit;
  console.log("TOKEN UID IN UPDATE", req.query.token.UID);
  const user = await clubMember.find({ UID: req.query.token.UID });
  console.log("USER:", user[0]);
  console.log("USER ID", user[0]._id);

  const userInClub = await clubMember.findByIdAndUpdate(
    user[0]._id,
    {
      $push: {
        customQ: answerArray,
      },
    },
    { new: true }
  );
  console.log("USER IN CLUB:", userInClub);

  res.json({ msg: user });
};

const lendUser = async (req, res) => {
  console.log(req);
  console.log(req.query.UID);
  try {
    const user = await clubMember.findOne().where({ UID: req.query.UID });
    console.log("USER IN LEND:", user);
    res.json({ msg: user });
  } catch (err) {
    console.log(err);
    res.json({ msg: true });
  }
};

const takeGeneral = async (req, res, next) => {
  try {
    const UID = req.query.UID;
    const f_name = req.query.f_name;
    const surname = req.query.surname;
    const email = req.query.email;
    const NID = req.query.NID;
    const Gender = req.query.Gender;
    const major = req.query.major;
    const classStanding = req.query.classStanding;

    const user = clubMember.create({
      UID,
      f_name,
      surname,
      email,
      NID,
      Gender,
      major,
      classStanding,
      paidDues: false,
      customQ: [],
    });

    (await user).save();

    if (clubMember.find()) {
      console.log("Addded");
    }
  } catch (err) {
    console.log(err);
  }

  res.json({ msg: "true in takeGeneral" });
};

const findDuesPayingMembers = async (req, res) => {
  try {
    clubMember
      .find({ paidDues: true })
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
  } catch (err) {
    console.log(err);
  }
};

const passwordResetRequest = async (req, res) => {
  const { email } = req.body;
  const user = await Admin.findOne({ email });
  if (!user) {
    return res.status(404).send("User not found.");
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour
  await user.save();

  // change this based on the resetlink we are going to have
  const resetLink = `http://influx.com/reset-password/${resetToken}`;
  await sendEmail(
    user.email,
    "Password Reset Request",
    `Please click on the link to reset your password: ${resetLink}`
  );

  res.send("A password reset link has been sent to your email.");
};

const totalMembers = async (req, res) => {
  try {
    const count = await clubMember.countDocuments();
    res.json({ data: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
const totalAdmins = async (req, res) => {
  try {
    const count = await Admin.countDocuments();
    res.json({ data: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
const totalMembersPaid = async (req, res) => {
  try {
    const count = await clubMember.countDocuments({ paidDues: true });
    console.log("COUNT:", count);
    res.json({ data: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error", data: 0 });
  }
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
  lendUser,
  takeGeneral,
  findDuesPayingMembers,
  passwordResetRequest,
  totalMembers,
  totalAdmins,
  totalMembersPaid,
  displayEvents,
  updateEventsList,
  deleteEvent,
  checkDues,
};
