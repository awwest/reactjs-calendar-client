## Description

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

A basic Calendar application using NestJS, Mongoose, and React.

The code for this application is split into two repos, one for the server and one for the client. Each repo will need to be downloaded to the same containing directory, so that client and server directories are siblings.

From the parent directory, run

```bash
$ cd reactjs-calendar-client
$ npm install
$ npm run build
$ cd ../nestjs-calendar-server
$ npm install
$ npm run start
```

Navigate to localhost:3000 in the browser.

Changes to the React application will not show up until it is built, as NestJS is serving the build file. Running the React application in development mode will not connect to the server.

This application does not yet feature user authentication, so it only provides support for one global user. Authentication with JSON Web Tokens and Passport is planned to support multiple users.

Event notifications are mocked, and are currently mocked as email messages. Invites are not currently handled. Push notifications using the Push API with service workers are next for notifications.

Component styles are a work in progress, meant to be updated with a UI library.

Date formatting is implemented in an ad hoc manner in React. A better approach would have been to use Moment.js to achieve consistent date/time formats. 

Types on the client side should be updated for more confidence in data handling.

Development work would be eased if React development mode were configured to run along with the NestJS server, rather than requiring a build for each change.

Test coverage is not comprehensive.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
