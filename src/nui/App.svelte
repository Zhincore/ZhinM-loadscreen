<script lang="ts">
  import { onMount, tick } from "svelte";
  import { fade } from "svelte/transition";
  import { parse } from "yaml";
  import type { Config } from "$lib/Config";
  import { getHandoverData } from "$lib/getHandoverData";
  import SlideShow from "./components/SlideShow.svelte";
  import Image from "./components/Image.svelte";
  import Panel from "./components/Panel.svelte";

  const handoverData = getHandoverData();

  let end = false;
  let config: Config;
  let audio: HTMLAudioElement;

  onMount(() => {
    tick().then(() =>
      fetch("/config.yml")
        .then((res) => res.text())
        .then(parse)
        .then((data) => (config = data)),
    );

    window.addEventListener("message", (ev) => {
      if (ev.data.eventName === "end" && !end) {
        end = true;
        document.body.classList.add("transparent");
      }
    });
  });

  const onOutroEnd = () => {
    const url = new URL("/ended", location.href);
    url.protocol = "https:";

    return fetch(url.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({}),
    }).catch(console.error);
  };

  $: if (audio) audio.volume = config.audio.volume;
</script>

{#if config?.audio.source}
  <audio bind:this="{audio}" autoplay loop src="{config.audio.source}"></audio>
{/if}

{#if config && !end}
  <div class="background fullscreen" in:fade="{{ delay: 1000, duration: 1000 }}" out:fade="{{ duration: 1000 }}">
    <SlideShow config="{config.background}" imgClass="background" />
  </div>
{/if}

{#if config && !end}
  <div in:fade="{{ duration: 1000 }}" out:fade="{{ delay: 2500, duration: 1000 }}" on:outroend="{onOutroEnd}">
    <Panel config="{config}" gameName="{handoverData.serverName}" />
  </div>
{/if}

{#if handoverData.icon}
  <div class="server-icon">
    <Image src="data:base64,image/png;{handoverData.icon}" />
  </div>
{/if}

<style>
  .background {
    z-index: -10;
  }

  .server-icon {
    width: 96px;
    height: 96px;
    position: absolute;
    left: 1rem;
    bottom: 1rem;
  }
</style>
