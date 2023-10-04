<script>
  import InfiniteScroll from "svelte-infinite-scroll";
  import { onMount } from "svelte";
  import { quintOut } from "svelte/easing";
  import { flip } from "svelte/animate";
  import { fly, slide } from "svelte/transition";

  export let commands;
  export let tag_selected;

  $: filteredCmds = commands?.data || [];
  let showOnPx = 150;
  let hidden = true;
  let node;
  let animate = false;
  let selected = null;
  let page = 0;
  let size = 10;
  let copied = null;
  let tags = ["artisan", "git", "linux", "npm", "ssh"];

  // $: filteredCmds = [...filteredCmds, ...commands.splice(size * page, size * (page + 1) - 1)];

  function toggle(cmd) {
    selected = selected == cmd ? null : cmd;
  }

  const handleCopy = async (id, cmd) => {
    copied = id;
    await navigator.clipboard.writeText(cmd);
  };

  const goTop = () => {
    document.body.scrollIntoView();
  };

  const scrollContainer = () => {
    return document.documentElement || document.body;
  };

  const handleOnScroll = () => {
    if (!scrollContainer()) {
      return;
    }

    if (scrollContainer().scrollTop > showOnPx) {
      hidden = false;
    } else {
      hidden = true;
    }
  };

  onMount(() => {
    animate = true;
  });
</script>

<svelte:window on:scroll={handleOnScroll} />

<div class="container flex flex-wrap mx-auto mt-2 lg:mt-8 mb-8">
  <div class="w-full pb-6 mt-6 md:mt-12 md:w-1/5">
    <div class="px-1">
      <span class="hidden md:block lg:block">Tags</span>
      {#each tags as tag}
        <span class="relative inline-flex">
          <button
            type="button"
            class:tag_selected={tag_selected === tag}
            class="inline-flex items-center text-sm py-2 px-5 rounded-lg bg-red-100 m-1"
            on:click
          >
            {tag}
          </button>
          {#if tag_selected === tag}
            <span class="flex absolute h-3 w-3 top-0 right-0 -mt-1 mr-0">
              <button
                on:click
                class="relative inline-flex items-center justify-start rounded-full h-4 w-4 bg-gray-500 hover:bg-gray-600 text-white text-sm p-1 cursor-pointer"
              >
                x
              </button>
            </span>
          {/if}
        </span>
      {/each}
    </div>
  </div>
  <div class="w-full px-0 md:w-4/5">
    <div class="w-full px-1 md:px-0">
      <h2 class="font-bold text-xl md:text-3xl text-gray-500 text-center pb-4 md:pb-8">Click to copy command</h2>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 max-h-screen overflow-auto scrollbar-hide">
        {#if animate}
          {#each filteredCmds as cmd, index (cmd.id)}
            <div
              bind:this={node}
              class="w-full mb-4 md:mb-6 pb-0 transition-all"
              animate:flip={{ easing: quintOut, duration: 2000 }}
              in:fly={{ x: 50 }}
            >
              <div class="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
                {#if copied === cmd.id}
                  <div class=" relative">
                    <span class="flex absolute h-3 w-3 z-10 right-12">
                      <span class="relative inline-flex text-teal-400 text-base"> Copied! </span>
                    </span>
                  </div>
                {/if}
                <!-- svelte-ignore a11y-invalid-attribute -->
                <a
                  class={`block rounded-xl bg-white p-4 sm:p-6 lg:p-8 relative ${copied === cmd.id ? "copied" : ""} `}
                  href="#"
                  on:click|preventDefault={() => handleCopy(cmd.id, cmd.attributes.Name)}
                >
                  <!-- on:click|preventDefault={() => toggle(cmd)} -->
                  <h3 class="text-base font-bold text-gray-900 sm:text-xl lowercase">{cmd.attributes.Name}</h3>
                  <!-- <p class="mt-2 text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.
                  </p> -->
                </a>
              </div>
            </div>
          {/each}
          <!-- {#if page > 2}
            <button class=" fixed bottom-0 right-10" on:click={goTop}> scroll up </button>
          {/if} -->
          <InfiniteScroll threshold={100} on:loadMore={() => page++} />
        {/if}
      </div>
    </div>
  </div>

  {#if selected}
    <div
      class="modal fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto flex items-center justify-center h-screen w-full"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-2/4 shadow-lg rounded-md bg-white"
        in:slide={{ delay: 50 }}
        out:slide={{ delay: 100 }}
      >
        <div class="flex items-start justify-between">
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="defaultModal"
            on:click={() => toggle(selected)}
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div>
          <h2 class="capitalize">{selected.name}</h2>
          <!-- <span in:fade={{ delay: 300 }} out:fade={{ delay: 0 }} class="price">
						{product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
					</span> -->

          <!-- <footer in:slide={{ delay: 600 }} out:slide={{ delay: 0 }}>
						<button>Buy Now</button>
					</footer> -->
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* For IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  .tag_selected {
    @apply bg-red-400;
  }
  .copied {
    animation: highlight 2s;
  }
  @keyframes highlight {
    from {
      background-color: lightgreen;
    }
  }
</style>
