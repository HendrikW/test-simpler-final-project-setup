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

Initialize the git repository:
```
git init . && git add . && git commit -m 'inital commit'
```

### Getting rid of CORS / proxy requests to the server

Edit `client/package.json` and add the following line as a property to the config object:
```
"proxy": "http://localhost:5000"
```

Edit `.env` and change the `PORT` to `PORT=5000`.

Done.

### Letting the react app know if the user is logged in

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

## Notes

* because of the proxy setup the students should then only use relative paths in their axios calls of course `axios.get('/api/some/path`).
* maybe we could adapt `irongenerate` to use a different port than `3000` by default so it does not clash with `create-react-app`'s default port by default.
