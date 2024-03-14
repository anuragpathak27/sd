const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

const teams = ['Code Stromers', 'Artificial Minds', 'Data Wizard', 'Code Geass', 'Synchronized Brains', 'Tech Divas', 'Binary Bandits', 'Tech Clan', 'Hack Hustlers', 'Fortitude', 'Mind Optimizers', 'Team Karlsefni', 'Code Brigade', 'Cosmic Clams', ' Integreat', 'Alpha Coders', 'Code Planters']; // List of teams
const problems = [
                  'Explainable AI Challenge: Teams tackle the challenge of making AI models more interpretable and explainable by implementing techniques such as SHAP (SHapley Additive exPlanations) or LIME (Local Interpretable Model-agnostic Explanations), deployed on a cloud environment.', 
                  'Automated Model Deployment: Participants automate the deployment of a machine learning model on a cloud infrastructure using containerization tools like Docker and container orchestration platforms like Kubernetes.', 
                  'Data Visualization Dashboards: Teams create interactive data visualization dashboards using cloud-based tools like Tableau, Power BI, or Google Data Studio to explore and communicate insights from a given dataset.', 
                  'Fraud Detection Simulation: Participants simulate a real-time fraud detection system for financial transactions using streaming analytics and machine learning algorithms, implemented on a cloud platform like AWS Kinesis or Google Cloud Dataflow.', 
                  'Predictive Maintenance: Participants work on a predictive maintenance project using historical sensor data to forecast equipment failures and optimize maintenance schedules, leveraging cloud-based machine learning services like Azure Machine Learning or Google Cloud AI Platform.', 
                  'AI-driven Customer Support: Teams develop a chatbot using natural language processing techniques to provide automated customer support for a fictitious e-commerce platform, deployed on a cloud service like AWS Lambda or Azure Functions.', 
                  'Real-time Data Streaming: Participants build a pipeline to ingest, process, and analyze streaming data from sources like social media feeds or IoT devices using cloud-based tools like Apache Kafka and Spark Streaming.', 
                  'Cloud Cost Optimization: Teams compete to design and implement strategies for optimizing cloud computing costs while ensuring high performance and reliability.', 
                  'Data Cleaning Challenge: Participants are given a messy dataset and are tasked with cleaning and preprocessing it using Python and popular libraries like Pandas and NumPy.',
                  'Customer Churn Prediction: Create a machine learning model to predict customer churn for a subscription-based service using historical user data.'
                ]; // List of problems
let problemsAssigned = {}; // Object to keep track of problems assigned to teams

app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files from the current directory

app.get('/assign-team', (req, res) => {
  if (teams.length === 0) {
    res.json(null); // All teams have been assigned
    return;
  }

  const team = teams.pop(); // Get the next team
  let problemIndex;
  let problem;

  // Check if the team has been assigned a problem before
  if (problemsAssigned[team]) {
    // If the team has been assigned a problem less than twice, assign a problem they haven't been assigned yet
    if (problemsAssigned[team] < 2) {
      do {
        problemIndex = Math.floor(Math.random() * problems.length);
        problem = problems[problemIndex];
      } while (problemsAssigned[problem] >= 2);
    } else { // If the team has been assigned a problem twice, remove them from the object
      delete problemsAssigned[team];
      problemIndex = Math.floor(Math.random() * problems.length);
      problem = problems[problemIndex];
    }
  } else { // If the team hasn't been assigned a problem before, assign a problem they haven't been assigned yet
    do {
      problemIndex = Math.floor(Math.random() * problems.length);
      problem = problems[problemIndex];
    } while (problemsAssigned[problem] >= 2);
  }

  // Update the problemsAssigned object
  if (problemsAssigned[team]) {
    problemsAssigned[team]++;
  } else {
    problemsAssigned[team] = 1;
  }

  // Save team and problem to Excel sheet (You need an Excel library for this)
  // For simplicity, I'll just log the data
  const dataToSave = { team, problem };
  console.log(dataToSave);

  res.json(dataToSave);
});


app.listen(port, () => console.log(`Server is running on port ${port}`));
