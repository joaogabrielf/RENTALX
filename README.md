![TypeORM](https://img.shields.io/badge/TypeORM-v0.3.11-green)
![TypeScript](https://img.shields.io/badge/TypeScript-v4.9.4-blue)
![Express](https://img.shields.io/badge/Express-v4.18.2-orange)
![Redis](https://img.shields.io/badge/Redis-v4.6.5-red)
![AWS SDK](https://img.shields.io/badge/AWS%20SDK-v3.294.0-yellow)


# RentalX

RentalX is a RESTful API for managing car rentals. It provides a robust and scalable solution for car rental companies to manage their fleets, customers, reservations, and rental contracts. The API is built using Node.js, TypeScript, TypeORM, Express and PostgreSQL database

The API provides a wide range of functionalities, including registering users, authenticating users, managing cars, managing categories, managing specifications, managing rentals, generating rental invoices, and more. It follows the best practices of RESTful API design, ensuring a clear separation of concerns, modularity, scalability, and ease of maintenance.

## Prerequisites

- Node.js 14+

## Installation

1. Clone the repository:

```
git clone https://github.com/joaoxm/RENTALX.git
```
2. Install dependencies:

```
cd RENTALX
npm install
```


3. Configure the database:

Create a PostgreSQL database and configure the credentials in the `.env` file as follows:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=rentalx
```

4. Run database migrations:

```
npm run typeorm migration:run
```

5. Start the server:

```
npm run dev
```

## Testing

To run automated tests, execute the following command:

```
npm test
```
## API documentation

API documentation is available at the following URL:

```
http://localhost:3333/api-docs
```



## Technologies used

- Node.js
- TypeScript
- PostgreSQL
- TypeORM
- Express
- JSON Web Token (JWT)
- Swagger UI

- [Node.js](https://nodejs.org/) v14.17.0 ![Node.js version](https://img.shields.io/badge/node-v14.17.0-brightgreen)
- [TypeScript](https://www.typescriptlang.org/) v4.3.5 ![TypeScript version](https://img.shields.io/badge/typescript-v4.3.5-blue)
- [Express](https://expressjs.com/) v4.17.1 ![Express version](https://img.shields.io/badge/express-v4.17.1-blue)
- [TypeORM](https://typeorm.io/) v0.2.37 ![TypeORM version](https://img.shields.io/badge/typeorm-v0.2.37-blue)

## Contributing

Contributions are welcome! For more information, please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.



