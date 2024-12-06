# Product API

## Project Description

This project is a product and rating management application built using TypeScript and NestJS. The application is designed to allow users to add, manage, and rate products. With a soft delete feature, it enables the management of deleted products without permanently removing data from the database.

## Key Features

- **Product Management**: Users can add, edit, and delete products. Deleted products are retained in the database with a "soft deleted" status.
- **Product Rating**: Users can rate existing products. The application automatically calculates the average rating for each product.
- **User Authentication**: Users can register and log in to the application to manage their products and ratings.
- **Entity Relationships**: The application utilizes relationships between the `User`, `Product`, and `Rating` entities to manage data efficiently.
- **Secure Data Management**: By using `deletedAt` and `deletedBy` columns, the application maintains a record of deleted data and allows for the recovery of deleted items if needed.

## Technologies Used

- **NestJS**: A framework for building efficient and scalable server-side applications. It is built on top of Node.js and uses TypeScript, providing a robust structure for developing applications.
- **TypeORM**: An Object-Relational Mapping (ORM) tool for TypeScript and JavaScript that facilitates interaction with the database.
- **PostgreSQL**: A relational database used to store application data.
- **TypeScript**: A programming language that provides static typing for JavaScript, enhancing code safety and readability.
- **Architecture**: The application follows a modular architecture, which allows for separation of concerns and better organization of code. Each module encapsulates related functionality, making the application easier to maintain and scale.
- **Design Patterns**: NestJS utilizes several design patterns, including:
  - **Dependency Injection**: This pattern allows for better management of dependencies, promoting loose coupling and easier testing.
  - **Module Pattern**: Organizes related components, services, and controllers into cohesive modules, enhancing code organization and reusability.
  - **Controller-Service Pattern**: Separates the handling of HTTP requests (controllers) from the business logic (services), promoting a clean architecture and single responsibility principle.
## Security

The application implements several security measures to protect user data and ensure secure authentication:

- **JWT (JSON Web Tokens)**: Used for secure user authentication. Upon successful login, users receive a JWT that is required for accessing protected routes, ensuring that only authenticated users can perform certain actions.
- **Helmet**: A middleware that helps secure the application by setting various HTTP headers. It protects against common vulnerabilities such as cross-site scripting (XSS) and clickjacking.
- **Rate Limiter**: Implemented to prevent abuse of the API by limiting the number of requests a user can make in a given time frame. This helps mitigate denial-of-service (DoS) attacks and ensures fair usage of resources.
- **CORS (Cross-Origin Resource Sharing)**: Configured to control which domains are allowed to access the API. This adds an additional layer of security by preventing unauthorized domains from making requests to the application.

## Installation

- Clone this repository:
  `git clone https://github.com/edysupardi/product-api.git`
- Navigate to the project directory:
  `cd product-api`
- Install dependencies:
  `npm install`
- Configure the database in the `.env` file. You can copy variable from .env.example
- Run the application using docker (please make sure you install docker first on your machine):
  `docker-compose run --build -d`

## Usage

Once the application is running, you can access the API through the provided endpoints. Make sure to use tools like Postman or curl to test the available endpoints.

## Contributing

If you would like to contribute to this project, please feel free to create a pull request or open an issue for further discussion.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.


