# pcloud2gdrive

When faced with the need to migrate from one cloud storage service to another, I didn't like the idea of manually downloading and re-uploading all my files - especially with my *quality* Australian internet connection.

Naturally I did what any creative problem solver would do, and wasted far more time than the upload ever would have taken on building my own application that would automtate the process.

Presenting **pcloud2gdrive:** a tool for migrating data from pCloud Drive to Google Drive built using:
- REACT.js
- NODE.js
- Firebase / Firestore
- PostgreSQL
- Google Drive/pCloud SDKs

**Live demo:**  *link coming soon*

**Screenshots:** 

<p align="center">
  <img src="https://github.com/mountmike/pcloud2gdrive/blob/main/client/public/images/planning/screenshot1.gif" />
</p>

# Planning
### Testing the concept
After messing around with the Gdrive & pCloud APIs in NODE, I was able to make a function that copied files from an origin cloud folder to a destination cloud folder via the /tmp folder. This left me feeling optimistic so I began imagining a GUI.

## UI Wireframe
![Screenshot of main app wireframe](https://github.com/mountmike/pcloud2gdrive/blob/main/client/public/images/planning/Mainwireframe.png)
![Screenshot of current tasks page wireframe](https://github.com/mountmike/pcloud2gdrive/blob/main/client/public/images/planning/Currenttaskspage.png)
![Screenshot of add task page wireframe](https://github.com/mountmike/pcloud2gdrive/blob/main/client/public/images/planning/Addtaskpage.png)

## Basic architecture
Originally I set up an EXPRESS.js server and PostgreSQL db to handle all the backend but after messing around with Firebase on another project I decided to also implement some Firebase features into my backend to keep track of tasks and more easily store the list of files necessary for a transfer task.
![Diagram of app architecture](https://github.com/mountmike/pcloud2gdrive/blob/main/client/public/images/planning/architecture.png)

# Challenges

## 1. Getting and **storing** oAuth tokens from Gdrive & pCloud.
Before any API operations could be made, I needed to get and store oAuth access tokens. Navigating this was a steep learning curve in itself and upon initially setting up end points on my server to recieve the tokens I was then left with an even more puzzling question of how and where to store the token so that my backend could access them everytime I needed to perform an API request.

For the time being I decided to store the tokens in the session. I was using [connect-pg-simple](https://www.npmjs.com/package/connect-pg-simple) to store the session in my Postgres db anyway so while it didn't seem like a perfect solution, I thought it would work for now with future thoughts to re-assess.

## 2. Reading cloud storage folder trees and rendering recursively with React
With my API routes setup, I was fetching data from my cloud file systems in React but how to navigate and render subfolders wasn't immediantly obvious. I knew that a recursive function would be the best approach and set about building a React `<Folders />` component that would recursively re-render as more data was requested. I implemented a collapable tree design for each of the folders with a radio selector for chosing the folder you want to work with.

![Screenshot of Folders React components](https://github.com/mountmike/pcloud2gdrive/blob/main/client/public/images/planning/react_folders.png)

## 3. Creating and storing a task in Firestore
    - creating file path for origin/target
    - building fileList

## 4. Actually running the transfer process/function
    - easy enough to transfer 1 folder full of files but what if there's sub folders???
        - recursive function
        1. create folder tree on server with fs
        2. download files from pcloud
        3. create folder tree in gdrive
        4. upload files to gdrive
        5. delete the tmp folder on server

## 5. Tracking task progress while it runs
    - creating progress bar
    - writing to db everytime a file is downloaded/uploaded increasing a counter.
    - function to read count variable and convert to a %
    **async ISSUES**

# Future thoughts:
- move users db to firestore
- add task scheduling
- build out file browser for each cloud storage from within my app
    - CRUD folders