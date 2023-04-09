const dotenv = require("dotenv");
require("colors");
const mongoose = require("mongoose");
const fs = require("fs");

dotenv.config({ path: "./config/config.env" });

// load modals
const Bootcamp = require("./Modals/Bootcamp");

// connect to DB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});

const files = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

// Insert data
const insertData = async (req, res) => {
  try {
    await Bootcamp.create(files);
    console.log("Data has been inserted".green.bold);
    process.exit();
  } catch (error) {
    console.log(error.message);
  }
};

// Delete data
const deleteData = async (req, res) => {
  try {
    await Bootcamp.deleteMany();
    console.log("Data has been deleted...".bgGreen.italic);
    process.exit();
  } catch (error) {
    console.log(error.message);
  }
};

if (process.argv[2] === "-i") {
  insertData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
