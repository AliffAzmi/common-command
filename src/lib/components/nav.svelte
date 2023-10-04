<script>
  import { onMount, onDestroy } from "svelte";

  export let cc_s;
  const scrollNavBar = 380;
  $: show = true;

  onMount(() => {
    window.onscroll = () => {
      if (window.scrollY < scrollNavBar) {
        show = true;
      } else {
        show = false;
      }
    };
  });
</script>

<header class="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-300 text-white py-4 fixed top-0 z-10 w-full shadow">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between">
      <a href="/">
        <h1 class="text-2xl md:text-3xl">
          <img src="/logo_cc_no_bg_cropped.png" alt="logo" class=" w-48" />
        </h1>
      </a>
      <div class:scrolled={show} class={`relative w-full ease-in duration-300`}>
        <div class="absolute top-0 left-0 flex items-center h-10 pl-4 mt-1">
          <svg class="w-4 h-4 text-gray-600 fill-current mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
            />
          </svg>
        </div>
        <input
          id="search-toggle"
          type="search"
          placeholder="Search..."
          class="block w-full py-3 pl-12 pr-4 font-bold text-gray-700 bg-gray-100 rounded-lg shadow focus:outline-none focus:bg-white"
          bind:value={cc_s}
          on:input
        />
      </div>
    </div>
  </div>
</header>

<style>
  .scrolled {
    @apply ease-out duration-300;
    transform: translate(0, calc(-100% - 1rem));
  }
</style>
