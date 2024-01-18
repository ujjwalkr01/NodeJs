const db = require("../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  console.log(req.body);

  const { name, email, password, passwordConfirm } = req.body;

  db.query(
    "SELECT email from Users WHERE email=?",
    [email],
    async (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result.length > 0) {
        return res.render("signup", {
          message: "This email is already in use",
        });
      }

      if (password !== passwordConfirm) {
        return res.render("signup", {
          message: `Passwords don't match`,
        });
      }

      //hashing password by default is 8times but it can be more as well
      const hashPassword = await bcrypt.hash(password, 8);
      console.log(hashPassword);

      db.query(
        "INSERT into Users SET ?",
        {
          id: "1",
          name: name,
          email: email,
          password: hashPassword,
        },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result),
              res.render("signup", {
                message: "User Registered",
              });
          }
        }
      );

      // res.send("testing");
    }
  );
};
