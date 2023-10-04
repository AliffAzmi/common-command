<script>
  export let cc_s;
  export let commands = [];
</script>

<div class="z-20 flex items-center mt-10 bg-cover">
  <!-- style="background-image: url(bg.svg);" -->
  <div class="flex flex-col items-center justify-center w-full pt-2 sm:pt-16">
    <div class="max-w-3xl p-3 mx-auto lg:max-w-full">
      <h1 class="pt-10 text-center">
        <!-- rounded-lg bg-gray-900 -->
        <span class="text-3xl font-bold text-center"> Command Compendium </span>
      </h1>
      <p class="max-w-3xl mx-auto my-6 text-base font-bold leading-normal text-left lg:text-xl lg:text-center">
        Command Compendium is your essential toolkit for managing and executing common commands across various
        development environments. Whether you're working with PHP artisan, npm, SSH, or any other command-line tools,
        this comprehensive reference guide simplifies your workflow. Access a curated list of frequently used commands,
        along with clear descriptions and usage examples, to streamline your development tasks and boost productivity.
      </p>
    </div>

    <div class="w-full mx-auto mt-2">
      <div class="relative max-w-3xl px-6 mx-auto">
        <div class="absolute top-0 left-0 flex items-center h-10 pl-10 mt-1">
          <svg class="w-4 h-4 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
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

        {#if !commands.length}
          <div class="mt-1">
            <div class="z-50 w-full overflow-y-auto text-gray-600 rounded-lg text-center">
              <div id="nosearchresults" class=" px-6 pb-6 bg-white">
                <span class="font-bold"> Oops, no command found!!!</span>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
    <!--End Search-->
  </div>
</div>
