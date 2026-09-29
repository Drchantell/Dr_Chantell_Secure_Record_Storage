Secure Record Storage API

Project Overview

For this lab, I built a secure notes API using Node.js, Express, MongoDB Atlas, Mongoose, bcrypt, and JSON Web Tokens.

My main goal was to make sure each user could only see and manage their own notes. I connected every note to the user who created it by saving that user's ID with the note.

What I Learned

I learned that authentication and authorization are not the same thing.

Authentication checks that I am logged in.

Authorization checks what I am allowed to access or change after I log in.

I also learned how to connect a note to its owner by using req.user._id when the note is created.

How I Used MongoDB and Mongoose

I used MongoDB Atlas as my database.

I used Mongoose to connect my Express app to MongoDB and to create my User and Note models.

My Note model uses timestamps: true, so Mongoose automatically adds createdAt and updatedAt to each note.

Security Features

- I used bcrypt to hash passwords before saving them.
- I used JWT tokens to protect the note routes.
- I made sure users only get their own notes.
- I blocked users from updating or deleting another user's notes.
- I return a 403 response when a user tries to access a note they do not own.
- I keep my .env file out of GitHub with .gitignore.
- I removed the password field from user JSON responses so the password hash is not sent back by the API.

API Routes

POST /api/users/register

I use this route when I want to create a new user account.

POST /api/users/login

I use this route to log in and receive a JWT token.

GET /api/notes

I use this route to get only the notes that belong to the logged-in user.

GET /api/notes/:id

I use this route to get one note if it belongs to the logged-in user.

POST /api/notes

I use this route to create a new note and connect it to the logged-in user.

PUT /api/notes/:id

I use this route to update a note only if the logged-in user owns it.

DELETE /api/notes/:id

I use this route to delete a note only if the logged-in user owns it.

How I Run the Project

1. I install the dependencies with:

npm install

2. I create a .env file and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3001

3. I start the server with:

npm start

4. I use Postman or another API testing tool to test my routes.

For protected note routes, I send my JWT token in the Authorization header:

Authorization: Bearer YOUR_TOKEN

Challenges

One challenge for me was understanding the difference between simply being logged in and actually having permission to change a record.

I solved this by adding a user field to the Note model and saving req.user._id when a note is created. Then I compared the note owner's ID with the logged-in user's ID before allowing an update or delete.

I also had to understand how JWT authentication, MongoDB, Mongoose, and environment variables work together. This project helped me see how each part connects to make an API more secure.

Author: Dr. Chantell McDowell, Per Scholas Student
