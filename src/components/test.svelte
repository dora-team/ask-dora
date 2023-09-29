<script lang="ts">
  import {
    lookupWidgetConfig,
    widgetConverseConversation,
  } from "$/lib/discovery_engine";
  import { onMount } from "svelte";

  const widgedID = "aaf79227-48c1-4e6a-aad0-755cf53f07cb";

  let ready = false;
  let waiting = false;
  let input = "";
  let placeholder = "Ask me anything...";

  let replies: { reply: string }[] = [];
  let conversationID = "-";
  let searchResults: any[] = [];

  onMount(async () => {
    const widgetConfig = await lookupWidgetConfig(widgedID);

    console.log(widgetConfig);
    ready = true;
  });

  async function onSubmit() {
    waiting = true;
    const response = await widgetConverseConversation(widgedID, input);
    waiting = false;
    console.log(response);

    input = "";
    placeholder = "Ask a follow up question";
    conversationID = response.conversationId;
    replies = [...replies, response.converseConversationResponse.reply];
    searchResults = response.converseConversationResponse.searchResults;
  }
</script>

<div class="flex flex-col w-full py-10">
  <form
    class="w-full flex flex-col items-center"
    on:submit|preventDefault={onSubmit}
  >
    <h1 class="my-2 text-white text-xl text-center">My custom search widget</h1>
    <div>
      <div
        class="relative text-gray-600 focus-within:text-gray-400 flex justify-center gap-2"
      >
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button
            type="submit"
            class="p-1 focus:outline-none focus:shadow-outline"
          >
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6"
              ><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg
            >
          </button>
        </span>
        <input
          type="search"
          name="search"
          bind:value={input}
          disabled={!ready}
          class="py-2 text-sm w-[500px] text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
          placeholder={!ready
            ? "Connecting to answering service please wait..."
            : placeholder}
          autocomplete="off"
        />
        <button
          type="submit"
          disabled={!ready || waiting}
          class="bg-blue-500 w-[100px] h-[40px] hover:bg-blue-700 disabled:bg-slate-900 text-white font-bold py-2 px-4 rounded flex justify-center"
        >
          {#if waiting}
            <svg
              class="animate-spin mt-[0.1rem] h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          {:else}
            Search
          {/if}
        </button>
      </div>
    </div>
  </form>

  <div class="mx-auto w-md my-10 prose prose-invert lg:prose-xl">
    {#each replies as reply}
      <div>
        {reply.reply}
      </div>
    {/each}
  </div>

  {#if searchResults.length > 0}
    <div class="mx-auto w-md my-10 prose prose-invert lg:prose-xl">
      <h2 class="text-center">Documents</h2>
      <table class="table-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {#each searchResults as result}
            <tr>
              <td>{result.id}</td>
              <td>{result.document.derivedStructData.link}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
