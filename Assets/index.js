//DEPENDENCIES
const inquirer = require("inquirer");
const MaxLengthInputPrompt = require("inquirer-maxlength-input-prompt");
const fs = require("fs");
const { error } = require("console");
//register as a type of input
inquirer.registerPrompt("maxlength-input", MaxLengthInputPrompt);

//DATA
class Circle {
  constructor(text, textColor, color) {
    this.text = text;
    this.textColor = textColor;
    this.color = color;
    this.data = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="150" cy="100" r="80" fill="${color}" />
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
  </svg>`;
  }
}

class Triangle extends Circle {
  constructor(text, textColor, color) {
    super(text, textColor, color);
    this.data = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    <polygon points="100,10 40,198 190,78 10,78 160,198 style="fill:${color};" />
    <text x="100" y="125" font-size="35" text-anchor="middle" fill="${textColor}">${text}</text>
  </svg>`;
  }
}

class Square extends Circle {
  constructor(text, textColor, color) {
    super(text, textColor, color);
    this.data = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="150" height="150" style="fill:${color};" />
    <text x="75" y="100" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
  </svg>`;
  }
}

//Functions
function init() {
  inquirer
    .prompt([
      {
        type: "maxlength-input",
        name: "text",
        message: "Please enter your logo's text, must be <= 3 characters",
        maxLength: 3,
      },
      {
        type: "input",
        name: "textColor",
        message:
          "Please enter your logo's text color in regular or hexidecimal format",
      },
      {
        type: "list",
        name: "shape",
        message: "Please choose your preferred shape",
        choices: ["triangle", "circle", "square"],
      },
      {
        type: "input",
        name: "shapeColor",
        message:
          "Please enter your logo's color in regular or hexidecimal format",
      },
    ])
    .then((response) => {
      console.log(response);

      switch (response.shape.toLowerCase()) {
        case "circle":
          const newCircle = new Circle(
            response.text,
            response.textColor.toLowerCase(),
            response.shapeColor
          );

          fs.writeFile("logo.svg", newCircle.data, (error) =>
            error ? console.log(error) : console.log("Generated logo.svg")
          );
          break;
      }
    });
}

//initialize
init();
