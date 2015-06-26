# NobleBrewer
Noble Brewer- Node.js edition


## How to get this set up:

Clone this repo  
`git clone git@github.com:noblebrewer/NobleBrewer.git`  

run `npm install` in the directory  

Install MongoDB  
`brew update` and then `brew install mongodb`  

Create a data directory  
`sudo mkdir /data`  

Create a DB directory  
`sudo mkdir /data/db`  

Change the permissions
`sudo chmod 777 /data/db`

Create a .env file  
`touch .env`

Open it, add these contents:  
```
CLOUDINARY_URL=cloudinary://333779167276662:_8jbSi9FB3sWYrfimcl8VKh34rI@keystone-demo  
MANDRILL_API_KEY=NY8RRKyv1Bure9bdP8-TOQ  
```
These are DEV keys only, basically from the keystone.js demo. Your local email sending will only be tests.  


## To Start:
`mongod` in a new terminal window should start mongodb, do this first

`foreman start` should start the program. It starts on port 3000 by default, so don't have another app running that is on that port  

then `open http://localhost:3000`

