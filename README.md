# Onward Financial Wellness Survey

### **Team**

- PM / TL: Daniel Tian, Grace Jiang
- Software Developers: Abhishek Pandya, Daniel Barra, Eric Chen, Ivan Esmeral, Mohamed Abaker, Silvi Kabra

### **Product Overview**

The financial survey is a tool for both registered employers and visitors to learn more about their employee’s financial habits. A current employer can request for the financial survey to be sent to his/her employees, and employees can fill out the survey with anonymized information. The aggregated data report will be sent back to the employer.

## Features

Essentially, here're some of its features:

- JWT-based user authentication / authorization system
- Silent refresh / access token retrieval
- Clean mono-repo structure with Express Server and React Client
- Code linting setup according to Airbnb standards
- Able to connect to MongoDB and WebSockets
- Pretty UI using Bulma and Styled Components
- Easy deployability on Heroku (literally 3 steps, it's really easy)

## Setting Up (for Development)

#### Recommended Tools Checklist

- Git Clone this repository
- Create a [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas)
- Create a [Heroku account](https://www.heroku.com/)
- Install [Node.JS](https://nodejs.org/en/download/)
- Install [Yarn Package Manager](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

#### Installing Requirements

```bash
$ git clone https://github.com/hack4impact-upenn/onward-survey.git
$ cd onward-survey
$ yarn setup
```

#### Configuring Enviromental Variable

Create file called ".env.development" in "./config", it should look something like the following:

```
ATLAS_URI=mongodb-connection-string-placeholder
JWT_SECRET=my-secret-jwt-key-placeholder
SENDGRID_API_KEY=xxxxxxxxxxxxxxxxxx
SENDGRID_EMAIL=xxxxxxxxxxxxxxxxxx
CLIENT_URL=xxxxxxxxxxxxxxxxxx
```

Then, create another file called ".env" in "src/client", it should look like the following. Note this is only needed for Development, and not needed for Production.

```
REACT_APP_API_URL="http://localhost:5000"
```

#### Running Project

```bash
$ # run both server and client
$ yarn dev
$ # run server only
$ yarn server
$ # run client only
$ yarn client
```

#### Running Tests

```bash
$ # for server only
$ yarn test
$ # for client only
$ cd src/client && yarn test
```

## To Deploy (for Production)

#### Heroku

Deploying this project on Heroku is dead simple. Basically, go on Heroku and create a new Heroku app, connect your project Github to your new Heroku app, and hit Deploy. Note, that you will need to configure the enviromental variable under settings.

#### AWS

TBD
