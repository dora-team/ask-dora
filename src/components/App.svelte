<script lang="ts">
  import { Heading, NavBrand, NavLi, NavUl, Navbar } from "flowbite-svelte";
</script>

<div class="text-red">
  <Navbar let:hidden let:toggle rounded color="form">
    <NavBrand>
      <span
        class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
        >Ask DORA</span
      >
    </NavBrand>
    <NavUl {hidden}>
      <NavLi href="/" active={true}>Home</NavLi>
      <NavLi href="/">About</NavLi>
      <NavLi href="/">Navbar</NavLi>
      <NavLi href="/">Pricing</NavLi>
      <NavLi href="/">Contact</NavLi>
    </NavUl>
  </Navbar>
</div>
<main class="px-20 pt-6">
  <div>
    <div class="flex space-x-6">
      <div>
        <Heading tag="h3">Search app</Heading>
        <div>
          <iframe
            src="/app/search.html"
            title="Search app"
            width="800"
            height="600"
            class="mt-6"
          />
        </div>
      </div>
      <div>
        <Heading tag="h3">Chat app</Heading>
        <iframe
          src="/app/chat.html"
          title="Chat app"
          width="400"
          height="600"
          class="mt-6"
        />
      </div>
    </div>
  </div>
</main>
