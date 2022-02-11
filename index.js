const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const manQuestions = [
	{
		type: 'input',
		message: 'Please enter the team managers name:  ',
		name: 'employeeName',
	},
	{
		type: 'input',
		message: 'Please enter the team managers employee ID: ',
		name: 'employeeID',
	},
	{
		type: 'input',
		message: 'Please enter the team managers email address: ',
		name: 'employeeEmail',
	},
	{	
		type: 'input',
		message: 'Please enter the team managers office number: ',
		name: 'employeeOffice',
	},
]
		
const employeeSelect = [
    {
        type: 'list',
        name: 'employeeType',
        message: 'Please Select the type of employee you would like to add to your team or Done to finish:',
        choices: ["Engineer", "Intern", new inquirer.Separator(), "Done"]
    }
]

const engineerQuestions = [
    {
        type: 'input',
        name: 'employeeName',
        message: 'Please enter your engineers name: '
    },
    {
        type: 'input',
        name: 'employeeID',
        message: 'Please enter your engineers ID: '
    },
    {
        type: 'input',
        name: 'employeeEmail',
        message: 'Please enter your engineers email: '
    },
    {
        type: 'input',
        name: 'employeeGit',
        message: 'Please enter your engineers GitHub username: '
    }
];

const internQuestions = [
    {
        type: 'input',
        name: 'employeeName',
        message: 'Please enter the name of your intern:'
    },
    {
        type: 'input',
        name: 'employeeID',
        message: 'Please enter the employee ID of your intern:'
    },
    {
        type: 'input',
        name: 'employeeEmail',
        message: 'Please enter the email of your intern:'
    },
    {
        type: 'input',
        name: 'employeeSchool',
        message: 'Please enter the school name of your intern:'
    }
];

async function promptUser(prompt) {
    return await inquirer.prompt(prompt);
}

const managerCard = (manager) => {
    return `<div class="m-2 card">
                <div class="card-header bg-success text-white">
                    <h2>${manager.getName()}</h2>
                    <h2>${manager.getRole()}</h2>
                </div>
                <ul class="listr-group list-group-flush">
                    <li class="list-group-item">ID: ${manager.getId()}</li>
                    <li class="list-group-item">E-mail: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
                  
                </ul>
            </div>`
}

const engineerCard = (engineer) => {
    return `<div class="m-2 card">
                <div class="card-header bg-primary text-white">
                    <h2>${engineer.getName()}</h2>
                    <h2>${engineer.getRole()}</h2>
                </div>
                <ul class="listr-group list-group-flush">
                    <li class="list-group-item">ID: ${engineer.getId()}</li>
                    <li class="list-group-item">E-mail: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
                    <li class="list-group-item">GitHub: <a href="https://www.github.com/${engineer.getGithub()}" target="_blank">${engineer.getGithub()}</a></li>
                </ul>
            </div>`
}

const internCard = (intern) => {
    return `<div class="m-2 card">
                <div class="card-header bg-secondary text-white">
                    <h2>${intern.getName()}</h2>
                    <h2>${intern.getRole()}</h2>
                </div>
                <ul class="listr-group list-group-flush">
                    <li class="list-group-item">ID: 1</li>
                    <li class="list-group-item">E-mail: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
                    <li class="list-group-item">School: ${intern.getSchool()}</li>
                </ul>
            </div>`
}

function generateHTML(data) {
    let { manager, engineers, interns } = data;
    let cardString = "";

    if (manager.length > 0) {
        manager.forEach(emp => {
            cardString += managerCard(emp);
        })
    }
    if (engineers.length > 0) {
        engineers.forEach(emp => {
            cardString += engineerCard(emp);
        })
    }
    if (interns.length > 0) {
        interns.forEach(emp => {
            cardString += internCard(emp);
        })
    }

	let htmlPage = `<!doctype html>
	<html lang="en">

		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
			<title>Your Team</title>
		</head>

		<body>
			<header class="bg-warning bg-gradient text-center">
				<h1>Your Team</h1>
			</header>

			<body>
			<div class="container">
				<div class="row">
			  		<div class="col">
						${cardString}
					</div>
				</div>
			</div>	
			</body>
			<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj"
				crossorigin="anonymous"></script>
		</body>
	</html>`

	return htmlPage;
}

function createFile(html) {
    fs.writeFile('./dist/index.html', html, function (err) {
        if (err) {
            console.log(err);
        }
    })
}

async function main() {

    let team = {
        manager: [],
        engineers: [],
        interns: []
    };

    let manager = await promptUser(manQuestions);
    team.manager.push(new Manager(manager.employeeName, manager.employeeID, manager.employeeEmail, manager.employeeOffice));

    let done = false;
    while (!done) {
        let employee = await promptUser(employeeSelect);
        let employeeData;
        switch (employee.employeeType) {
            case "Engineer":
                employeeData = await promptUser(engineerQuestions);
                team.engineers.push(new Engineer(employeeData.employeeName, employeeData.employeeID, employeeData.employeeEmail, employeeData.employeeGit));
                break;
            case "Intern":
                employeeData = await promptUser(internQuestions);
                team.interns.push(new Intern(employeeData.employeeName, employeeData.employeeID, employeeData.employeeEmail, employeeData.employeeSchool));
                break;
            case "Done":
                done = true;
                break;
        }
    }

    createFile(generateHTML(team));
}

main();