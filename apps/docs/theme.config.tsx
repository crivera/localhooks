const config = {
  logo: (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M16 9v6a5 5 0 0 1 -10 0v-4l3 3"></path>
        <path d="M16 7m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
        <path d="M16 5v-2"></path>
      </svg>
      <span style={{ marginLeft: ".4em", fontWeight: 800 }}>LocalHooks</span>
    </>
  ),
  project: {
    link: "https://github.com/crivera/localhooks",
  },
  docsRepositoryBase:
    "https://github.com/crivera/localhooks/tree/main/apps/docs",
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="LocalHooks" />
      <meta property="og:description" content="Free Webhooks for developers." />
    </>
  ),
  feedback: {
    content: () => null,
  },
  footer: {
    text: (
      <span>
        {new Date().getFullYear()} ©{" "}
        <a href="https://localhooks.dev" target="_blank">
          LocalHooks
        </a>
      </span>
    ),
  },
};

export default config;
