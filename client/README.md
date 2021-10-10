# Front-end React Social Media app

port is set to 4000

-   View the backend [here](https://github.com/kawgh1/mern-social-media-rest-api)
-   View the socket.io implementation [here](https://github.com/kawgh1/mern-social-media-socket-io)
-   Based on project by [LamaDev](https://www.youtube.com/watch?v=zM93yZ_8SvE&list=PLj-4DlPRT48lXaz5YLvbLC38m25W9Kmqy&index=2)

-   spin up using **npm start** and **http://localhost:4000**
-   backend is on http://localhost:8800

Log in using "john@gmail.com" pw='123456'

## Features

-   MERN Stack Social Media App
-   All user data is tied to back end MongoDB database and server
-   Users can...
    -   register and log in
    -   view other user's profiles
    -   post text and images
    -   Follow and unfollow other user's
    -   Like and unlike user posts

## Tools Used

-   ### Axios

    -   npm install axios

-   ### Material UI
    -   npm install --save @material-ui/core
    -   npm install --save @material-ui/icons
-   ### React Router
    -   npm install react-router-dom
    -   #### Documentation
    -   https://reactrouter.com/web/guides/quick-start
-   ### CSS Gradient Generator

    -   https://cssgradient.io/

-   ### Timeago.js

    -   npm install timeago.js
        -   https://timeago.org/

-   ### React Context API

    -   Context provides a way to pass data through the component tree without having to pass props down manually at every level.

    -   #### Documentation
        -   https://reactjs.org/docs/context.html

-   ### MongoDB (Backend)

    -   Set up MongoDB Cloud Cluster online
        -   https://cloud.mongodb.com
            -   For DB User and IP Address Config go to
                -   Network Access - Atlas - IP AcessList

-   ### Socket.io (Backend)
    -   Setup Socket.io in [this](https://github.com/kawgh1/mern-social-media-socket-io) repository

## Things I added

-   neon text shadow
-   textShadow:
    "0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18",
    }}

-   Most styling, all responsive design
-   mobile topbar dropdown menu
    -   https://ibaslogic.com/how-to-add-hamburger-menu-in-react/
-   mobile bottombar for navigation between pages
-   Custom scrollbars
-   Accurate Comment and Like Counter w/ proper English in Post.js

        <span className="postLikeCounter">
            {like > 0 ? (
                like === 1 ? (
                    <p>{like} person likes it</p>
                ) : (
                    <p>{like} people like it</p>
                )
                ) : (
                ""
            )}
        </span>

-   User Sign Out functionality
-   Got User profile images to show within the chatbox 'messenger' chat application

-   ## Connecting to Node Rest API

    File: package.json

        "proxy": "http://localhost:8800/api"

-   ## Extras

-   Custom user posts only on User Profile page using javascript filter method, instead of targeting the Feed component

    -   https://upmostly.com/tutorials/react-filter-filtering-arrays-in-react-with-examples

-   ## Context
    File: context/AuthContext.js

INITIAL_STATE = {
user: null,
isFetching: false,
error: false
}

&#8595;

**ACTION 1**
LoginStart({mail:john@gmail.com, password: 54324})

&#8595;

**REDUCER**
&#8595; update context state

NEW_STATE = {
user: null,
isFetching: true,
error: false
}

&#8595;

**ACTION 2 (success)**
LoginSuccess({username:john, mail:john@gmail.com, profilePicture:image.png, coverPicture:cover.png, followers[], following[], isAdmin:false})

&#8595;

**REDUCER**

&#8595; update context state

NEW_STATE = {
user: {username: john, mail: john@gmail.com ...}
isFetching: false,
error: false
}

**////////// OR //////////**

**ACTION 2 (failure)**
LoginFailure({error})

&#8595;

**REDUCER**

&#8595; update context state

NEW_STATE = {
user: null,
isFetching: false,
error: true
}

## On Post

-   When a user uploads an image on a post, it goes to the backend Node server
-   Obviously this is a horrible idea for a production social media app
    -   Should use AWS S3 or similar, but this is for demo and simplicity
-   Using Multer package
    -   Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
-   https://www.npmjs.com/package/multer

## ESLint Help with Hooks

**npm install eslint-plugin-react-hooks --save-dev**
https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
