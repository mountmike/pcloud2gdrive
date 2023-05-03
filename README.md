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

![Animated gif of working app](https://github.com/mountmike/pcloud2gdrive/blob/main/client/public/images/planning/screenshot1.gif)

# Planning
### Testing the concept
After messing around with the Gdrive & Pcloud APIs in NODE, I was able to make a function that copied files from an origin cloud folder to a destination cloud folder via the /tmp folder. This left me feeling optimistic so I began imagining a GUI.

## UI Wireframe
![Screenshot of main app wireframe](https://github.com/mountmike/pcloud2gdrive/blob/main/client/public/images/planning/Mainwireframe.png)
![Screenshot of current tasks page wireframe](https://github.com/mountmike/pcloud2gdrive/blob/main/client/public/images/planning/Currenttaskspage.png)
![Screenshot of add task page wireframe](https://github.com/mountmike/pcloud2gdrive/blob/main/client/public/images/planning/Addtaskpage.png)

## Basic architecture
Originally I set up an EXPRESS.js server and PostgreSQL db to handle all the backend but after messing around with Firebase on another project I decided to also implement some Firebase features into my backend.
![Diagram of app architecture](https://github.com/mountmike/pcloud2gdrive/blob/main/client/public/images/planning/architecture.png)