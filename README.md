# http-demo

A small web app to demonstrate HTTP requests and APIs.  See live demo here: [http-demo.herokuapp.com](http://http-demo.herokuapp.com)

Created with Node/Express, using semantic-ui for CSS.  Data is stored in server memory and is wiped upon server restart.

## Installation

Begin by creating a clone of this repo:
```
https://github.com/timmyichen/http-demo/
```

Once finished, navigate into the cloned directory:
```
cd http-demo
```

Ensure you are using node v8 or later:
```
nvm use 8
```

If node v8 is not installed, you can install it with:
```
nvm install 8
```

Install the npm dependencies:
```
npm install
```

Run the server:
```
npm start
```

By default, the app will run on port 8080, which is the default port for c9.io apps.  If you want to change this, you can set the port by setting the `PORT` environment variable, or by changing `8080` in `index.js` to whatever port you want.

You can also run the server in dev-mode, which will automatically restart the server anytime you save changes to a file:
```
npm run dev
```
