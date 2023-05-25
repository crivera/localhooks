# `LocalHooks CLI`

This is the CLI for the LocalHooks Project. See the documentation here: https://docs.localhoooks.dev

```
Usage: localhooks-cli [options]

CLI to test webhooks locally.

Options:
-V, --version output the version number
-s, --server <url> The URL for you LocalHooks server. (default: "https://server.localhooks.dev/events")
-f, --forward <url> The URL to forward events to. (default: "http://localhost:3001/webhooks")
-c, --channel <id>   The channel id of events you want to listen to.
-d, --debug Enable debug. (default: false)
-h, --help display help for command

```

## Local Development

You can run the project locally using: `npm run dev -- -d`

## License

MIT
