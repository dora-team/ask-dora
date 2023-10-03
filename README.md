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

## Steps to deploy site

1. Enable the Firebase API
2. Deploy a default site
3. Create an additional site for https://ask-dora.web.app
4. Configure deploy targets in `.firebaserc` and `firebase.json`
5. Deploy site to Firebase Hosting with `firebase deploy`
