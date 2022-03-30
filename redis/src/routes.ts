import { Router } from "express";
import redis from "./db/redis";

const routes = Router();

routes.post("/add/:name", async (req, res) => {
  const { name } = req.params;
  redis.lpush("queue", name);
  return res.json({ name });
});
routes.post("/remove", async (req, res) => {
  const name = await redis.rpop("queue");
  return res.json({ name });
});
routes.get("/view", async (req, res) => {
  const queue = await redis.lrange("queue", 0, -1);
  return res.json({ queue });
});

export default routes;
