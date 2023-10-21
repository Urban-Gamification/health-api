import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { CronJob } from "cron";


// const object with properties name and lastName
const stepsAchivement = {
  username: "alice",
  activity: "steps",
  achivement: "6000 steps"
};

const sleepAchivement = {
  username: "alice",
  activity: "sleep",
  achivement: "82"
};


// function to make HTTP POST request to localhost:3000
const makePostRequest = async (achivement: any) => {
  try {
    const response = await fetch("http://localhost:3000/api/health", {
      method: "POST",
      body: JSON.stringify(achivement),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};


const stepsJob = new CronJob(
  "0 * * * * *",
  () => makePostRequest(stepsAchivement),
  null,
  true,
  "America/Los_Angeles"
);

const sleepJob = new CronJob(
  "0 0 * * * *",
  () => makePostRequest(sleepAchivement),
  null,
  true,
  "America/Los_Angeles"
);

stepsJob.start();
sleepJob.start();


const PORT = process.env.PORT || 8080;
const ENV = process.env.NODE_ENV || "production";

const app: Express = express();

app.use(helmet());

app.use(cors());

app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome");
});

// Articles routes

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${ENV} environment`);
});

export { app as default, server };
