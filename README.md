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

### To create a cart: 
> <b>POST</b>``/cart``
 
```json 
Sample Response:
{ 
    "updatedAt": "2022-04-06T21:21:20.000Z",
    "createdAt": "2022-04-06T21:21:20.000Z",
    "id": 7,
    "items": [],
    "totalAmount": 0
}
```
### To Get a cart: 
> <b>GET</b> ``/cart/:id``

```json 
Sample Response: 
{ 
    "updatedAt": "2022-04-06T21:08:16.000Z",
    "createdAt": "2022-04-06T21:08:16.000Z",
    "id": 1,
    "items": [
        {
        "updatedAt": "2022-04-06T21:26:02.000Z",
        "createdAt": "2022-04-06T21:26:02.000Z",
        "id": 1,
        "cartId": 1,
        "productId": 1,
        "quantity": 2,
        "product": {
            "updatedAt": "2022-04-06T21:08:10.000Z",
            "createdAt": "2022-04-06T21:08:10.000Z",
            "id": 1,
            "categoryId": 1,
            "name": "apple",
            "quantity": 10,
            "price": 5,
            "sku": "8378"
        },
        "amount": 10
        }
    ],
    "totalAmount": 10
}
```
The endpoints to manage cart items will return the cart object to avoid additional request.
### To Add item to cart: 
*Adding existing product will add the quantity to the product quantity in the cart
><b>POST</b> ``/cart/:id/add``
> <b>Body Parameters (ex.)</b> ``{"productId": 1, "qty": 2 }``

### To update an item to cart:
*Updating the product qty will replace the existing quantity value. If the qty value sent is 0, the product item will be deleted from the cart
><b>POST</b> ``/cart/:id/update``
> <b>Body Parameters (ex.)</b> ``{"productId": 1, "qty": 2 }``

### To delete an item to cart:
><b>DELETE</b> ``/cart/:id/delete``
> <b>Body Parameters (ex.)</b> ``{"productId": 1}``
