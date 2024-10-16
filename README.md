# Voosh Project

This is a assignment project from Voosh Food Technology   
You can visit the [Live website](https://voosh-project-client.onrender.com)  

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech](#tech)
- [Setup](#setup)
- [Screenshots](#screenshots)
- [Running](#running)

## Description

This is a Todos making website where you can create, update and delete Todos. As there are three categories based on status of todo, Pending, In Progress and Done. So, you can keep track of your todos.

## Features
- Login with Google OAuth or Email and Password
- verify signup with otp send to email
- create, edit and delete todos
- search and sort functionality
- complete responsive using built in Tailwind properties
- Reset Your Password functionality in case you forget your password

## Tech
<ul>
<li>React JS</li>
<li>Tailwind CSS - <i>designing of web pages with less code</i></li>
<li>React Query - <i>for data fetching and caching effectively</i></li>
<li>React Dnd - <i>to implement drag and drop functionality effectively</i></li>
<li>Redux - <i>for global state management</i></li>
<li>React Hook Form - <i>form filling and preventing re-rendering effectively</i></li>
<li>Zod - <i>checking form validation effectively</i></li>
<li>React Icons - <i>show different icons like for profile, search etc</i></li>
<li>React Toastify - <i>show better UI notification using pre-built components</i></li>
<li>Shadcn/ui - <i>using pre-built component for faster development of web pages</i></li>
<li>React Helmet - <i>used for page title and metadata</i></li>
</ul>


## Setup

- fork this project into your own Github repo
- create a .env file below index.html file
- vercel.json file is added for deployment in Vercel. If your want to deploy to other then delete it.

<h4>.env Variables</h4>


- VITE_APP_SERVER_URL=(this-project-server url) For More info : [Server](https://github.com/Kamit6337/voosh-project-server)
- VITE_APP_NODE_ENV=(type "production" on deployed website, for local pc type "development")





## Screenshots
Here are the screenshots of this project.

![project1](https://amit-general-bucket.s3.ap-south-1.amazonaws.com/images/voosh1.png)
![project1](https://amit-general-bucket.s3.ap-south-1.amazonaws.com/images/voosh2.png)
![project1](https://amit-general-bucket.s3.ap-south-1.amazonaws.com/images/voosh3.png)
![project1](https://amit-general-bucket.s3.ap-south-1.amazonaws.com/images/voosh4.png)


## Running

To run this app locally using Docker Image :

- install Docker Desktop from [Docker website](https://www.docker.com/products/docker-desktop) and start to run in background
- create a folder in desktop, open this folder in VS Code
- create a .env file
- copy .env.example file variables from above and paste in .env file
- start filling all environment variables
- open VS Code terminal

```
docker run --env-file .env -p 5173:80 kamit6337/voosh-project-client
```

- react-app started on http://localhost:5173
