import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import SwaggerParser from '@apidevtools/swagger-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// Boolean flag to control whether to load Swagger docs
// const ENABLE_SWAGGER = process.env.ENABLE_SWAGGER === 'true' || process.env.NODE_ENV === 'development';
const ENABLE_SWAGGER = false

app.use(cors());
app.use(express.json());

// Function to load YAML file
async function loadYamlFile(filePath: string) {
  try {
    const data = await SwaggerParser.validate(filePath);
    return data;
  } catch (error) {
    console.error(`Error loading YAML file: ${error}`);
    throw error;
  }
}

// Initialize app and start server
async function startServer() {
  try {
    // Only load swagger if enabled
    if (ENABLE_SWAGGER) {
      const openApiPath = path.join(__dirname, 'swagger/openapi.yaml');
      const swaggerDocument = await loadYamlFile(openApiPath);
      
      // Serve Swagger UI
      app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
        isExplorer: true,
        explorer: true
      }));
      console.log('Swagger UI enabled at /swagger');
    }
    
    app.use("/api", routes);
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
