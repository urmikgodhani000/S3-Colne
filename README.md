# S3 Bucket Project In NodeJs

## Getting Started

To get started with the project, follow the steps below:

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm ci`
3. Start the server: `npm run start:prod`

Now, the API is running locally, and you can start making requests to the endpoints described in the following sections.

## API Endpoints

### 1. User Registration

#### Endpoint: `POST /users/register`

- **Description**: Register a new user
- **Request Type**: `POST`
- **Request Body**:
  - `name`: name of the user.
  - `email`: email of the user.
  - `password`: password of the user.
- **Response**: JSON indicating the newly created user and jwt token.

### 2. User Login

#### Endpoint: `POST /users/login`

- **Description**: Login if user already exist
- **Request Type**: `POST`
- **Request Body**:
  - `email`: email of the user.
  - `password`: password of the user.
- **Response**: JSON indicating the user and jwt token.

### 3. Create Bucket

#### Endpoint: `POST /buckets`

- **Description**: Create new bucket
- **Request Type**: `POST`
- **Request Body**:
  - `name`: Name of the bucket.
- **Response**: JSON indicating the newly created bucket.

### 4. List all Buckets

#### Endpoint: `GET /buckets`

- **Description**: Get all the buckets which is created by the current user.
- **Request Type**: `GET`
- **Response**: JSON indicating the names of all the buckets available.

### 5. Create Folder

#### Endpoint: `POST /objects/folder`

- **Description**: Create a folder inside a bucket or inside another folder.
- **Request Type**: `POST`
- **Request Body**:
  - `name`: name of the folder
  - `parent_id`: parent id can be either an bucket or an another folder.
- **Response**: JSON indicating the newly created folder.

### 6. Create File

#### Endpoint: `POST /objects/file`

- **Description**: Create a files inside a bucket or inside another folder.
- **Request Type**: `POST`
- **Request Body**:
  - `parent_id`: parent id can be either an bucket or an another folder.
- **Response**: JSON indicating the newly created files and file url.

### 7. Stream/ Download File

#### Endpoint: `GET /objects/file/:file_id`

- **Description**: download a file using file_id
- **Request Type**: `GET`
- **Response**: file buffer in stream to consume it client side

### 8. List All Objects

#### Endpoint: `GET /objects/:parent_id`

- **Description**: list all available objects inside a given parent id
- **Request Type**: `GET`
- **Response**: JSON indicating all the available folders and objects

### 9. Delete Object

#### Endpoint: `DELETE /objects/:object_id`

- **Description**: delete object using object's object id
- **Request Type**: `DELETE`
- **Response**: JSON indicating the status of whether object is deleted or not.

## File Structure

The project has the following structure:

- `middleware`: Contains middleware functions for file upload and update.
- `controllers` : Contains controller functions for the defined API endpoints.
- `validators`: Contains JSON Schema validators for validating req.body.
- `models`: Contains the Mongoose model for buckets and files.
- `utils`: Contains utility functions, including the function to delete a folder and its associated files.
- `objects`: Directory where uploaded files are stored.
- `routes`: Contains the API routes and controllers.
