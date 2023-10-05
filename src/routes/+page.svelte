<script lang="ts">
	import { lookupWidgetConfig, widgetConverseConversation } from "../lib/discovery_engine";
	import { onMount } from "svelte";
	import { Navbar, NavBrand, NavLi, NavUl } from "flowbite-svelte";
	import { Heading, A, Label, Card } from "flowbite-svelte";
	import { Section, Cta } from "flowbite-svelte-blocks";
	import { Alert } from "flowbite-svelte";
	import { InfoCircleSolid } from "flowbite-svelte-icons";
	import { ButtonGroup, Button } from "flowbite-svelte";

	const widgetId = "aaf79227-48c1-4e6a-aad0-755cf53f07cb";

	let ready = false;
	let waiting = false;
	let input = "";
	let placeholder = "Ask DORA anything...";

	let queries: any[] = [];
	let replies: { reply: string }[] = [];
	let conversationID = "-";
	let searchResults: any[] = [];

	onMount(async () => {
		const widgetConfig = await lookupWidgetConfig(widgetId);
		ready = true;
	});

	function makeTitle(slug: any) {
		var words = slug.split("-");
		for (var i = 0; i < words.length; i++) {
			var word = words[i];
			words[i] = word.charAt(0).toUpperCase() + word.slice(1);
		}
		return words.join(" ");
	}

	async function onSubmit() {
		queries.push(input);
		waiting = true;
		const response = await widgetConverseConversation(widgetId, input);
		waiting = false;
		input = "";
		placeholder = "Ask a follow-up question...";
		conversationID = response.conversationId;
		replies = [...replies, response.converseConversationResponse.reply];
		searchResults = response.converseConversationResponse.searchResults;
		window.scrollTo(0, 500);
	}

	function updateSearchField(text: string) {
		input = text;
		conversationID = "-";
		replies = [];
		searchResults = [];
		queries = [];
		document.getElementById("submit")!.click();
	}

	function resetForm() {
		input = "";
		conversationID = "-";
		replies = [];
		searchResults = [];
		queries = [];
	}
</script>

<Navbar class="bg-[#275b89] pt-2">
	<NavBrand>
		<span class="self-center whitespace-nowrap text-xl font-semibold text-[#e4fef6]">
			Ask DORA
		</span>
	</NavBrand>
	<NavUl>
		<NavLi class="text-gray-50" href="https://dora.dev/">DORA Website</NavLi>
		<NavLi
			class="text-gray-50"
			href="https://cloud.google.com/generative-ai-app-builder/docs/introduction"
			>Vertex AI Search</NavLi
		>
		<NavLi class="text-gray-50" href="https://cloud.google.com/ai/generative-ai"
			>Generative AI on Google Cloud</NavLi
		>
		<NavLi class="text-gray-50" href="https://github.com/koverholt/ask-dora">Source Code</NavLi>
	</NavUl>
</Navbar>

<Alert border color="green" class="mt-2 text-md">
	<InfoCircleSolid slot="icon" class="w-4 h-4" />
	It's here! The <span class="font-medium">2023 Accelerate State of DevOps Report</span> is now available
	and indexed in Ask DORA!
</Alert>

<div class="flex flex-col w-full px-10">
	<div class="mt-10 px-10 -mb-20">
		<img src="dora.png" width="400px" alt="DevOps Research and Assessment (DORA)" />
	</div>
	<Section name="cta">
		<Cta ctatype="image">
			<svelte:fragment slot="h2">Ask DORA anything in natural language</svelte:fragment>
			<p class="mt-6 mb-2 font-light text-gray-500 dark:text-gray-400 md:text-lg">
				DORA is the largest and longest running research program of its kind that seeks to
				understand the capabilities that drive software delivery and operations performance. This
				app uses
				<A
					href="https://cloud.google.com/generative-ai-app-builder/docs/introduction"
					class="font-medium hover:underline break-normal text-[#0000EE]">Vertex AI Search</A
				> and generative AI functionality in <A
					class="font-medium
        hover:underline break-normal text-[#0000EE]"
					href="https://cloud.google.com/">Google Cloud</A
				> to search and summarize content on the <A
					class="font-medium hover:underline break-normal text-[#0000EE]"
					href="https://dora.dev/">DORA website</A
				> using LLMs and a conversational search experience.
			</p>
		</Cta>

		<form class="w-full flex flex-col items-center -mt-6" on:submit|preventDefault={onSubmit}>
			<h1 class="my-2 text-white text-xl text-center">My custom search widget</h1>
			<div class="text-center mb-8">
				<span class="font-bold">Example questions:</span>
				<ButtonGroup>
					<Button on:click={() => updateSearchField("What are the Four Key Metrics?")}>
						What are the Four Key Metrics?</Button
					>
					<Button on:click={() => updateSearchField("How can I measure developer happiness?")}>
						How can I measure developer happiness?
					</Button>
					<Button
						on:click={() => updateSearchField("What are the benefits of having strong user focus?")}
					>
						What are the benefits of having strong user focus?
					</Button>
				</ButtonGroup>
			</div>
			<div>
				<div class="relative text-gray-600 focus-within:text-gray-400 flex justify-center gap-2">
					<span class="absolute inset-y-0 left-0 flex items-center pl-2">
						<button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
							<svg
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								viewBox="0 0 24 24"
								class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg
							>
						</button>
					</span>
					<input
						type="search"
						name="search"
						id="search"
						class="py-2 text-md w-[500px] text-black bg-white rounded-md pl-10 focus:bg-white focus:text-gray-900"
						{placeholder}
						bind:value={input}
					/>
					<button
						id="submit"
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
					<button
						id="clear"
						type="reset"
						class="bg-gray-500 w-[100px] h-[40px] hover:bg-blue-700 disabled:bg-slate-900 text-white font-bold py-2 px-4 rounded flex justify-center"
						on:click={resetForm}
						>Reset
					</button>
				</div>
			</div>
		</form>
	</Section>

	<div class="mx-auto w-md -my-10 prose prose-invert lg:prose-xl">
		{#if searchResults.length > 0}
			<Heading tag="h3">Generated Summary</Heading>
		{/if}
		{#each replies as reply, i}
			<div>
				<Card class="my-6 bg-blue-100" size="lg">
					<div class="flex gap-5">
						<div class="basis-5 grow-0 shrink-0 my-auto">
							<img src="quote.png" width="20" alt="Quote" />
						</div>
						<div class="basis-100">
							<p class="font-bold text-gray-700 dark:text-gray-400 leading-tight mb-4">
								{queries[i]}
							</p>
							<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
								{@html reply.reply}
							</p>
						</div>
					</div>
				</Card>
			</div>
		{/each}
	</div>

	{#if searchResults.length > 0}
		<div class="mx-auto w-md my-20 prose prose-invert lg:prose-xl">
			<Heading tag="h3">Relevant Documents</Heading>
			{#each searchResults as result}
				{#if result.document.derivedStructData.link.endsWith("pdf")}
					<Card
						class="my-6"
						size="lg"
						target="_blank"
						href={result.document.derivedStructData.link
							.replace(
								"gs://dora-unstructured-docs/",
								"https://storage.googleapis.com/dora-unstructured-docs/"
							)
							.replace(".html", "")
							.replaceAll("$", "/")
							.replaceAll("#", ":")
							.replace("dora-dev", "dora.dev")}
					>
						<div class="flex gap-6">
							<div>
								<svg
									class="w-[48px] h-[48px] text-gray-800 dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 16 20"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										stroke-opacity="0.2"
										d="M1 18a.969.969 0 0 0 .933 1h12.134A.97.97 0 0 0 15 18M1 7V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2v5M6 1v4a1 1 0 0 1-1 1H1m0 9v-5h1.5a1.5 1.5 0 1 1 0 3H1m12 2v-5h2m-2 3h2m-8-3v5h1.375A1.626 1.626 0 0 0 10 13.375v-1.75A1.626 1.626 0 0 0 8.375 10H7Z"
									/>
								</svg>
							</div>
							<div>
								<h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
									{makeTitle(
										result.document.derivedStructData.link
											.replace("gs://dora-unstructured-docs/", "")
											.replace("https", "")
											.replace(".html", "")
											.replaceAll("$", "-")
											.replaceAll("#", "-")
											.replace("dora-dev", "")
									)}
								</h5>
								<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
									{@html result.document.derivedStructData.snippets[0].snippet}
								</p>
							</div>
						</div>
					</Card>
				{:else}
					<Card
						class="my-6"
						size="lg"
						target="_blank"
						href={result.document.derivedStructData.link
							.replace("gs://dora-unstructured-docs/", "")
							.replace(".html", "")
							.replaceAll("$", "/")
							.replaceAll("#", ":")
							.replace("dora-dev", "dora.dev")}
					>
						<div class="flex gap-6">
							<div>
								<svg
									class="w-[48px] h-[48px] text-gray-800 dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 19 19"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										stroke-opacity="0.2"
										d="M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7"
									/>
								</svg>
							</div>
							<div>
								<h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
									{makeTitle(
										result.document.derivedStructData.link
											.replace("gs://dora-unstructured-docs/", "")
											.replace("https", "")
											.replace(".html", "")
											.replaceAll("$", "-")
											.replaceAll("#", "-")
											.replace("dora-dev", "")
									)}
								</h5>
								<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
									{@html result.document.derivedStructData.snippets[0].snippet}
								</p>
							</div>
						</div>
					</Card>
				{/if}
			{/each}
		</div>
	{/if}
</div>
