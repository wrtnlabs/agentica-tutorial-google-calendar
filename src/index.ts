import { Agentica } from "@agentica/core";
import typia from "typia";
import dotenv from "dotenv";
import { OpenAI } from "openai";

import { GoogleCalendarService } from "@wrtnlabs/connector-google-calendar";

dotenv.config();

export const agent = new Agentica({
  model: "chatgpt",
  vendor: {
    api: new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    }),
    model: "gpt-4o-mini",
  },
  controllers: [
    {
      name: "GoogleCalendar Connector",
      protocol: "class",
      application: typia.llm.application<GoogleCalendarService, "chatgpt">(),
      execute: new GoogleCalendarService({
        googleClientId: process.env.GOOGLE_CALENDAR_CLIENT_ID!,
        googleClientSecret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET!,
        googleRefreshToken: process.env.GOOGLE_CALENDAR_REFRESH_TOKEN!,
      }),
    },
  ],
});

const main = async () => {
  console.log(await agent.conversate("Get my calendar lists."));
};

main();
