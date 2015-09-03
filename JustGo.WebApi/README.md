## Api services

### Register user

#### Request
```javascript
 - url: http://api.justgo.herokuapp.com/users [ http://localhost:3030/users ]
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
        "user": {
          "id": "55e82ab4d45e1d4846464557",
          "username": "batman"
        }
      }
```

 - **In case of an error:**

```javascript
body: {
        "succsess": false,
        "reason": "..."
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
        "user": {
          "username": "batman",
          "accessToken": "o9xkb4e2vcwypyif8bz6agvu9s9yp6fx5dueci01dvsz1xmvd4ueise7z7r52se3r4rrb69jd8r439ue"
        }
      }
```

 - **In case of an error:**

```javascript
body: {
        "succsess": false,
        "reason": "..."
      }
```

### Logout user

#### Request
```javascript
 - url: http://api.justgo.herokuapp.com/logout [ http://localhost:3030/logout ]
 - method: POST
 - header: { "X-Access-Token": "o9xkb4e2vcwypyif8bz6agvu9s9yp6fx5dueci01dvsz1xmvd4ueise7z7r52se3r4rrb69jd8r439ue" }
 - body : empty
```

#### Response
 - **In case of success:**

```javascript
body: { "succsess": true }
```

 - **In case of an error:**
 ```javascript
body: {
        "succsess": false,
        "reason": "..."
      }
```
