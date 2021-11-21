# Simform-Pratical-Test
Simform Pratical Test for node profile

## File Structure 

├── app.js
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
|   |     ├── database/
|   |     └── user/
│   ├── services/
│   └── ...
├── Dockerfile.server
├── docker-compose.yml
├── .env
├── .package.json
├── .package-lock.json
├── .README.md
└── .gitignore


## Package need to be install
    "aws-sdk": "^2.1033.0",
    "bcrypt": "^5.0.1",
    "compression": "^1.7.4",
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "helmet": "^4.6.0",
    "jsonwebtoken": "^8.5.1",
    "multer": "^1.4.3",
    "multer-s3": "^2.10.0",
    "path": "^0.12.7",
    "pg": "^8.7.1",
    "uuid": "^8.3.2"

## .env Variables
    PORT= 8080   
    AWS_BUCKET 
    AWS_ACCESS_KEY_ID 
    AWS_SECRET_ACCESS_KEY 
    AWS_REGION
    APP_URL = http://localhost:8080/api
    DatabaseURL=postgres://username:password@host:port/database_name
    ACCESS_TOKEN = d10bigsksvgihiuh7b0929bd8009e3ea92accb43c98699156f2186227ecc23
