# test-simpler-final-project-setup

## Steps

First generate the basic setup – we'll have the client folder inside the server folder (which is just the project folder).
Then remove the `.git` folder from `/client` because our repository will be the whole project and it will also control `/client`.
```
irongenerate test-simpler-final-project-setup
cd test-simpler-final-project-setup
create-react-app client
sudo rm -r client/.git
cd ..
```

Now in the project folder's `package.json` add an ignore for nodemon. This is necessary because we really don't want our server to restart when we modify files in our client (this can lead to unexpected behaviour, e.g. the server being restartet exactly when the react app does the first request to the server, with the request then failing).
```
  "nodemonConfig": {
    "ignore": ["client/*"]
  }
```

Initialize the git repository:
```
git init . && git add . && git commit -m 'inital commit'
```

### 1. Getting rid of CORS / proxy requests to the server

Edit `client/package.json` and add the following line as a property to the config object:
```
"proxy": "http://localhost:5000"
```

Edit `.env` and change the `PORT` to `PORT=5000`.

Done. Now you can always use relative paths (no env vars necessary anymore) and don't have to worry about CORS.

### 2. Letting the react app know if the user is logged in

Unfortunately, rendering the user into the initial `index.html` response is easy on production, but really complex in the development setup that comes with `create-react-app`. Thus, I was thinking of different approaches to make the user information available as synchronous as possible. The following seems to work really well:

Install axios in the `client` folder:
```npm install axios```

Then in `client/src/index.js` modify like this: 
```
import axios from 'axios'

document.getElementById('root').innerText = 'The React app has not connected to the backend yet.'

axios.get('/initialUserData').then(res => {
  ReactDOM.render(<App user={res.data}/>, document.getElementById('root')); 
}).catch(err => {
  alert('backend not running or /initialUserData route not defined !')
})
```

Add a route in the backend that answers with the current user (if any):
```
router.get('/initialUserData', (req, res, next) => {
  setTimeout(() => {
    res.json({ fullName: 'Mr. Test Test' }); // just sample data
  }, 1000)  
});
```

In `App.js`, to always have access to the current user after a page reload, add 
```
  state = {
    user: this.props.user
  }
```

Done. Now your app after a page refresh is always in either of two states: user is logged in or not logged in. No asynchronous check and immediate re-render of your app anymore.

### 3. Make deploy to heroku as easy as `git push heroku master`

In the project directory (not `client`) add `"build": "cd client && npm install && npm run build"` to the `"scripts"` object in `package.json`:
```
"scripts": {
    "start": "node ./bin/www",
    "dev": "DEBUG=test-simpler-final-project-setup:* nodemon ./bin/www",
    "dev-windows": "nodemon ./bin/www",
    "build": "cd client && npm install && npm run build"
  }
```

modify in `app.js` to serve static content from `/client/build`:
```
...
app.use(express.static(path.join(__dirname, '/client/build')));
...
```
and add at the very end of `app.js` (before `module.exports`):
```
app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});
```

Done. Now you can just use `git push heroku master` do deploy.


## Notes

* because of the proxy setup the students should then only use relative paths in their axios calls of course `axios.get('/api/some/path`).
* maybe we could adapt `irongenerate` to use a different port than `3000` by default so it does not clash with `create-react-app`'s default port by default.
* maybe we could also adapt `irongenerate` to have a `irongenerate-react` version that runs `create-react-app` itself, removes the `.git` folder accordingly, serves static content from `client/build` etc like above. But then it's closer to a boilerplate setup again, where the students don't gain as much understanding of what's going on ( if they have to build their own app for a technical interview for example with just bare-bones `create-react-app` and barebones `express-generator` for example – so it's always a tradeoff how much magic we want to hide from them, I guess ;-) )
* to be honest http://learn.ironhack.com/#/learning_unit/6828 is a bit of a mess, I had a lot of trouble when students started using it to copy&paste from : especially "getTheUser" should really be called "setTheUser" (because that is what we are doing I think), also the `ProtectedRoute` setup just does not work the way it is described there I think. Also `componentWillReceiveProps` is both deprecated and really confusing for students.
