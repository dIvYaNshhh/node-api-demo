const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

const DUMMY_RESPONSE = {
  id: 1,
  title: "Hello",
  description: "World",
};

app.get("/hello_world", (req, res) => {
  res.json(DUMMY_RESPONSE);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
