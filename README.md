# Lightweight CI/CD Test Pipeline for `Yogit`

This repository provides a **minimalistic CI/CD pipeline** for the [`Yogit`](https://github.com/persona-mp3/yogit.git) project. It's designed to run simple test automation using **GitHub webhooks**, **bash scripting**, and a few local tools like `tmux` and `ngrok`.

> ⚠️ Note: This setup was created and tested on **Unix-based systems**. It may not work as expected on Windows without modification.

---

## 🧩 Features

- **Webhook-triggered pipeline**: GitHub webhooks initiate the test process automatically.
- **Shell-script based automation**: No third-party CI tool required.
- **Portable setup** using `tmux` sessions for persistent background jobs.
- **Remote access** with `ngrok` to expose your local webhook server for GitHub to reach.

---

## 🛠️ Requirements

Make sure the following are installed on your system:

- `bash`
- `tmux`
- `ngrok` Set up an account at [Ngorks official website](https://ngrok.com) and instructions on setting up for your dev setup
- `curl`
- `node` to be able start the server script or any language of your choice
- GitHub repo access to configure webhooks. Read [Github Webhook](https://docs.github.com/en/webhooks/about-webhooks) to have an indept or basic understandin implementations of webhooks

---

## 🚀 Getting Started  

1. **Clone this repo:**

   ```bash
   git clone https://github.com/persona-mp3/ci_test.git
   cd ci_test
   ```

2. **Start up the server:**

   ```bash
   node server.mjs
   ```

   
   
4. **Expose the port, by default it is 8900 if not configured**
   ```bash
   ngrok port 8900
   ```
   Ngrok will show a url of something like this `"https://some-randome-ngrok.com"`. Paste this as the url webhook to use, and change the endpoint to your liking.
   > By default, the post endpoint is `/gh/wh` /github/webhook was just the alias I had choosen. So the URL to use in the webhook in GitHub is `https://some-random-ngrok.com/gh/wh`. Do not EXPOSE this url!
   
   > Server is set up to receive `application/json` payload. Change this to match what you selected in creating the webhook.


   > The server is also set up to listen for only push events, you can add your own logic to handle pull events, commits, merges and others
