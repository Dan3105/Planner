import {
  type RouteConfig,
  route,
  index,
} from "@react-router/dev/routes";

export default [
  // Root layout that will contain sidebar navigation and page content
  route("/", "./routes/_layout.tsx", [
    // Home dashboard as index route
    index("./routes/home.tsx"),

    route("settings", "./routes/settings.tsx"),
    
    // Pages collection route
    route("pages", "./routes/pages/index.tsx"),
    route("workspace", "./routes/pages/workspace/index.tsx"),

  ]),
  route("/workspace/:workspaceId", "./routes/pages/workspace/layout/index.tsx", [
    index("./routes/pages/workspace/id/index.tsx"),

    route("page/:pageId", "./routes/pages/workspace/pages/workspace-page.tsx")
  ])
] satisfies RouteConfig;
