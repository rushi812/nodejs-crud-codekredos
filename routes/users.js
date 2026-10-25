const express = require("express");
const router = express.Router();

const User = require("../models/users");

router
  .route("/")
  .get(async (req, res) => {
    // return res.json(users);
    try {
      const allUsers = await User.find({});
      return res.json(allUsers);
    } catch (err) {
      console.log("Error while getting users", err);
      return res.json(err);
    }
  })
  .post(async (req, res) => {
    const body = req.body;

    try {
      const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        city: body.city,
      });

      res.json(result);
    } catch (err) {
      console.log("Error while creating user", err);
      return res.json(err);
    }

    // users.push({ ...body, id: users.length + 1 });
    // fs.writeFile("./DB.json", JSON.stringify(users), (err, data) => {
    //   return res.json({ status: `User created with user id ${users.length}` });
    // });
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const userId = req.params.id;
    // const userByID = users.find((user) => user.id === userId);
    // return res.json(userByID);

    try {
      const userById = await User.findById(userId);
      if (!userById) {
        res.json({ message: `User with id ${userId} is not in the DB` });
      } else return res.json(userById);
    } catch (err) {
      console.log(`Error finding the user with id ${userId}`, err);
      return res.json({
        message: `Error finding the user with id ${userId}`,
        err,
      });
    }
  })
  .patch(async (req, res) => {
    const userId = req.params.id;
    const updatedUser = {};

    try {
      if (req.body.first_name !== undefined) {
        updatedUser.firstName = req.body.first_name;
      }
      if (req.body.last_name !== undefined) {
        updatedUser.lastName = req.body.last_name;
      }
      if (req.body.email !== undefined) {
        updatedUser.email = req.body.email;
      }
      if (req.body.city !== undefined) {
        updatedUser.city = req.body.city;
      }

      const user = await User.findByIdAndUpdate(userId, updatedUser, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        return res.json({ message: "No user found" });
      }
      return res.json(user);
    } catch (err) {
      console.log(`Error finding the user with id ${userId}`, err);
      return res.json({
        message: `Error finding the user with id ${userId}`,
        err,
      });
    }

    // const body = req.body;
    // const userIndex = users.findIndex((user) => user.id === userId);
    // users.splice(userIndex, 1, {
    //   ...users[userIndex],
    //   ...body,
    // });

    // fs.writeFile("./DB.json", JSON.stringify(users), (err, data) => {
    //   return res.json({ status: `User with user id ${userId} is updated!` });
    // });
  })
  .delete(async (req, res) => {
    const userId = req.params.id;
    try {
      await User.findByIdAndDelete(userId);
      return res.json({
        message: `User with id ${userId} deleted successfully!`,
      });
    } catch (err) {
      console.log(`Error finding the user with id ${userId}`, err);
      return res.json({ message: "No user found", err });
    }
    // const filteredUser = users.filter((user) => user.id !== userId);
    // fs.writeFile("./DB.json", JSON.stringify(filteredUser), (err, data) => {
    //   return res.json({
    //     status: `User with user id ${userId} is deleted successfully!`,
    //   });
    // });
  });

// app.post("/users", (req, res) => {
//   const body = req.body;
//   users.push({ ...body, id: users.length + 1 });

//   fs.writeFile("./DB.json", JSON.stringify(users), (err, data) => {
//     return res.json({ status: `User created with user id ${users.length}` });
//   });
// });

module.exports = router;
