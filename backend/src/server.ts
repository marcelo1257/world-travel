import cors from "cors";

import express from "express";
import { runDatabase } from "./database/init";
import countriesRoutes from "./modules/countries/countries.routes";
// import activitiesRoutes from "./modules/activities/activities.routes";
// import routesRoutes from "./modules/routes/routes.routes";
// import perfilRoutes from "./modules/perfil/perfil.routes";

const app = express();

const PORT = 3000;

async function startServer(): Promise<void> {
  try {
    await runDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}
startServer();

app.use(
  cors({
    origin: "http://localhost:4200",
  }),
);

app.use("/api/countries", countriesRoutes);

// app.use("/api/activities", activitiesRoutes);

// app.use("/api/routes", routesRoutes);

// app.use("/api/perfil", perfilRoutes);
