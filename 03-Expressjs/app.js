const express = require("express");
const fs = require("fs");

const app = express();

/*this is the middleware that is present between the request and response and converts the json code directally to object */
app.use(express.json());

// app.get("/", (req, res) => {
//   res
//     .status(200)
//     .json({ message: "Hellog from the server side!", app: "Travelling_Blogs" });
// });

// app.post("/", (req, res) => {
//   res.status(404).send("You can post to this endpoint...");
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get("/api/v1/tours/:id", (req, res) => {
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

app.post("/api/v1/tours", (req, res) => {
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

app.patch("/api/v1/tours/:id", (req, res) => {
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

app.delete("/api/v1/tours/:id", (req, res) => {
  const tour = tours.find((el) => el.id === parseInt(req.params.id));

  if (!tour) {
    return res.status(404).json({ status: "fail", message: "Invalid Id" });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
