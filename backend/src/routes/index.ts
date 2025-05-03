import express from "express";
import pages_router from "./workspace/pages_router";
import workspaces_router from "./workspace/workspaces_router";

const routes = express.Router();

// Mount the domain-specific routers
routes.use('/pages', pages_router);
routes.use('/workspaces', workspaces_router);

export default routes;