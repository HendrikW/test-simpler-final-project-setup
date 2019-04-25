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

Edit `client/package.json` and add the following line as a property to the config object:
```
"proxy": "http://localhost:5000"
```

Edit `.env` and change the `PORT` to `PORT=5000`.



## Notes

* because of the proxy setup the students should then only use relative paths in their axios calls of course `axios.get('/api/some/path`).
* maybe we could adapt `irongenerate` to use a different port than `3000` by default so it does not clash with `create-react-app`'s default port by default.
