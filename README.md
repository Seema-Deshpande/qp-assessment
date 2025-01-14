# qp-assessment

<h1>Grocery Booking API</h1>

A Fullstack Grocery Booking API built with Node.js, Express, and TypeScript.<br> The API allows Admin users to manage grocery items and their inventory, while Regular Users can view items and place orders.<br>

<b>Features</b> <br>
<b>Admin Functions:</b><br>
Add, update, and remove grocery items.<br>

<b> Manage inventory levels.</b><br>
View all grocery items in the system.<br>
<b>User Functions:</b><br>
View available grocery items.<br>
Place orders for multiple grocery items.<br>

<b>Tech Stack</b><br>
Backend: Node.js with Express<br>
Language: TypeScript<br>


<b> Steps to run </b> <br>
<b> Install Docker Desktop <b>
git clone the repo  <br>
cd qp-assessment<br>
docker-compose build<br>
docker-compose up <br>

<b> API Endpoints<br></b>

<b>Authentication Endpoints </b>
a)Sign Up (Create a New User) <br>
Method: POST <br>
URL: http://localhost:3000/api/auth/signup<br>
Description: Register a new user.<br>
Body (JSON):<br>
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "user",
  "isActive": true
}
<br>
b) Login (Authenticate User) <br>
Method: POST <br>
URL: http://localhost:3000/api/auth/login <br>
Description: Authenticate an existing user and get a JWT token. <br>
Body (JSON):

{
  "username": "john_doe",
  "password": "password123"
}


<b>Authentication Endpoints </b>
a)Sign Up (Create a New Admin) <br>
Method: POST <br>
URL: http://localhost:3000/api/auth/signup<br>
Description: Register a new user.<br>
Body (JSON):<br>
{
  "username": "admin_doe",
  "email": "admin@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "admin",
  "isActive": true
}
<br>
b) Login (Authenticate User) <br>
Method: POST <br>
URL: http://localhost:3000/api/auth/login <br>
Description: Authenticate an existing user and get a JWT token. <br>
Body (JSON):

{
  "username": "admin_doe",
  "password": "password123"
}

<b> Admin Routes API Endpoints </b> <br>
1. Create New Grocery Item <br>
Method: POST<br>
URL: http://localhost:3000/api/admin/grocery-items<br>
Description: Allows the admin to add a new grocery item to the system.<br>
Headers:<br>
Authorization: Bearer <your_admin_jwt_token><br>
Body (JSON):<br>

{
  "name": "Apple",
  "price": 2.5,
  "inventory": 100
}
<br>
Expected Response (Success):<br>
{
  "message": "Grocery item added successfully",
  "item": {
    "id": 1,
    "name": "Apple",
    "price": 2.5,
    "inventory": 100
  }
}
<br>
Expected Response (Error - Unauthorized):
<br>
{
  "message": "Forbidden: Admins only"
}
<br>
2. View All Grocery Items <br>
Method: GET<br>
URL: http://localhost:3000/api/admin/grocery-items<br>
Description: Fetch all available grocery items in the system.<br>
Headers:<br>
Authorization: Bearer <your_admin_jwt_token><br>
Expected Response (Success):<br>
[
  {
    "id": 1,
    "name": "Apple",
    "price": 2.5,
    "inventory": 100,
  },
  {
    "id": 2,
    "name": "Banana",
    "price": 1.2,
    "inventory": 200,
  }
]
3. Delete a Grocery Item <br>
Method: DELETE <br>
URL: http://localhost:3000/api/admin/grocery-items/:id <br>
Description: Delete a specific grocery item from the system.<br>
Headers:<br>
Authorization: Bearer <your_admin_jwt_token> <br>
Expected Response (Success):<br>
{
  "message": "Item removed successfully" <br>
}
Expected Response (Error - Item Not Found): <br>

{
  "message": "item not found" 
} <br>
4. Update Grocery Item <br>
Method: PUT <br>
URL: http://localhost:3000/api/admin/grocery-items/:id <br>
Description: Update the details (name, price, or inventory) of a grocery item. <br>
Headers: <br>
Authorization: Bearer <your_admin_jwt_token> <br>
Body (JSON): <br>

{
  "name": "Updated Apple",
  "price": 3.0,
  "inventory": 150
} <br>
Expected Response (Success): <br>

{
  "message": "Grocery item updated successfully",
  "item": {
    "id": 1,
    "name": "Updated Apple",
    "price": 3.0,
    "inventory": 150,
  }
}<br>
5. Adjust Grocery Item Inventory <br>
Method: PATCH <br>
URL: http://localhost:3000/api/admin/grocery-items/:id/inventory <br>
Description: Update the inventory of a specific grocery item. <br>
Headers:<br>
Authorization: Bearer <your_admin_jwt_token> <br>
Body (JSON):<br>
{
  "quantity": -10
} <br>
Expected Response (Success): <br>
{
  "message": "Inventory updated successfully",
  "item": {
    "id": 3,
    "name": "Pencil 12",
    "price": 13.99,
    "inventory": 123
  }
} <br>
Expected Response (Error - Invalid Inventory): <br>
{
  "message": "Error adjusting inventory"
}<br>
6. View All Orders <br>
Method: GET <br>
URL: http://localhost:3000/api/admin/grocery-items-orders <br>
Description: View all the orders placed by users. <br>
Headers:<br>
Authorization: Bearer <your_admin_jwt_token><br>
Expected Response (Success):<br>
[
  {
    "id": 1,
    "userId": 1,
    "status": "pending"
  },
  {
    "id": 2,
    "userId": 1,
    "status": "pending"
  }
]
<br>
<b>User Routes API Endpoints </b> <br>
1. View All Available Grocery Items <br>
Method: GET<br>
URL: http://localhost:3000/api/user/grocery-items <br>
Description: Fetch all available grocery items from the system. <br>
Headers:<br>
Authorization: Bearer <your_user_jwt_token> <br>
Expected Response (Success): <br>
[
  {
    "id": 1,
    "name": "Apple",
    "price": 2.5,
    "inventory": 100,
  },
  {
    "id": 2,
    "name": "Banana",
    "price": 1.2,
    "inventory": 200,
  }
]
2. Create Order <br>
Method: POST <br>
URL: http://localhost:3000/api/user/orders <br>
Description: Allows the user to create a new order by providing order items.<br>
Headers:<br>
Authorization: Bearer <your_user_jwt_token> <br>
Body (JSON):<br>
{
  "userId": 1,
  "orderItems": [
    {
      "itemId": 4,
      "quantity": 14
    },
    {
      "itemId": 3,
      "quantity": 6
    }
  ]
}
<br>
Expected Response (Success): <br>

{
  "message": "Order created successfully",
  "order": {
    "userId": 1,
    "status": "pending",
    "id": 1
  }
}
<br>
Expected Response (Error - Invalid Input):

{
  "message": "Order must contain at least one item"
}
<br>

3. Get User Orders <br>
Method: GET <br>
URL: http://localhost:3000/api/user/orders/:id <br>
Description: View all orders placed by a specific user, based on their user ID.<br>
Headers:<br>
Authorization: Bearer <your_user_jwt_token><br>
Expected Response (Success):<br>
[
  {
    "id": 1,
    "userId": 1,
    "status": "pending"
  },
  {
    "id": 2,
    "userId": 1,
    "status": "pending"
  }
]

Expected Response (Error - User Not Found): <br>
{
  "message": "User not found"
}
