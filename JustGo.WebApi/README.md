## Api services

### Register user

#### Request
```javascript
 - url: http://api.justgo.herokuapp.com/users [ http://localhost:3030/users ]
 - method: POST
 - body : {
            "username": "batman",
            "password": "c79e32c27a1f1241f0da218d57bf15ea9e09e7dc",
            "email": "batman@batman.com"
          }
```

#### Response
 - **In case of success:**

```javascript
body: {
        "succsess": true,
        "user": {
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

### Login user

#### Request
```javascript
 - url: http://api.justgo.herokuapp.com/login [ http://localhost:3030/login ]
 - method: POST
 - body : {
            "username": "batman",
            "password": "c79e32c27a1f1241f0da218d57bf15ea9e09e7dc"
          }
```

#### Response
 - **In case of success:**

```javascript
body: {
        "succsess": true,
        "user": { "username": "batman" }
      }
```

 - **In case of an error:**

```javascript
body: {
        "readyState": 4,
        "responseText": "{\"success\":false,\"reason\":\"Incorrect username or password!\"}",
        "responseJSON": {
            "success": false,
            "reason": "Incorrect username or password!"
        },
        "status": 401,
        "statusText": "Unauthorized"
      }
```

### Logout user

#### Request
```javascript
 - url: http://api.justgo.herokuapp.com/logout [ http://localhost:3030/logout ]
 - method: POST
 - body : __empty__
```

#### Response

```javascript
body: { "succsess": true }
```
