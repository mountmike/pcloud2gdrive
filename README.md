# pcloud2gdrive

When faced with the need to migrate from one cloud storage service to another, I didn't like the idea of manually downloading and re-uploading all my files - especially with my *quality* Australian internet connection.

Naturally I did what any creative problem solver would do, and wasted far more time than the upload ever would have taken on building my own application that would automtate the process.

Presenting **pcloud2gdrive:** a tool for migrating data from pCloud Drive to Google Drive built using:
- REACT.js/React Router 
- NODE.js
- Firebase / Firestore
- PostgreSQL
- Google Drive/pCloud SDKs
- Material UI/Bootstrap/Font Awesome

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

## 3. Creating and storing a task in Firestore Database
The reason I wanted to use Firebase in the first place was it seemed like a great way to store a long list of files, each with it's own metadata. My schema idea was to have a sub-collection called "fileList" on each "task" document and each file could be a document in this sub-collection. This worked well.

Another feature I wanted was to store a file path string for both the origin and target folders - more for the UI than anything else. I thought this would be easy info to extract from the APIs but in the end the only way to achieve this was to write function that queries a folder id, grabs the folder name then recursively queries the parent folder until it reaches the root directory.

## 4. Actually running the transfer process/function
While I was able to transfer a single folder full of files quite easily, to take on a more realistic task with a number of nested subfolders was a a whole ’nother process. 

**This is where I spent most of my time on this project**

In short I had to write a function that could handle all these tasks in a recursive loop based on whether or not there were folders in a directory. 

    1. create folder tree on server with fs
    2. download files from Pcloud
    3. create folder tree in Gdrive
    4. upload files to Gdrive
    5. delete the tmp folder on server

## 5. Tracking task progress while it runs
Next up I wanted a graphical read on the progress of a running task. As I was using multiple libraries for transfering data there I couldnt easily utilise any built in methods for this and decided to build my own. I needed to count each sucessful download and upload and track the count in the database. After some reading I utilised Firestore's distributed counters function which allowed the counter to be updated more than once per second. I then built a component in **React** that would read this value, convert to a percentage based on total files and update accordingly.

# Future thoughts:
    - move users db to firestore / task processing to a FAAS?
    - add task scheduling
    - build out file browser for each cloud storage from within my app
        - CRUD folders