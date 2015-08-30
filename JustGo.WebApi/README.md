## Api services

### Register user

#### Request
```javascript
 - url: http://api.justgo.herokuapp.com/users/register [ http://localhost:3030/users/register ]
 - method: POST
 - body : {
            "username": "batman",
            "hashPass": "c79e32c27a1f1241f0da218d57bf15ea9e09e7dc",
            "email": "batman@batman.com"
          }
```

#### Response
 - **In case of success:**

```javascript
body: {
        "succsess": true,
        "user": {
          id: "55e3156719a849b01ca24ce7",
          username: "batman"
        }
      }
```

 - **In case of an error:**

```javascript
body: {
        "succsess": false,
        "reason": {...}
      }
```
