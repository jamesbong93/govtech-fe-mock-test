# Use the official Node.js 18 alpine image as a parent image
FROM node:18-alpine

# Set the working directory within the Docker container
WORKDIR /app

# Copy package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install dependencies in the container using yarn
RUN yarn install --frozen-lockfile

# Copy the rest of your app's source code from your host to your container
COPY . .

# Build the app for production
RUN yarn build

# Your app will serve static files from the build directory, so expose the port that your app will run on
EXPOSE 3000

# Serve the app using a static file serving package such as "serve"
# You can install it globally in your image and then use it to serve your static files
RUN yarn global add serve

CMD ["serve", "-s", "build", "-l", "3000"]
