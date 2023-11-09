const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

function romanToNumber(roman) {
  const romanNumbers = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let number = 0;
  roman = roman.toUpperCase();

  for (let i = 0; i < roman.length; i++) {
    const current = romanNumbers[roman[i]];
    const next = romanNumbers[roman[i + 1]];

    console.log("Current:", current, "Next:", next);

    if (next && current < next) {
      number -= current;
    } else {
      number += current;
    }
  }

  console.log("Final Number:", number);

  return number;
}

app.post("/convert", (req, res) => {
  const { roman } = req.body;

  if (!roman) {
    return res
      .status(400)
      .json({ error: "Missing Roman numeral in the request body." });
  }

  const result = romanToNumber(roman);
  res.json({ result });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
