const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};
const getTourbyID = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'invalid id' });
  }
  res.status(200).json({
    status: 'success',
    data: tour,
  });
};
const addTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'updated tour here',
    },
  });
};

const deleteTour = (req, res, next) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

app.route('/api/v1/tours/').get(getAllTours).post(addTour);

app
  .route('/api/v1/tours/:id')
  .get(getTourbyID)
  .patch(updateTour)
  .delete(deleteTour);

// app.get('/api/v1/tours/:id', getTourbyID);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
