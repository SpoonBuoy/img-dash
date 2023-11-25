# Origin Health

## Deployed Demo of the Project
- https://arsalan.live/
- Follow `Origin Health` Link

## Overview

An admin dashboard with 

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)


## Technologies Used

- *Backend:*
  - Golang
  - Gin Framework

- *Frontend:*
  - React
  - Tailwind CSS

## Project Structure

Describe the high-level structure of the project, such as the directory organization for both backend and frontend components.

```plaintext
.
├── backend
│   ├── controllers
│   ├── disk
│   ├── dto
│   ├── go.mod
│   ├── go.sum
│   ├── main.go
│   ├── middleware
│   ├── models
│   ├── sketch.txt
│   └── storage
├── frontend
│   ├── LICENSE
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   ├── src
│   └── tailwind.config.js
└── readme.md

```

## Clone from Github
1. git clone https://github.com/SpoonBuoy/img-dash.git

## Backend Setup : 
1. Install Golang 
2. Install gin : go get -u github.com/gin-gonic/gin
3. cd img-dash/backend
4. PORT=8080
5. run go mod tidy
6. go run main.go


## Frontend Setup : 
1. Install Node.js and npm 
2. Navigate to the frontend directory : cd img-dash/frontend
3. install dependencies : npm install
4. run npm run start


## Acess Frontend from browser :
1. Visit http://localhost:3000.

## Production :
### Common:
1. Change `path` variable in `frontend/service/*` to your machine IP on which it is hosting frontend
2. Change `path` variable in `backend/controller/adminController.go` to your machine IP on which it is hosting backend
### Frontend:

3. cd `./frontend`
4. run `npm build`
5. run `npm run start`

### Backend:
6. cd `./backend`
7. run `go run main.go`

