# shopping-cart
### 1. Install the packages required for this project by running 
`npm install`
### 2. Create your local .env file in the root level of your project. Your file should have the ff:
```
NODE_ENV=development
PORT=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DATABASE=shopping_cart
DB_PORT=
```
### 3. To create the database, in your root folder run:

`node -e 'require("./src/db/handleDb.ts").createDb()'`
   
### 4. In your root folder run migration to populate initial data:

`node -e 'require("./src/db/handleDb.ts").migrateUp()'`

## Routes List

### To Get the list of categories:
> <b>GET</b> ``/categories``

### To Get the list of products:
> <b>GET</b> ``/products``

### Create a cart: 
> <b>POST</b>``/cart``

### To Get a cart: 
> <b>GET</b> ``/cart/:id``

### To Add item to cart: 
><b>POST</b> ``/cart/:id/add``
> <b>Body Parameters (ex.)</b> ``{"productId": 1, "qty": 2 }``

### To update an item to cart:
><b>POST</b> ``/cart/:id/update``
> <b>Body Parameters (ex.)</b> ``{"productId": 1, "qty": 2 }``

### To delete an item to cart:
><b>DELETE</b> ``/cart/:id/delete``
> <b>Body Parameters (ex.)</b> ``{"productId": 1}``
