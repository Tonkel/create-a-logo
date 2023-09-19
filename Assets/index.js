//DEPENDENCIES
const inquirer = require("inquirer");
const MaxLengthInputPrompt = require("inquirer-maxlength-input-prompt");
const fs = require("fs");
//register as a type of input
inquirer.registerPrompt("maxlength-input", MaxLengthInputPrompt);

//DATA

//Functions
