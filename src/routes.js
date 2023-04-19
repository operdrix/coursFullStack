import { getPosts, insertPost } from "./handlers";

export default function setupRoutes(routes) {
    routes.get("/", getPosts);
    routes.post("/insert", insertPost);
}
