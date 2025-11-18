import express from "express";
import "dotenv/config";
import { primsa } from "./db/connect.js";
const app = express();

app.use(express.json());

app.post("/task", async (req, res) => {
  const body: { name: string } = req.body;

  try {
    await primsa.post.create({ data: { title: body.name } });
  } catch (e) {
    console.log(e);
    res.json({ message: "task couldnt be added" });
  }
  res.json({ message: "tasks added succesfully" });
});

app.get("/allTasks", async (req, res) => {
  const allTasks = await primsa.post.findMany();
  return res.json({ tasks: allTasks });
});

app.post("/getTask", async (req, res) => {
  const { id } = req.body;
  const task = await primsa.post.findFirst({
    where: { id },
  });
  return res.json({ task });
});

app.delete("/deleteTask", async (req, res) => {
  const { id } = req.body;

  try {
    await primsa.post.delete({
      where: {
        id,
      },
    });
  } catch {
    res.json({ message: "delete failed" });
    return;
  }
  res.json({ message: "delete failed" });
});

app.listen(3000);
