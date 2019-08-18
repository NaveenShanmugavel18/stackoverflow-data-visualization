# stackoverflow-data-visualization
Chart to visualize the new questions and featured questions from Stackoverflow using Node JS, Express JS and Chart JS.<br/>
Heroku Link: [https://stackoverflow-visualization.herokuapp.com/](https://stackoverflow-visualization.herokuapp.com/)

# Requirements
- Node JS
- Express JS
- MongoDB
- pm2 (for process management)


# Installation
- Clone the repo: `https://github.com/NaveenShanmugavel18/stackoverflow-data-visualization.git`
- Install dependencies: `npm install`
- Start the server: `pm2 start development.json`

# Visualization
- Navigate to localhost:3000 in your browser after starting the development.json file.
- Click on new questions button to visualize the number of new question.
- Enter the tags in the input box (comma seperated) to visualize the number of  featured questions for the entered tags.
