const inquirer = require("inquirer");
const fs = require("fs");

const questions = [{ message: 'Please insert the project title:', name: 'title' },
{ message: 'Enter the description for the project:', name: 'description' },
{ message: 'Enter the installtion instructions:', name: 'install' },
{ message: 'Enter the usage information:', name: 'usage' },
{ message: 'Enter the contribution guidelines:', name: 'contribution' },
{ message: 'Enter the license of the project: ', name: 'license', type: 'list', choices: ['Apache License 2.0', 'GNU General Public License v3.0', 'MIT License', 'The Do What the Fuck You Want to Public License', 'The Unlicensed'] },
{ message: 'Enter the test instructions:', name: 'test' }];

inquirer
  .prompt(
    questions
  )
  .then((response) => {
    const fileName = 'generated_readme.md';
    const readME = generateMarkdown(response);

    fs.writeFile(fileName, readME, (err) =>

      err ? console.log(err) : console.log('ReadMe has been created!'));
  });





// A function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (license !== null) {
    if (license === 'Apache License 2.0') {
      return '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)]';
    }
    if (license === 'GNU General Public License v3.0') {
      return '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)]';
    }
    if (license === 'MIT License') {
      return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]';
    }
    if (license === 'The Do What the Fuck You Want to Public License') {
      return '[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)]';
    }
    if (license === 'The Unlicensed') {
      return '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)]';
    }
  }
  else {
    return "";
  }

}

//A function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (license !== null) {
    if (license === 'Apache License 2.0') {
      return '(https://opensource.org/licenses/Apache-2.0)';
    }
    if (license === 'GNU General Public License v3.0') {
      return '(https://www.gnu.org/licenses/gpl-3.0)';
    }
    if (license === 'MIT License') {
      return '(https://opensource.org/licenses/MIT)';
    }
    if (license === 'The Do What the Fuck You Want to Public License') {
      return '(http://unlicense.org/)';
    }
    if (license === 'The Unlicensed') {
      return '(http://unlicense.org/)';
    }
    else {
      return "";
    }
  }
  else {
    return "";
  }
}

// A function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license !== null) {
    const licenseSection = 'The license for this project is ' + license + 'and the link for the license is here ' + renderLicenseLink(license) + '.';
    return licenseSection; 
  }
  else{
    return "";
  }
}

// A function to generate the readMe markdown and return the markdown

function generateMarkdown(data) {
  return `# ${data.title}

  ## Description

  ${data.description}

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
