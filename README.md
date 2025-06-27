# Student Store Starter Code


📝 `NOTE` Use this template to initialize the contents of a README.md file for your application. As you work on your assignment over the course of the week, update the required or stretch features lists to indicate which features you have completed by changing `[ ]` to `[x]`. (🚫 Remove this paragraph before submitting your assignment.)

## Unit Assignment: Student Store

Submitted by: **NAME**

Deployed Application (optional): [Student Store Deployed Site](ADD_LINK_HERE)

### Application Features

#### CORE FEATURES

- [ ] **Database Creation**: Set up a Postgres database to store information about products and orders.
  - [ ]  Use Prisma to define models for `products`, `orders`, and `order_items`.
  - [ ]  **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Prisma Studio to demonstrate the creation of your `products`, `orders`, and `order_items` tables. 
- [ ] **Products Model**
  - [ ] Develop a products model to represent individual items available in the store. 
  - [ ] This model should at minimum include the attributes:
    - [ ] `id`
    - [ ] `name`
    - [ ] `description`
    - [ ] `price` 
    - [ ] `image_url`
    - [ ] `category`
  - [ ] Implement methods for CRUD operations on products.
  - [ ] Ensure transaction handling such that when an product is deleted, any `order_items` that reference that product are also deleted. 
  - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Prisma Studio to demonstrate the creation of all attributes (table columns) in your Products Model.
- [ ] **Orders Model**
  - [ ] Develop a model to manage orders. 
  - [ ] This model should at minimum include the attributes:
    - [ ] `order_id`
    - [ ] `customer_id`
    - [ ] `total_price`
    - [ ] `status`
    - [ ] `created_at`
  - [ ] Implement methods for CRUD operations on orders.
  - [ ] Ensure transaction handling such that when an order is deleted, any `order_items` that reference that order are also deleted. 
  - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Prisma Studio to demonstrate the creation of all attributes (table columns) in your Order Model.

- [ ] **Order Items Model**
  - [ ] Develop a model to represent the items within an order. 
  - [ ] This model should at minimum include the attributes:
    - [ ] `order_item_id`
    - [ ] `order_id`
    - [ ] `product_id`
    - [ ] `quantity`
    - [ ] `price`
  - [ ] Implement methods for fetching and creating order items.  
  - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Prisma Studio to demonstrate the creation of all attributes (table columns) in your Order Items Model.
- [ ] **API Endpoints**
  - [ ] Application supports the following **Product Endpoints**:
    - [ ] `GET /products`: Fetch a list of all products.
    - [ ] `GET /products/:id`: Fetch details of a specific product by its ID.
    - [ ] `POST /products`: Add a new product to the database.
    - [ ] `PUT /products/:id`: Update the details of an existing product.
    - [ ] `DELETE /products/:id`: Remove a product from the database.
  - [ ] Application supports the following **Order Endpoints**:
    - [ ] `GET /orders`: Fetch a list of all orders.
    - [ ] `GET /orders/:order_id`: Fetch details of a specific order by its ID, including the order items.
    - [ ] `POST /orders`: Create a new order with specified order items.
    - [ ] `PUT /orders/:order_id`: Update the details of an existing order (e.g., change status).
    - [ ] `DELETE /orders/:order_id`: Remove an order from the database.
    - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Postman or another API testing tool to demonstrate the successful implementation of each endpoint. For the `DELETE` endpoints, please use Prisma Studio to demonstrate that any relevant order items have been deleted. 
- [ ] **Frontend Integration**
  - [ ] Connect the backend API to the provided frontend interface, ensuring dynamic interaction for product browsing, cart management, and order placement. Adjust the frontend as necessary to work with your API.
  - [ ] Ensure the home page displays products contained in the product table.
  - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use `npm start` to run your server and display your website in your browser. 
    - [ ] Demonstrate that users can successfully add items to their shopping cart, delete items from their shopping cart, and place an order
    - [ ] After placing an order use Postman or Prisma Studio demonstrate that a corresponding order has been created in your orders table.

### Stretch Features

- [ ] **Added Endpoints**
  - [ ] `GET /order-items`: Create an endpoint for fetching all order items in the database.
  - [ ] `POST /orders/:order_id/items` Create an endpoint that adds a new order item to an existing order. 
- [ ] **Past Orders Page**
  - [ ] Build a page in the UI that displays the list of all past orders.
  - [ ] The page lists all past orders for the user, including relevant information such as:
    - [ ] Order ID
    - [ ] Date
    - [ ] Total cost
    - [ ] Order status.
  - [ ] The user should be able to click on any individual order to take them to a separate page detailing the transaction.
  - [ ] The individual transaction page provides comprehensive information about the transaction, including:
    - [ ] List of order items
    - [ ] Order item quantities
    - [ ] Individual order item costs
    - [ ] Total order cost
- [ ] **Filter Orders**.
  - [ ] Create an input on the Past Orders page of the frontend application that allows the user to filter orders by the email of the person who placed the order. 
  - [ ] Users can type in an email and click a button to filter the orders.
  - [ ] Upon entering an email address adn submitting the input, the list of orders is filtered to only show orders placed by the user with the provided email. 
  - [ ] The user can easily navigate back to the full list of ordres after filtering. 
    - [ ] Proper error handling is implemented, such as displaying "no orders found" when an invalid email is porvided.
- [ ] **Deployment**
  - [ ] Website is deployed using [Render](https://courses.codepath.org/snippets/site/render_deployment_guide).
  - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: To ease the grading process, please use the deployed version of your website in your walkthrough with the URL visible. 



### Walkthrough Video

`TODO://` Add the embedded URL code to your animated app walkthrough below, `ADD_EMBEDDED_CODE_HERE`. Make sure the video or gif actually renders and animates when viewing this README. (🚫 Remove this paragraph after adding walkthrough video)

`ADD_EMBEDDED_CODE_HERE`

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

I think the topics discussed in my labs did prepare me for certain concrete subjects like CRUD and endpoints. However, I feel like the project instructions were often unclear or vague. There were also parts of unnecessary code and certain bugs that we had no way of accounting for, expecially when connecting the backend to the frontend. Given we did not build the front end, there was a disconnect on my part that I felt I was not ready for based on lessons when it came to pin pointing exact parts of code and functions that relayed vital parts of the functionality. We had to rely on our teammates and instructors much more than the instructions, which often set back the whole cohot because there was uncertainty with what instructions simplified too much.



* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  

Add your response here

Wtih more time I would have been able to spend more time on understanding the structure of the frontend and how we had to communicate specific bits of information

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

Add your response here

### Open-source libraries used

- Add any links to open-source libraries used in your project.

### Shout out

Give a shout out to somebody from your cohort that especially helped you during your project. This can be a fellow peer, instructor, TA, mentor, etc.


