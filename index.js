const express = require("express");
const Joi = require("joi");
const app = express();

const coursesRouter = require("./courses");

app.use(express.json());

const courses = [
  { id: 1, name: "course" },
  { id: 2, name: "course" },
  { id: 3, name: "course" },
];

app.get("/", coursesRouter);

app.get("/api/courses", (req, res, next) => {
  res.send(courses);
});

app.post("/api/courses", (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(courses);
});

app.get("/api/courses/:id", (req, res, next) => {
  const courseById = courses.find(
    (item) => item.id === parseInt(req.params.id)
  );

  if (!courseById)
    res.status(404).send("The course with the given ID was not found");

  res.send(courseById);
});

app.put("/api/courses/:id", (req, res, next) => {
  const courseById = courses.find(
    (item) => item.id === parseInt(req.params.id)
  );

  if (!courseById)
    res.status(404).send("The course with the given ID was not found");

  const { error } = validateCourse(req.body);

  if (error) {
    return req.status(400).send(error.details[0].message);
  }

  courses.name = req.body.name;
  res.send(courses);
});

app.delete("/api/courses/:id", (req, res, next) => {
  const courseById = courses.find(
    (item) => item.id === parseInt(req.params.id)
  );

  if (!courseById)
    return res.status(404).send("The course with the given ID was not found");

  const index = courses.indexOf(courseById);
  courses.splice(index, 1);

  res.send(courseById);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port} ....`);
});
