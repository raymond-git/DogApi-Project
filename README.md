# Dog Api Project Work in Progress...
# Dog Api Project
**Author:** Raymond Huang

**Project Title:** Dog Breeds Information Website  

**Project Description:** People can visit our dog breed website that features random images of dogs for many reasons. Some people may simply enjoy looking at pictures of dogs, as they find them cute and endearing. Others may be looking for inspiration or ideas for a specific breed of dog that they are interested in adopting. For example, a person might visit a website with random images of dogs to get a better sense of what a particular breed looks like in terms of size, coat color, and overall appearance. Additionally, a website with random images of dogs could be a fun way to pass the time and take a break from other tasks or responsibilities. Overall, a website with random images of dogs can provide enjoyment, education, and inspiration for people who are interested in these beloved animals. That is why we created this page.  

**Main Features Include:**
- Search Function: Allows users to filder breeds by type. Each breed contains information about their height, weight, breed group, lifespan, and temperament
- Drop-down menu: Provide users with the ability to view images of specific breeds by selecting them from a drop-down menu
- Button Generator: Include a button that allows users to generate random dog images
- MongoDB Atlas: Utilizing MongoDB Atlas to securely store user sign-up credentials, such as email and password, and allowing users to authenticate themselves by verifying their credentials.  
  
**How to Install and Run the Project**  
- "git clone"
- "npm install" or npm "install -g npm" to download the latest version of npm
- "npm start" to execute a startup script 
- "npm install mongoose" to install the Mongoose library for Node.js. By installing Mongoose, you will be able to use its API to connect to a MongoDB database, define your data models, and perform CRUD (create, read, update, and delete) operations on the data.
- In addition to running "npm start", make sure to also execute "node frontend.js" to initiate both the client and server-side simultaneously for handling requests and responses. So make sure to have two terminals open to run.  
- If you wish to start the localhost server automatically without needing to run "node frontend.js" every time, you can use a process manager such as PM2. For more information, refer to the documentation at https://pm2.io/docs/runtime/overview/
- For my project, I utilized two distinct API's to gather data about dogs. One is the Dog API available at https://dog.ceo/dog-api and the other is the Dog API, which can be accessed at https://documenter.getpostman.com/view/4016432/the-dog-api/RW81vZ4Z
- I used mongodb atlas to store my data so make sure to go to the MongoDB Atlas website https://www.mongodb.com/cloud/atlas and sign up a free account. Refer to their documentation to set up configuration. It is important to create a .env file in the same directory as your server.js or frontend.js file, in order to securely store your special key or password. This will allow you to securely connect to your code

**MongoDB Installation Setup**  
- Download MongoDB: Go to the MongoDB website (https://www.mongodb.com/download-center/community) and download the appropriate version for your operating system.  
- Create a data directory: MongoDB stores its data files in a specific directory. By default, the data directory is located in the root directory, but you can specify a different location. On Windows, create a folder called "C:\data\db". On Linux, create a folder called "/data/db" in the root directory.  
- Extract the downloaded MongoDB package: Extract the contents of the downloaded MongoDB package to a location of your choice. On Windows, you can extract the files to "C:\Program Files\MongoDB". On Linux, you can extract the files to "/usr/local/mongodb".  
- Create a configuration file: MongoDB uses a configuration file to specify its settings. Create a new file called "mongod.cfg" in the same directory where you extracted the MongoDB files. Inside the file, specify the path to the data directory you created in step 2. For example, on Windows, the configuration file should contain the following line: "dbpath=C:\data\db". On Linux, the configuration file should contain the following line: "dbpath=/data/db".
- Add MongoDB to the system PATH: On Windows, add the MongoDB binary directory (e.g., "C:\Program Files\MongoDB\Server\4.4\bin") to the system PATH. On Linux, add the MongoDB binary directory to the PATH environment variable.
- Start MongoDB: Open a command prompt and navigate to the directory where you extracted the MongoDB files. Use the command "mongod --config <path_to_config_file>" to start the MongoDB server. For example, on Windows, the command would be "mongod --config C:\Program Files\MongoDB\mongod.cfg". On Linux, the command would be "mongod --config /usr/local/mongodb/mongod.cfg"
- Connect to MongoDB: Open a new terminal window and use the command "mongo" to connect to the MongoDB server. This will open the MongoDB shell, where you can interact with the database.
- Create a database: To create a new database, use the command "use <database_name>". For example, "use mydb" will create a new database called "mydb".

**Website Design using Figma**
![Figma1](https://user-images.githubusercontent.com/52261775/214488688-a73e3932-7148-427c-8d40-49ffa9152f90.PNG)
View the full design on Figma: https://www.figma.com/file/oqjd9oMmKcQzQCaVewdxd9/Dog-Breed?t=59RGOsZahefux1Uz-1

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
