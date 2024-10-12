# Link Shortener
This project is a web application designed to shorten long URLs and redirect them to their original destination. Additionally, users can generate and download a QR code for the shortened URL.

## Features
- **URL Shortening**: Users can submit a long URL and receive a shortened version that redirects to the original URL.
- **Redirection**: When accessing the shortened URL, the system automatically redirects to the original URL.
- **QR Code Generation**: The application generates a QR code for the shortened URL, which users can download.
- **URL Validation**: The system verifies that URLs are valid before processing them.

## Technologies 
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Frontend**: HTML, CSS, JavaScript, Bootstrap, React

## Installation
Follow these steps to run the application in your local environment:

### Clone the Repository
1. Clone the repository:
    ```bash
    git clone https://github.com/Nicoding-89/01_url_shortener.git
    cd 01_url_shortener
    ```

### Backend Setup
1. Navigate to the backend directory and install the dependencies:
    ```bash
    cd backend
    npm install
    ```

2. Create a `.env` file in the backend directory and add the following environment variables:
    ```bash
    PORT=4000
    BASE_URL=http://localhost:4000
    FRONTEND_URL=http://localhost:5173
    PGUSER=your_database_user
    PGPASSWORD=your_database_password
    PGHOST=your_database_host
    PGPORT=your_database_port
    PGDATABASE=your_database_name
    ```
   Replace `your_database_user`, `your_database_password`, `your_database_host`, `your_database_port`, and `your_database_name` with your actual PostgreSQL database credentials.

3. Set up the database:
   - Create the following table in PostgreSQL:
    ```sql
    CREATE TABLE urls (
      id SERIAL PRIMARY KEY,
      long_url TEXT NOT NULL,
      short_url VARCHAR(10) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      counter INT DEFAULT 0
    );
    ```

4. Start the server:
    ```bash
    npm run dev
    ```

### Frontend Setup
1. Navigate to the frontend directory and install the dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

2. Create a `.env` file in the frontend directory and add the following environment variables:
    ```bash
    VITE_API_URL=http://localhost:4000/api/v1/urls
    ```

3. Start the frontend development server:
    ```bash
    npm run dev
    ```

Now, both your backend and frontend will be running. You can access the frontend at `http://localhost:5173` (default Vite port) and the backend API at `http://localhost:4000`.

## Usage
1. Send a POST request to `/api/v1/urls` with the URL you want to shorten:
    ```json
    {
      "longUrl": "https://www.example.com/123456789abcdefghi"
    }
    ```

2. The application will respond with the shortened URL and other data:
    ```json
    {
      "id": 5,
      "long_url": "https://www.example.com/123456789abcdefghi",
      "short_url": "http://localhost:4000/PEBLl4E_",
      "created_at": "2024-10-06T00:04:45.183Z",
      "counter": 0
    }
    ```

3. To redirect to the original URL, simply access the shortened URL in your browser or through an HTTP request.

4. **QR Code Generation**: After the user enters a long URL and the shortened URL is generated, the frontend also provides an option to generate and download a QR code for the shortened URL.

## Error handling
When errors occur, the API responds with a JSON object that includes the HTTP status code, an error message, and an additional message for the user. Here is an example:

### Internal Server Error (500)
If an unexpected error occurs:
  ```json
  {
    "status": 500,
    "error": "Internal server error.",
    "message": "An unexpected error occurred. Please try again later."
  }
  ```

## License
This project is licensed under the ISC License.