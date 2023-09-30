<script lang="ts">
  import { lookupWidgetConfig } from "$lib/discovery-engine";
  import { onMount } from "svelte";

  onMount(() => {
    const widgetConfig = lookupWidgetConfig(
      "aaf79227-48c1-4e6a-aad0-755cf53f07cb"
    );

    console.log(widgetConfig);
  });
</script>

<div />
