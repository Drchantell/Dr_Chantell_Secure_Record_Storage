 Secure Record Storage API

A notes API built with Express, MongoDB, and JWT authentication. Users can only view, update, or delete their own notes.

Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Create a `.env` file in the project folder:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_long_random_secret
   PORT=3001
   ```

3. Start the server:

   ```sh
   npm start
   ```

 API

- `POST /api/users/register` - Create an account.
- `POST /api/users/login` - Log in.
- `GET /api/notes` - List your notes.
- `GET /api/notes/:id` - Get one of your notes.
- `POST /api/notes` - Create a note.
- `PUT /api/notes/:id` - Update one of your notes.
- `DELETE /api/notes/:id` - Delete one of your notes.

For note routes, send the token returned by register or login as a bearer token:

```http
Authorization: Bearer YOUR_TOKEN
```

To check ownership, create a note with one account, then try to access or change it using a second account. The second account should not be able to change that note.

Keep your `.env` file and its secrets private.
