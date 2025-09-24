**DEPRECATED**
Ask DORA was an early experiment in using Generative AI to explore DORA research. It has been turned down and much of its functionality is available within dora.dev's search capability. The domain ask.dora.dev redirects to dora.dev/search.

---
# Ask DORA

## Overview

Web app to search and chat with documents from dora.dev.

These are the steps that we followed to build the search and chat apps for Ask
DORA.

## Steps to create search and chat apps

1. Download the HTML pages and PDF reports from
   https://dora.dev/
2. Upload the HTML pages and PDF reports to a GCS bucket
3. Create search and chat apps in
   [Vertex AI Search and Conversation](https://cloud.google.com/generative-ai-app-builder/docs/introduction)
4. Create unstructured data stores pointing to the GCS bucket
5. Generate the embed codes for the search and chat apps

## Steps to create site

1. Install `npm`
2. Create a new site with [Svelte](https://svelte.dev/) and
   [Flowbite-Svelte](https://flowbite-svelte.com/)
3. Create layout of site
4. Paste the embed codes for the search and chat apps
5. Preview the site locally with `npm run dev`

## Steps to deploy site (initially)

1. Enable the Firebase API
2. Deploy a default site
3. Create an additional site for https://ask-dora.web.app
4. Configure deploy targets in `.firebaserc` and `firebase.json`
5. Deploy site to Firebase Hosting with `firebase deploy`

## Steps to update the site

1. Open a pull request for https://github.com/dora-team/ask-dora/
2. Have that pull request reviewed and merged

From the `main` branch

1. Run `npm run build`
2. Run `firebase deploy`

You will need the [Firebase CLI](https://firebase.google.com/docs/cli) the node package is the recommended way to install it.
