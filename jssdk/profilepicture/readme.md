# Profile Picture API (Issue #20)

## Objective

Create a secure, mock API to upload, retrieve, update, and delete a user’s profile picture on the Profile Page. This includes:

- A backend powered by **AWS Lambda**, **API Gateway**, **Cognito**, and **S3**
- A frontend (e.g., React) integrated with the API using **Axios** and **Cognito auth tokens**


## Architecture Overview

Frontend (React/Next.js)
↓ Axios + Cognito Token
API Gateway (REST)
↓ Lambda Proxy Integration
AWS Lambda Function
↓
Amazon S3 (Profile Picture Storage)


## Authentication & Access Control

- Uses **Amazon Cognito User Pools** to authenticate users
- Access to the API is protected via a **Cognito Authorizer** in API Gateway
- Each profile picture is uniquely tied to the user’s Cognito `sub` (UUID)
- Access to **S3** is restricted via **IAM policies**, allowing only the user to manage their image

## AWS Services Used

We use Amazon S3 to securely store user profile pictures. The core logic for handling upload, retrieval, update, and deletion is implemented using AWS Lambda. API Gateway provides a RESTful interface to expose the Lambda function as publicly accessible HTTP endpoints. Amazon Cognito manages user authentication and identity, ensuring that only authorized users can access the API. Finally, IAM (Identity and Access Management) is used to define fine-grained permission boundaries, allowing Lambda to access S3 securely while enforcing least-privilege principles.


## API Endpoints Description

The system supports four HTTP methods to manage profile pictures:
	•	POST /profile-picture — Upload a new profile picture
	•	GET /profile-picture — Retrieve the current profile picture URL for the authenticated user
	•	PUT /profile-picture — Update the existing profile picture
	•	DELETE /profile-picture — Delete the user’s current profile picture from storage


 ## Note: The index.js and the IAM policy JSON file are intended for deployment in AWS. They are included here for convenience and reference.