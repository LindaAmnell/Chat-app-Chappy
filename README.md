### user:

| Method | URL                        | body        | Response                                                             |
| :----: | :------------------------- | :---------- | :------------------------------------------------------------------- |
|  GET   | /api/user                  | -           | List of user-objects.                                                |
|  GET   | /api/user/login            | -           | Answer 404: Not found if user is unauthorized.                       |
|  GET   | /api/user/search?q={name}  | -           | Matching user objects.                                               |
|  GET   | /api/user/activeuser       | -           | Username of loged in user. 401 If no user is loged in.               |
|  POST  | /api/user/                 | User-object | 409: If username is taken. <br>400: If something is wrong with body. |
|  PUT   | /api/user/change-user/:id" | User-object | 201: Created. <br> 404: No user matching id found.                   |
| DELETE | /api/user/delete/:id"      | -           | 204: No content. <br> 404: No user matching id found.                |

<br>

### dm:

| Method | URL                           | body | Response                                                     |
| :----: | :---------------------------- | :--- | :----------------------------------------------------------- |
|  GET   | /api/dm                       | -    | List of dm-objects.                                          |
|  GET   | /api/dm/protected             | -    | Answer 404: Not found if user is unauthorized.               |
|  POST  | /api/dm/                      | -    | 201: Created <br>400: Bad-request if DM is not valid.        |
|  PUT   | /api/dm/update-user-messages" | -    | 204: Sucessfully changed sendername/recivername to "newName" |
| DELETE | /api/dm/delete-dm"            | -    | 204: No content. <br> 404: No matching name found.           |

<br>

### room:

| Method | URL                     | body | Response                                             |
| :----: | :---------------------- | :--- | :--------------------------------------------------- |
|  GET   | /api/room               | -    | List of room-objects.                                |
|  POST  | /api/room/              | -    | 201: Created <br>400: if something is wrong in body. |
| DELETE | /api/room/delete/:name" | -    | 204: No content. <br> 404: Room not found.           |

<br>

### roomMessage:

| Method | URL                                     | body | Response                                                     |
| :----: | :-------------------------------------- | :--- | :----------------------------------------------------------- |
|  GET   | /api/room-message                       | -    | List of room-messages-objects.                               |
|  POST  | /api/room-message/                      | -    | 201: Created <br>400: Bad-request if rooms is not valid.     |
|  PUT   | /api/room-message/update-user-messages" | -    | 204: Sucessfully changed sendername/recivername to "newName" |
| DELETE | /api/room-message/delete-message"       | -    | 204: No content. <br> 404: No matching name found.           |

### Interfaces:

<br>

##### User:

| name   | password | image  |
| :----- | :------- | :----- |
| string | string   | string |

<br>

##### Room:

| name   | status? | image  | creator? |
| :----- | :------ | :----- | -------- |
| string | bolean  | string | string   |

<br>

##### DmMessage :

| textMessage | receiverNam | senderName | date |
| :---------- | :---------- | :--------- | ---- |
| string      | string      | string     | Date |

<br>

##### MessageRoom:

| senderName | textMessage | roomName | date |
| :--------- | :---------- | :------- | ---- |
| string     | string      | string   | Date |

<br>
<br>

Published webpage: https://chat-app-chappy.onrender.com/
