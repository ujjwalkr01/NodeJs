const express = require("express");
const fs = require("fs");

//we can create the routing and use in this way;-
const router = express.Router();

/**------------Reading File data--------------- */
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const createTour = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

router.get("/", createTour); // we can also refactor our code in this way for better readablity.

router.get("/:id", (req, res) => {
  /**request.params is where all the parameter of all variables that we define are stored  */
  // console.log(req.params);

  const { id } = req.params;
  // console.log(id);

  const tour = tours.find((el) => el.id === parseInt(id));

  if (!tour) {
    return res.status(404).json({ status: "fail", message: "Invalid Id" });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

router.post("/", (req, res) => {
  console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };
  // console.log(newTour);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );

  // res.send("done");
});

router.patch("/:id", (req, res) => {
  const tour = tours.find((el) => el.id === parseInt(req.params.id));

  if (!tour) {
    return res.status(404).json({ status: "fail", message: "Invalid Id" });
  }
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tour: "<Updated tour here....>",
    },
  });
});

router.delete("/:id", (req, res) => {
  const tour = tours.find((el) => el.id === parseInt(req.params.id));

  if (!tour) {
    return res.status(404).json({ status: "fail", message: "Invalid Id" });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = router;
