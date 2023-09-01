# GUEST HOUSE APP

## HOW TO START?

Clone this **Repository**

```bash
$ git clone https://github.com/bNc326/guest-house-app.git
```

comming soon...

## APP

### [DEMO](https://guest-house-app.onrender.com/)

Navigate to **frontend** directory and install the **dependencies**

```bash
$ cd frontend
$ npm install
```

> [!NOTE]
> If you use localhost server then edit **package.json line:61**
>
> ```json
> 61 | "proxy": "http://localhost:8800",
> ```
>
> &nbsp;

start the app

```bash
$ npm start
```

The application starts at **http://localhost:3000**

## BACKEND

Navigate to **backend** directory and install the
**dependencies** After **start server**

```bash
$ cd frontend
$ npm install
$ npm start
```

The application listen at http://localhost:8800

### REST endpoints http://localhost:8800/api

> | Endpoints     | Methods                                                                                    |
> | ------------- | ------------------------------------------------------------------------------------------ |
> | auth          | <code>GET</code> <code>DELETE</code>                                                       |
> | booking       | <code>GET</code> <code>POST</code> <code>DELETE</code> <code>PUT</code> <code>PATCH</code> |
> | disabled-days | <code>GET</code> <code>POST</code> <code>DELETE</code> <code>PUT</code>                    |
> | hotels        | <code>GET</code> <code>POST</code> <code>DELETE</code> <code>PUT</code>                    |
> | ratings       | <code>GET</code> <code>POST</code> <code>DELETE</code> <code>PUT</code>                    |
> | gallery       | <code>GET</code> <code>POST</code> <code>DELETE</code> <code>PUT</code>                    |

<summary><code><b>/auth</b></code></summary>
<br>
<details><summary><code>POST <b>/login</b></code></summary>

#### Params

> None

#### Body

> | name         | datatype | required |
> | ------------ | -------- | -------- |
> | `"username"` | `string` | true     |
> | `"password"` | `string` | true     |

#### Responses

> | http code | content-type       | response                                                                                   |
> | --------- | ------------------ | ------------------------------------------------------------------------------------------ |
> | `200`     | `application/json` | return `user`                                                                              |
> | `404`     | `application/json` | `{"success": false, "status": "404", "message" : "A felhasználó nem található!"}`          |
> | `404`     | `application/json` | `{"success": false, "status": "404", "message" : "Helytelen felhasználónév vagy jelszó!"}` |

</details>
<details><summary><code>POST <b>/register</b></code></summary>

#### Params

> None

#### Body

> | name         | datatype | required |
> | ------------ | -------- | -------- |
> | `"username"` | `string` | true     |
> | `"email"`    | `string` | true     |
> | `"password"` | `string` | true     |

#### Responses

> | http code | content-type | response              |
> | --------- | ------------ | --------------------- |
> | `200`     | `string`     | User has been created |

</details>
<details><summary><code>POST <b>/refresh</b></code></summary>

#### Params

> None

#### Body

> None

#### Responses

> | http code | content-type       | response                                                               |
> | --------- | ------------------ | ---------------------------------------------------------------------- |
> | `200`     | `application/json` | `{ "success": true, "status": "200", "accessToken" }`                  |
> | `401`     | `application/json` | `{ "status": "401", "message": "Nincs refresh token!" }`               |
> | `403`     | `application/json` | `{ "status": "403", "message": "Nem található ilyen refresh token!" }` |
> | `403`     | `application/json` | `{ "status": "403", "message": "Nem érvényes a refresh token!" }`      |

</details>
<details><summary><code>POST <b>/logout</b></code></summary>

#### Params

> None

#### Body

> | name                     | datatype | required |
> | ------------------------ | -------- | -------- |
> | `"token(refresh token)"` | `string` | true     |

#### Responses

> | http code | content-type       | response                                                                       |
> | --------- | ------------------ | ------------------------------------------------------------------------------ |
> | `204`     | `application/json` | `{ "success": true, "status": "204", "message": "Sikeresen kijelentkeztél!" }` |

</details>
<br>
<summary><code><b>/booking</b></code></summary>
<br>
<details><summary><code>GET <b>/</b></code></summary>

#### Params

> None

#### Queries

> | name    | datatype                | required |
> | ------- | ----------------------- | -------- |
> | `hotel` | `string(ref hotel _id)` | true     |

#### Body

> None

#### Responses

> | http code | content-type       | response         |
> | --------- | ------------------ | ---------------- |
> | `200`     | `application/json` | `Array<booking>` |

</details>
<details><summary><code>GET <b>/:id</b></code></summary>

#### Params

> | name  | datatype                  | required |
> | ----- | ------------------------- | -------- |
> | `:id` | `string(ref booking _id)` | true     |

#### Queries

> | name    | datatype                   | required |
> | ------- | -------------------------- | -------- |
> | `hotel` | `string(ref any hotel id)` | true     |

#### Body

> None

#### Responses

> | http code | content-type       | response                                                                                                   |
> | --------- | ------------------ | ---------------------------------------------------------------------------------------------------------- |
> | `200`     | `application/json` | `booking` obj                                                                                              |
> | `404`     | `application/json` | `{ "success": false, "status": 404, "message": "Nem található a {id} azonosítójú foglalás!", "id": {id} }` |

</details>
<details><summary><code>DELETE <b>/</b></code></summary>

#### Params

> None

#### Body

> | name        | datatype   | required |
> | ----------- | ---------- | -------- |
> | `Array<id>` | `string[]` | true     |

#### Headers

> | name            | value          | required |
> | --------------- | -------------- | -------- |
> | `Authorization` | Bearer `token` | true     |

#### Responses

> | http code | content-type       | response                                                                                                 |
> | --------- | ------------------ | -------------------------------------------------------------------------------------------------------- |
> | `201`     | `application/json` | `{ "success": true, "status": 201, "message": "Sikeresen törölted a foglalást/okat!", "id": Array<id> }` |

</details>
<details><summary><code>PUT <b>/:id</b></code></summary>

#### Params

> | name  | datatype                  | required |
> | ----- | ------------------------- | -------- |
> | `:id` | `string(ref booking _id)` | true     |

#### Queries

> | name    | datatype                   | required |
> | ------- | -------------------------- | -------- |
> | `hotel` | `string(ref any hotel id)` | true     |

#### Body

> | name           | datatype           | required |
> | -------------- | ------------------ | -------- |
> | `Obj<booking>` | `obj(ref booking)` | true     |

#### Headers

> | name            | value          | required |
> | --------------- | -------------- | -------- |
> | `Authorization` | Bearer `token` | true     |

#### Responses

> | http code | content-type       | response                                                                                                              |
> | --------- | ------------------ | --------------------------------------------------------------------------------------------------------------------- |
> | `201`     | `application/json` | `{ "success": true, "status": 204, "message": "Sikeresen szerkesztetted a {id} azonosítójú foglalást!" , "id": {id}}` |

</details>
<details><summary><code>PATCH <b>/:id</b></code></summary>

#### Params

> | name  | datatype                  | required |
> | ----- | ------------------------- | -------- |
> | `:id` | `string(ref booking _id)` | true     |

#### Queries

> | name    | datatype                   | required |
> | ------- | -------------------------- | -------- |
> | `hotel` | `string(ref any hotel id)` | true     |

#### Body

> | name           | datatype           | required |
> | -------------- | ------------------ | -------- |
> | `Obj<booking>` | `obj(ref booking)` | true     |

#### Headers

> | name            | value          | required |
> | --------------- | -------------- | -------- |
> | `Authorization` | Bearer `token` | true     |

#### Responses

> | http code | content-type       | response                                                                                               |
> | --------- | ------------------ | ------------------------------------------------------------------------------------------------------ |
> | `201`     | `application/json` | `{ "success": true, "status": 201, "message": "Sikeresen elfogadtad/elutatsítottad a foglalást/okat!"` |

</details>

Comming soon...

## ADMIN

### [DEMO](https://guest-house-admin.onrender.com/)

> [!NOTE]
> Demo account
>
> - Username: **demo**<br>
> - Password: **demo123**
