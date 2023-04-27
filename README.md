# pcloud2gdrive

When faced with the need to migrate from one cloud storage service to another, I didn't like the idea of manually downloading and re-uploading all my files - especially with my *quality* Australian internet connection.

Naturally I did what any creative problem solver would do, and wasted far more time than the upload ever would have taken on building my own application that would automtate the process.

Presenting **pcloud2gdrive:** a tool for migrating data from Pcloud Drive to Google Drive built using:
- REACT.js
- NODE.js
- Firebase - Authenticator / Firestore
- Googledrive/Pcloud SDKs

Live demo: *insert link*

# Planning
### Testing the concept
After messing around with the Gdrive & Pcloud APIs in NODE, I was able to make a function that copied files from an origin cloud folder to a destination cloud folder via the /tmp folder. This left me feeling optimistic so I began imagining a GUI.

## UI Wireframe
![Screenshot](https://github.com/mountmike/pcloud2gdrive/blob/main/client/public/images/planning/Mainwireframe.png)