<script lang="ts">
  import { Heading, Button } from 'flowbite-svelte';
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<div>
  <script src="https://cloud.google.com/ai/gen-app-builder/client"></script>
  <gen-search-widget
    configId="aaf79227-48c1-4e6a-aad0-755cf53f07cb"
    triggerId="searchWidgetTrigger">
  </gen-search-widget>

  <style>
    .grecaptcha-badge { visibility: hidden; }
  </style>

  <Button color="yellow" id="searchWidgetTrigger" hidden>Open Search Widget</Button>
  <script>
    document.getElementById("searchWidgetTrigger").click();
  </script>
</div>
