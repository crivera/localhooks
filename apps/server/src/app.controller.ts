import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Sse,
} from "@nestjs/common";
import { Observable, Subject, filter, map } from "rxjs";
import { promises } from "fs";

type Message = {
  data: Record<string, unknown>;
  channel?: string;
};

function validateChannel(channel?: string) {
  if (channel && channel.length > 20) {
    throw new BadRequestException(
      "Channel length needs to be under 20 characters."
    );
  }
}

@Controller()
export class AppController {
  constructor() {}

  queue = new Subject<Message>();

  @Get("/")
  async info() {
    const f = await promises.readFile("package.json", "utf-8");
    const packageJson = JSON.parse(f);

    return {
      message: "LocalHooks server running.",
      status: "ok",
      version: packageJson.version,
    };
  }

  @Post("message/:channel?")
  message(
    @Body() body: Record<string, unknown>,
    @Param("channel") channel?: string
  ) {
    validateChannel(channel);

    this.queue.next({
      channel,
      data: body,
    });
    return { status: "ok" };
  }

  @Sse("events/:channel?")
  events(@Param("channel") channel?: string): Observable<MessageEvent> {
    validateChannel(channel);

    return this.queue.asObservable().pipe(
      filter((value) => {
        // if we didnt subscribe to a channel but the message was sent to a specific channel
        if (!channel && value.channel) {
          return false;
        }

        // if we subscribe to a channel but the message was sent to no channel
        if (channel && !value.channel) {
          return false;
        }

        // if the channels match
        return !value.channel || channel === value.channel;
      }),
      map((value) => ({ data: value.data } as MessageEvent))
    );
  }
}
