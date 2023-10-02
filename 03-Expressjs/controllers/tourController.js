const fs = require("fs");

/**------------Reading File data--------------- */
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

// exports.get(createTour); // we can also refactor our code in this way for better readablity.

exports.getTour = (req, res) => {
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
};

exports.createTour = (req, res) => {
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
};

exports.updateTour = (req, res) => {
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
};

exports.deleteTour = (req, res) => {
  const tour = tours.find((el) => el.id === parseInt(req.params.id));

  if (!tour) {
    return res.status(404).json({ status: "fail", message: "Invalid Id" });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};
