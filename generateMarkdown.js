const inquirer = require("inquirer");
const fs = require("fs");

const questions = [{ message: 'Please insert the project title:', name: 'title' },
{ message: 'Enter the description for the project:', name: 'description' },
{ message: 'Enter the installtion instructions:', name: 'install' },
{ message: 'Enter the usage information:', name: 'usage' },
{ message: 'Enter the contribution guidelines:', name: 'contribution' },
{ message: 'Enter the license of the project: ', name: 'license', type: 'list', choices: ['Apache License 2.0', 'GNU General Public License v3.0', 'MIT License', 'BSD 2-Clause "Simplified License"', 'BSD 3-Clause "New" or "Revised" License', 'Boost Software License 1.0', 'Creative Commons Zero v1.0 Universal', 'The Unlicensed'] },
{ message: 'Enter the test instructions:', name: 'test' }];

inquirer
  .prompt(
    questions
  )
  .then((data) => {
     const readME = `${generateMarkdown(data)}.json`

     fs.writeFile(readME, JSON.stringify(data), (err) => 
      err ? console.log(err) : console.log('Success!'));  
    });



// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (license !== null) {
    return "";
  }
  else {
    return license;
  }

}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (license !== null) return license;
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license !== null) return license;
}


function generateMarkdown(data) {
  return `# ${data.title}

  ## Description

  ${data.description}

  ## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license)
  - [Tests](#tests)

  ## Installation

  ${data.install}

  ## Usage

  ${data.usage}

  ## Credits

  ${data.contribution}

  ## License

  ${renderLicenseSection(data.license)}

  ---

  ## Badges

  ${renderLicenseBadge(data.license)}

  ## Tests

  ${data.test}

`;
}

module.exports = generateMarkdown;
