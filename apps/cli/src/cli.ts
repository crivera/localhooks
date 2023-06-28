#!/usr/bin/env node

import { Command } from "commander";
import axios from "axios";
import EventSource from "eventsource";
import { version } from "../package.json";

const program = new Command();
program
  .name("localhooks-cli")
  .description("CLI to test webhooks locally.")
  .version(version);

program
  .option(
    "-s, --server <url>",
    "The URL for you LocalHooks server.",
    "https://server.localhooks.dev/events"
  )
  .option(
    "-f, --forward <url>",
    "The URL to forward events to.",
    "http://localhost:3001/webhooks"
  )
  .option(
    "-c, --channel <id>",
    "The channel id of events you want to listen to."
  )
  .option("-d, --debug", "Enable debug.", false);

program.parse(process.argv);
const options = program.opts();

if (options.debug) console.log(options);

const sseServer = options.server;
const forwardTo = options.forward;
const channel = options.channel;

// WORK

let fullRoute = sseServer;
if (channel) {
  fullRoute += `/${channel}`;
}

const es = new EventSource(fullRoute);
es.onmessage = async (message) => {
  try {
    if (options.debug) console.log(`Got message`, message);
    const { body, headers } = JSON.parse(message.data);
    if (options.debug) console.log(`Got body`, body);
    if (options.debug) console.log(`Got headers`, headers);

    const response = await axios.post(forwardTo, body, {
      headers: headers,
    });
    // we could add some retry logic here but - nah
    if (response.status !== 200) {
      console.error("Error forwarding message", message);
    }
  } catch (e) {
    console.error(e);
  }
};

// CLEANUP
const shutdown = () => {
  es.close();
};

process.on("SIGINT", shutdown);
process.on("SIGHUP", shutdown);
process.on("SIGTERM", shutdown);
process.on("SIGUSR2", shutdown);
