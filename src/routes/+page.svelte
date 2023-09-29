<script lang="ts">
  import { Heading, Button } from 'flowbite-svelte';
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<div>
  <Navbar let:hidden let:toggle rounded color="form">
    <NavBrand>
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Ask DORA</span>
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
      <iframe src="/search.html" title="Search app" width="800" height="600" class="mt-6" />
    </div>
    <div>
      <Heading tag="h3">Chat app</Heading>
      <iframe src="/chat.html" title="Chat app" width="400" height="600" class="mt-6" />
    </div>
</div>

</div>
</main>
