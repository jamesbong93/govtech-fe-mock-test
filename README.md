
# [Project Name]
This project was bootstrapped with Create React App.

## Available Scripts
In the project directory, you can run:

### `yarn start`
Runs the app in the development mode.Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

### `yarn test`
Launches the test runner in the interactive watch mode.

### `yarn build`
Builds the app for production to the `build` folder.

### `yarn eject`
**Note: this is a one-way operation. Once you eject, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

## Setting Up the Environment Variables
Create a .env file: In the root directory of your project, create a file named `.env`.

### Get a Google API Key:
- Go to the [Google Cloud Platform Console](https://console.cloud.google.com/).
- Create a new project or select an existing one.
- Navigate to the "APIs & Services" dashboard and click on “Credentials”.
- Click on “Create Credentials” and choose “API key”.
- Once your API key is generated, restrict it as necessary for security purposes.

### Update .env File:
Open your `.env` file and add the following line:
```
REACT_APP_GOOGLE_API_KEY=Your_Google_API_Key_Here
```
Replace `Your_Google_API_Key_Here` with the actual API key you obtained from the Google Cloud Platform.

### Accessing Environment Variables in the App:
In your React application, you can access this environment variable using `process.env.REACT_APP_GOOGLE_API_KEY`.

## Learn More
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
