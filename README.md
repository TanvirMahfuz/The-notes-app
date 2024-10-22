**Backend Setup**

**install node.js**

**install mongodb**

**install git**

**Clone the repository:**

```bash
git clone https://github.com/TanvirMahfuz/The-notes-app.git

```

**Navigate to the project directory:**

```bash
cd The-notes-app
cd backend
```

### For congiguration

1.  Create a file named `.env` in the app directory.
2.  Add the following code to the `.env` file and modify as per your requirements:

```bash
ACCESS_TOKEN_SECRET= "add your secret key here"
REFRESH_TOKEN_SECRET="add your secret key here"
ACCESS_TOKEN_EXPIRE_TIME="23h"
REFRESH_TOKEN_EXPIRE_TIME="30d"
MONGODB_URL="add your mongodb url here"
PORT = 3000

```

**Install dependencies:**

```bash
npm install
```

**Start the development server:**

```bash
npm run dev

```

**Open postman and visit http://localhost:3000/api/home to view the project.**

## API Endpoints

| Method | Endpoint                            | Description                                |
| ------ | ----------------------------------- | ------------------------------------------ |
| GET    | `/api/home`                         | Open the home page                         |
| GET    | `/api/user/register`                | Get the registration form                  |
| POST   | `/api/user/register`                | Register a new user                        |
| GET    | `/api/user/log-in`                  | Get the login form                         |
| POST   | `/api/user/log-in`                  | Log in an existing user                    |
| GET    | `/api/user/`                        | Retrieve the profile of the logged-in user |
| GET    | `/api/user/edit`                    | Get the profile edit form                  |
| POST   | `/api/user/edit`                    | Update the profile of the logged-in user   |
| GET    | `/api/notes/:name`                  | Get the note by name                       |
| GET    | `/api/notes/new-note`               | New Note form                              |
| POST   | `/api/notes/new-note`               | Add a new Note                             |
| GET    | `/api/notes/edit-page?id=<note_id>` | Get the edit form for note                 |
| DELETE | `/api/notes/edit-page?id=<note_id>` | Delete the note                            |
| POST   | `/api/notes/edit-page`              | Update the note                            |
| GET    | `/api/notes/:name`                  | Get one note by note                       |
| GET    | `/api/discussion/`                  | Shows the whole discussion                 |
| GET    | `/api/discussion/publisher`         | Get the publisher profile                  |

### Authentication

- All routes except `/api/user/register` and `/api/user/login` require authentication. Use a valid JWT token in the request headers for protected routes.

### Authorization

- both methods `/api/user/edit-page` and `/api/user/edit` require authorization. uses request data and database call to see if the user is authorized to edit the profile.

### Demo request body

## for registration

```bash
{
    "name":"user1",
    "email":"tanvirmahfuz221@gmail.com",
    "password":123456,
    "confirmPassword":123456
}
```

## for login

```bash
{

    "email":"tanvirmahfuz221@gmail.com",
    "password":123456

}

```

## For Note

```bash
{
topic:"topic",
description:"description",
file:"file"
}
```
