Weekend Warriors

This is my senior capstone project. An app made for the Weekend Warriors( people who play golf in the weekends). I worked in a team of 6. I've highlighted some of the features I worked on! I

Demo Link

Here is the link to our app demo: https://youtube.com/shorts/hRBsZwSBcgo?feature=share

This demo should show what our presentation demo should've looked like.


Jira
Jira Backlog Link:
https://avadennis117.atlassian.net/jira/software/projects/TICKET/boards/1/backlog

Figma
Figma Prototype: https://www.figma.com/design/jkY7qeupztpFKBY1oZ9yNi/Weekend-Warrior?node-id=83-214&p=f&t=TYO3fpWuKb5CINCa-0
A cross-platform mobile and web application for golf enthusiasts, providing curated golf tips, video tutorials, and user account features. Built with React Native (Expo), TypeScript, Node.js, and MySQL.

Features

Browse and search a large collection of golf tips
Save your favorite tips for quick access
Watch YouTube video tutorials embedded in tips
Multi-step user signup and authentication
Responsive UI with light/dark theme support
Admin tools for adding and deleting tips (web interface)
Data import from Excel to MySQL database


Tech Stack


Frontend: React Native (Expo), TypeScript, NativeWind, React Navigation

Backend: Node.js, Express, MySQL

Other: Axios, react-native-youtube-iframe, react-native-reanimated, react-native-gesture-handler


Project Structure

GolfTips/           # Main React Native app
  app/             # App source code (pages, components, context, etc.)
  components/      # Reusable UI components
  constants/       # Static data (images, icons, colors, etc.)
  context/         # React context (e.g., user ID)
  types/           # TypeScript types
  assets/          # Images, fonts, etc.
GolfTipsServer/     # Node.js/Express backend server
GolfTipsSite/       # Simple web admin interface for tip management
sendcsvtomysql.py   # Python script to import tips from Excel to MySQL



Getting Started

Prerequisites

Node.js & npm (https://nodejs.org/en)
React Native (https://reactnative.dev/docs/environment-setup)
Expo CLI
MySQL database


1. Backend Setup

cd GolfTipsServer
Install dependencies: npm install

Configure your MySQL connection in db.js with an appropriate .env file
Start the server: npm start



2. Frontend Setup (Mobile App)

cd GolfTips
Install dependencies: npm install

Start the Expo app: npx expo start

Use Expo Go or an emulator to run the app


3. Web Admin (Optional)

cd GolfTipsSite
Open index.html in your browser


4. Importing Tips from Excel

Place your tips.xlsx file in the root directory
Run: python sendcsvtomysql.py



5. AWS and EC2 (DB and Server Hosting)

Watch YouTube videos on how to host your database & server on AWS.
How to host MySQL db on AWS(RDS) : https://youtu.be/Ng_zi11N4_c?si=wggnL7FzxURBVI7z



Docker

Since we dockerized the server code & then hosted it on AWS(EC2).
Read: https://docs.docker.com/guides/nodejs/

Here is how you do it:


Download docker & make an account.
Install the docker cli.
Make a Dockerfile.
Steps To run the dockerfile:


To build: docker build -t express. (Replace express with the name you want to give to your container)
T0 run it locally: #have to run this to specify the port . # to run: docker run -p 3000:3000 testing1 (replace this with the name of your container)


To upload it to the docker hub, in your vscode terminal, after you created a docker file from the above step:


docker buildx create --use.
docker buildx build --platform linux/amd64 -t yourdockerusername/yourdockerimagename:latest --push . //This is because mac will build docker in arm64 but ubuntu needs amd64. This changes it to the specific requirement.


After you have access to EC2, connect to the instance. After that, in the terminal of the isntance run:


docker pull yourdockerusername/yourdockerimagename:latest
docker run -d -p 80:3000 yourdockerusername/yourdockerimagename
After the success message, you should be able to go to the ip provided by your EC2 & the server should be live.


6. Stripe API

For Stipe API setup, read: https://docs.stripe.com/payments/accept-a-payment?platform=react-native.
Should be straight forward. It is easy and convenient to use.


# This was hosted on AWS but since we're done w the project, all the API points have been replaced with localhost