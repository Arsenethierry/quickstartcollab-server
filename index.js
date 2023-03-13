const express = require("express");
const cors = require("cors");
const articleRoutes = require("./routes/article.js");
const authRoutes = require("./routes/auth.js");
const userProfiles = require("./routes/user-profiles.js");
const communityRoutes = require("./routes/community.js");

const mongoose = require("mongoose");
var csv = require("csv");
var fs = require("fs");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to QuickStartCollab");
});
app.use("/api/articles", articleRoutes);
app.use("/users", authRoutes);
app.use("/user_profiles", userProfiles);
app.use("/api/colleges", authRoutes);
app.use("/api/community", communityRoutes);

const PORT = process.env.PORT || 5000;

var colleges;

fs.readFile("colleges-db/database.csv", (err, data) => {
  console.log("collegues read");

  csv.parse(data, function (err, data) {
    colleges = data;

    console.log("colleges loaded");
  });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

app.post("/api/colleges/total", (req, res) => {
  var str = {
    total: colleges.length,
  };

  res.send(JSON.stringify(str));
});

app.post("/api/colleges/search", function (req, res) {
  var keyword = req.headers.keyword.toLowerCase();
  var result = [];

  for (var i = 0; i < colleges.length; i++) {
    if (colleges[i][2].toLowerCase().indexOf(keyword) >= 0) {
      colleges[i][2] = colleges[i][2].replace(/\:[^>]*\)/gi, "");
      colleges[i][2] = colleges[i][2].replace(/(\(Id)/gi, "");

      colleges[i][1] = colleges[i][1].replace(/\:[^>]*\)/gi, "");
      colleges[i][1] = colleges[i][1].replace(/(\(Id)/gi, "");

      result.push(colleges[i]);
    }
  }

  res.send(JSON.stringify(result));
});

app.post("/api/colleges/id", function (req, res) {
  var id = req.body.headers.collegeId;
  try {
    if (colleges[id]) {
      res.send(JSON.stringify(colleges[id]));
    } else {
      res.status(500).send("Something went wrong");
    }
  } catch (error) {
    res.send(error.message);
  }
});

app.post("/api/colleges/state", function (req, res) {
  var state = req.headers.state.toLowerCase();
  var result = [];

  for (var i = 0; i < colleges.length; i++) {
    if (colleges[i][4].toLowerCase().indexOf(state) >= 0) {
      colleges[i][2] = colleges[i][2].replace(/\:[^>]*\)/gi, "");
      colleges[i][2] = colleges[i][2].replace(/(\(Id)/gi, "");

      colleges[i][1] = colleges[i][1].replace(/\:[^>]*\)/gi, "");
      colleges[i][1] = colleges[i][1].replace(/(\(Id)/gi, "");

      result.push(colleges[i]);
    }
  }

  res.send(JSON.stringify(result));
});

app.post("/api/colleges/district", function (req, res) {
  if (typeof req.body.headers === "string" && req.body.headers !== undefined) {
    try {
      var district = req.body.headers;
      var result = [];

      for (var i = 0; i < colleges.length; i++) {
        if (colleges[i][5].toLowerCase().indexOf(district) >= 0) {
          colleges[i][2] = colleges[i][2].replace(/\:[^>]*\)/gi, "");
          colleges[i][2] = colleges[i][2].replace(/(\(Id)/gi, "");

          colleges[i][1] = colleges[i][1].replace(/\:[^>]*\)/gi, "");
          colleges[i][1] = colleges[i][1].replace(/(\(Id)/gi, "");

          result.push(colleges[i]);
        }
      }
      res.send(JSON.stringify(result));
    } catch (error) {
      console.log(error);
    }
  }
});

Array.prototype.contains = function (obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
};

app.post("/api/colleges/allstates", function (req, res) {
  var result = [];

  for (var i = 1; i < colleges.length; i++) {
    if (result.indexOf(colleges[i][4]) < 0) {
      result.push(colleges[i][4]);
    } else {
    }
  }

  res.send(JSON.stringify(result));
});

app.post("/api/colleges/districts", function (req, res) {
  if (typeof req.body.headers === "string") {
    try {
      var state = req.body.headers.toLowerCase();
      var result = [];

      for (var i = 0; i < colleges.length; i++) {
        if (colleges[i][4].toLowerCase().indexOf(state) >= 0) {
          if (result.indexOf(colleges[i][5]) < 0) {
            result.push(colleges[i][5]);
          }
        }
      }

      res.send(JSON.stringify(result));
    } catch (error) {
      console.log(error);
    }
  }
});

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
