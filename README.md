# meteorjs-client

[![meteorjs-client](http://img.shields.io/npm/dm/meteorjs-client.svg)](https://www.npmjs.org/package/meteorjs-client) [![npm version](https://badge.fury.io/js/meteorjs-client.svg)](http://badge.fury.io/js/meteorjs-client) [![Dependency Status](https://david-dm.org/inProgress-team/meteorjs-client.svg)](https://david-dm.org/inProgress-team/meteorjs-client)


# Install

```
yarn add meteorjs-client
```

or

```
npm i --save meteorjs-client
```
# Usage

## Connecting to the server
Should be done only once.

### Secure connection
Use the wss protocol for connecting to secure deployments with ssl.
```js
Meteor.connect('wss://example.com:3000/websocket')
```

### Insecure connection
Use the ws protocol for insecure connections, e.g. during development.
```js
Meteor.connect('192.168.1.23')
```

### Disconnecting
```js
Meteor.disconnect()
```

## Data fetching
```js
import Meteor, {withTracker} from 'meteorjs-client'

import  SomeComponent from './SomeComponent'

function trackerFunction({listId}) {
  const stuffHandle = Meteor.subscribe('stuffInList', listId)
  const listHandle = Meteor.subscribe('aList', listId)
  const stuff = Meteor.collection('stuff').find({listId})
  const list = Meteor.collection('list').findOne(listId)
  return {
    listReady: listHandle.ready(),
    list,
    stuffReady: stuffHandle.ready(),
    stuff,
  }
}

export default withTracker(trackerFunction)(SomeComponent)
```

Here SomeComponent will receive stuffReady and stuff props.
Unlike standard Meteor there is no need to call fetch as find returns an array.

## Calling server side methods
```js
import {show} from './my-popup-alerts'

Meteor.call('arrive', function(err) {
    if (err) {
      show('Error clocking in')
    }
  })
```
## Meteor Accounts

### Log in
```js
Meteor.loginWithPassword(username, password, (err) => {
        this.setState({loggingIn: false})
        if (err) {
          this.setState({loginError: true})
        }
      })
```

### Who is logged in?
```js
const user = Meteor.user()
const userId = Meteor.userId()
console.log(`User is ${user ? user.username : 'Not logged in'}`)
const loggedIn = !!userId
const authToken = Meteor.getAuthToken()
```

### Are we logging in?
Easily check if we are logging in.
```js
const loggingIn = Meteor.loggingIn()
```

## Server status
Are we currently connected to the server.
```js
const {connected, status} = Meteor.status()
```

## Want to help ?

Pull Requests and issues reported are welcome! :)

## License

meteorjs-client is [MIT Licensed](LICENSE).
