# Drill and Practice Application Documentation

## Overview

The **Drill and Practice** application is a web-based platform designed to facilitate learning through quizzes and topic-based questions. Users can create topics, add questions, and participate in quizzes to test their knowledge. The application follows a three-tier architecture, with a client-side interface, server-side logic, and a database to store information securely.

## Running Locally

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/drill-and-practice.git
   ```

2. Navigate to the project directory:

   ```bash
   cd drill-and-practice
   ```

3. Use Docker Compose to launch the application:

   ```bash
   docker-compose up
   ```

4. Open your browser and go to [http://localhost:7777](http://localhost:7777) to access the application.

## Project Structure

The project follows a modular structure:

- **app.js**: Main entry point for the Oak application.
- **run-locally.js**: Script for launching the app
