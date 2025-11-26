import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    route("signup", "routes/signup.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
    route("courses", "routes/courses/_index.tsx", [
        route(":id", "routes/courses/$id.tsx"),
    ]),
] satisfies RouteConfig;
