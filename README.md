# aplantida

<br>

## Description

This is app aims to help people recover the lost knowledge of plants. The app helps you to identify plants and its uses with a focus on edibility and medicinal characteristics.

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up in the platform so that I can start searching for plants
- **Login:** As a user I can login to the platform so that I can search for plants
- **Logout:** As a user I can logout from the platform so no one else can use it on my behalf
- **Add&Delete Reviews** As a user I can add a review on a plant
- **Edit profile** As a user I can edit my profile
- **Search DB** As a user I can search the plants DB in different ways
- **Plant Detail** As a user I can see the full information of a plant

## Backlog

- Add a community / forum
- Add maps
- Add a store
- Search by: sintoms, detox, disease
- Add filtering
- Expand DB
- Phone app
- Advise section
- Private Messaging
- Notifications
- Email validation
- Video section

<br>

# Client / Frontend

## React Router Routes (React App)

| Path         | Component       | Permissions                | Behavior                                                      |
| ------------ | --------------- | -------------------------- | ------------------------------------------------------------- |
| `/`          | SplashPage      | public `<Route>`           | Home page                                                     |
| `/signup`    | SignupPage      | anon only `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`     | LoginPage       | anon only `<AnonRoute>`    | Login form, link to signup, navigate to homepage after login  |
| `/logout`    | n/a             | user only `<PrivateRoute>` | Navigate to homepage after logout, expire session             |
| `/menu`      | MenuPage        | user only `<PrivateRoute>` | Options menu                                                  |
| `/plants`    | PlantsListPage  | user only `<PrivateRoute>` | Shows all plants in a list                                    |
| `/plant/:id` | PlantDetailPage | user only `<PrivateRoute>` | Details of a plant                                            |
| `/profile`   | ProfilePage     | user only `<PrivateRoute>` | Edit personal data, reviews, liked plants                     |
|              |                 |                            |                                                               |
|              |                 |                            |                                                               |
|              |                 |                            |                                                               |
|              |                 |                            |                                                               |

## Components

- LoginPage
- SignupPage
- SplashPage
- PlantsListPage
- PlantCard
- MenuPage
- ProfilePage
- PlantDetailPage
- SearchBar
- Navbar
- ErrorPage

## Services

- Auth Service
  - auth.login(userObj)
  - auth.signup(userObj)
  - auth.logout()
  - auth.me()
- Plants Service

  - plants.list()
  - plant.detail(id)

* Review Service

  - review.add(reviewObj)
  - review.delete(id)

* User Service

  - user.getDetails(id)
  - user.edit(userObj)
  - user.delete(id)

<br>

# Server / Backend

## Models

User model

```javascript
{
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  fName: String,
  lName: String,
  image: String,
  genre: String,
  reviews: [{type: Schema.Types.ObjectId,ref:'Review'}]
  favorites: [{type: Schema.Types.ObjectId,ref:'Plant'}]
}
```

Plant model

```javascript
 {
   'common name': {type: String, required: true},
   'latin name': {type: String, required: true},
   img: [{type: String}],
   characteristics:{
       Family:{type: String},
       'USDA hardiness':{type: String},
       'known hazards':{imgUrl: String, text: String},
       habitats: String,
       range: String,
       'Edibility Rating': String,
       'Other uses': String,
       'Weed potential': String,
       'Medicinal Rating': String,
       care: {imgUrl:[String]},
   },
   reviews: [{type: Schema.Types.ObjectId,ref:'Review'}],
   liked: Number
 }
```

Review model

```javascript
{
  title: {type: String, required: true},
  text: String
  user: {type: Schema.Types.ObjectId,ref:'User'}
  Plant: {type: Schema.Types.ObjectId,ref:'Plant'}
  Likes: Number
  stars: Number
}
```

## API Endpoints (backend routes)

| HTTP Method | URL                | Request Body                                  | Success status | Error Status | Description                                                                                                                     |
| ----------- | ------------------ | --------------------------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET         | `/auth/profile`    | Saved session                                 | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/auth/signup`     | {fName, lName, email, genre, password}        | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`      | {email, password}                             | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout`     | (empty)                                       | 204            | 400          | Logs out the user                                                                                                               |
| GET         | `/plants`          |                                               | 200            | 404          | Show all plants                                                                                                                 |
| GET         | `/plant/:id`       | {id}                                          | 200            | 404          | Show specific plant                                                                                                             |
| PUT         | `/user/:id`        | {image, email, password, lName, fName, genre} | 200            | 400          | Edit Profile                                                                                                                    |
| DELETE      | `/user/delete/:id` | {id}                                          | 201            | 400          | delete user                                                                                                                     |
| DELETE      | `/review/:id`      | {id}                                          | 200            | 400          | delete review                                                                                                                   |
| POST        | `/review/`         | {title, text, user...}                        | 201            | 400          | Create and save a new tournament                                                                                                |

<br>

## Links

### Trello/Kanban

[Link](https://trello.com/b/FUZVT7Dn/aplantida)

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/skanndar/aplantidaFront)

[Server repository Link](https://github.com/skanndar/aplantidaBack)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
