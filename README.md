# MiniLinks Next.js Application

**Project Description**: This is a high-performance URL shortening service implemented using Spring Boot, React, Next.js, and NoSQL. The project includes a sophisticated ID generator that uses a custom algorithm to convert IDs into a compact base62 format, enabling the creation of concise and unique shortened URLs. Additionally, an integrated Java Spring-based API rate limiter efficiently manages incoming requests, enhancing system stability by tracking token availability and timed refills. The application also utilizes Redis as an in-memory caching layer to optimize the retrieval of frequently accessed URLs, reducing database load and improving overall response times.

## Installation Instructions

1. Clone the repository.
2. Run `npm install` in the project directory to install the required dependencies.
3. Start the application using `npm run dev`.

## Usage

1. After starting the application, open your web browser and navigate to [http://localhost:3000](http://localhost:3000).
2. Enter the desired URL, making sure to include the prefix `http://` or `https://`.
3. Click the button to generate a new shortened link.
4. Copy and share the shortened URL.

For the backend setup, please follow these steps:

1. Visit the [MiniLinks Backend Repository](https://github.com/alexpich/mini-links-backend) for instructions on setting up the backend.
2. Once you've completed the backend setup, return to these usage instructions to continue using the application.

## Features

- URL shortening for convenient link sharing.
- Fast response times for optimal user experience.
- Built-in rate limiting to prevent abuse and ensure system stability.

## Technologies Used

- Spring Boot
- React
- Next.js
- Redis
- Tailwind CSS

## Contributing

Currently, no specific guidelines for contributing have been established. However, contributions are welcome.

## License

No specific license has been chosen for this project.

## Author

This project is authored by Alex Pich.

---

Feel free to use this updated Markdown text for your `README.md` file.
