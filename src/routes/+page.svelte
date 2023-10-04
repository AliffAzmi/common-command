<script>
  import Hero from "$lib/components/hero.svelte";
  import Head from "$lib/components/head.svelte";
  import { onMount } from "svelte";
  import Commands from "$lib/components/commands.svelte";
  import Nav from "$lib/components/nav.svelte";

  $: cc_s = "";
  $: tag_selected = "";
  let commands = [];

  const getCommands = async () => {
    const response = await fetch(`/api/commands?q=${cc_s}&tag=${tag_selected}`);
    const data = await response.json();

    commands = data.commands;
  };
  const handleSearch = async () => {
    await getCommands();
  };
  const handleTags = async (e) => {
    if (tag_selected && tag_selected === e.target.innerText) {
      tag_selected = "";
    } else {
      tag_selected = e.target.innerText !== "x" ? e.target.innerText : "";
    }
    await getCommands();
  };
  onMount(async () => {
    try {
      await getCommands();
    } catch (error) {
      console.log(error);
    }
  });
</script>

<Head url="/" title="Home | Common Command" />

<Nav bind:cc_s on:input={handleSearch} />
<Hero bind:cc_s on:input={handleSearch} commands={commands.data} />
<Commands on:click={handleTags} {commands} {tag_selected} />
