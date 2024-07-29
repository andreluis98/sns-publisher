# Node.js Express Application with AWS SNS Integration

This is a Node.js application built with Express that handles POST requests to publish messages to an AWS SNS (Simple Notification Service) topic. The request body is validated using the Zod library.

## Features

- Validates incoming request body using Zod
- Publishes messages to an AWS SNS topic
- Handles errors gracefully and returns appropriate HTTP status codes

## Prerequisites

- Node.js (>=14.x)
- AWS Account
- AWS SNS Topic
- AWS IAM user with appropriate permissions to publish to SNS

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root of the project and add the following environment variables:

   ```bash
   AWS_ACCESS_KEY_ID=your-aws-access-key-id
   AWS_ACCESS_SECRET_KEY=your-aws-secret-access-key
   AWS_TOPIC_ARN=your-aws-sns-topic-arn
   PORT=3000
   ```

## Usage

1. Start the application:

   ```bash
   npm start
   ```

2. The application will be running on the port specified in the `.env` file. By default, it will run on port 3000.

3. Send a POST request to `http://localhost:3000/nfe` with the following JSON body:

   ```json
   {
     "url": "https://example.com/your-url"
   }
   ```

   Ensure that the URL is a valid URL.

## API Endpoints

### POST /nfe

Publishes a message to an AWS SNS topic.

#### Request Body

```json
{
  "url": "string (valid URL)"
}
```

#### Response

- `201 Created` on success
- `400 Bad Request` if the request body is invalid
- `500 Internal Server Error` if there is a server error

#### Example Response

```json
{
  "success": true
}
```

## Error Handling

- If the request body is invalid, a `400 Bad Request` response is returned with details about the validation error.
- If there is an error publishing the message to SNS or any other server error, a `500 Internal Server Error` response is returned.
