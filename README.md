# Ensemble-Client

## Live Link
[Link](https://62d72ddfb37fce2eea6ee563--ensemble-closet.netlify.app/)


[Server Repo](https://github.com/Emily-Herndon/Ensemble-Server)

### Developed by:

Billy Lu, Emily Herndon, Emily Kiss, Angelika Selviyan

### Description:

Picture this. It's a frosty winter morning, and you wake up to the sound of snow pattering against your window. You need to leave for work in ten minutes, and you forgot to pick out your outfit last night! You're so cozy, but you need to get out of your bed, walk on your cold floor, and spend a few minutes browsing through your closet. Is your blue shirt in the laundry? Yes, it is. But you just spent three minutes looking for it.

So sad.

With Ensemble you wont have this problem. You can access your whole closet at the tip of your fingers. Say goodbye to cold, hardwood floors and hello to warm feet in your fluffy blanket.

Ensemble allows you to add, delete and constantly virtually update your closet.

## Technologies Used:

- MongoDB was used to manage document-oriented information
- mongoose was used to handle the interface between the server and mongoDB
- React was used for building composable user interfaces
- Tailwind CSS was used to style
- Mongoose was used to manage relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB
- Axios was used to make HTTP requests from node. js or XMLHttpRequests from the browser
- Jwt-decode helped decoding JWTs tokens
- Bcrypt was used to build passwords for security
- Cors was used to make requests from one website to another website in the browser
- Dotenv allowed us to separate secrets from your source code
- Express helped manage routing, sessions, HTTP requests, error handling, etc
- Jsonwebtoken was used to to share security information between two parties: a client and a server.
- Cloudary was used to upload images to be referenced as URLs
- Multer was used to handle multipart form data on the server
- flowbite/flowbite-react was used for modals and other styling things
- react-router-dom allowed for routing methods on the client side
live - react-icons was used for icons
- react-responsive-carousel was used to create carousel


## INSALLATION INSTRUCTIONS 

- Fork and clone
- Enter npm install in the terminal
- Install MongoDb
- Enter nodemon on the server
- Enter npm run start on the client



## User Stories:

- As a logged out user, I want to be able to register an account.
- As a logged out user, I want to be able to log in to my account.
- As a logged in user, I want to upload each clothing piece in my closet.
- As a logged in user, I want my closet & outfit choices to be visible only to me.
- As a logged in user, I want to see each piece clothing.
- As a logged in user, I want to be able to edit a piece of uploaded clothing (unless I specifically share them).
- As a logged in user, I want to be able to delete a piece of uploaded clothing.
- As a logged in user, I want be able to visualize an outfit without leaving my bed.
- As a logged in user, I want be able to save my favorite combinations of clothing.

## MVP Requirements:

- [ x ] User able to upload photos of each of their clothing items
- [ x ] User able to categorize outfit pieces
- [ x ] The app has full CRUD functionality

## Stretch Goals:

- [ ] User able to see pieces together/ clothing pieces displayed in stacked carousels
- [ ] Accessories component
- [ ] AI models for clothing
- [ ] Users are able to publicly post outfits
- [ ] Clothing displays on a carousel
- [ ] User able to visualize outfit on themselves
- [ ] User able to choose from selection of premade color themes
- [ ] User able to make their own color theme

## Views:

![](https://i.imgur.com/nahQOsL.png)

## RESTful Routing Chart:
![](https://i.imgur.com/y1G4DAX.png)

## ERD:
![](https://i.imgur.com/WlPTRpP.png)