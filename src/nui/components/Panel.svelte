<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import type { Message, InitFunctionType } from "$lib/Messages";
  import type { Config } from "$lib/Config";
  import { emulator } from "$lib/emulator";
  import SlideShow from "./SlideShow.svelte";
  import Log from "./Log.svelte";

  const initFunctionMap: Record<InitFunctionType, string> = {
    INIT_UNKNOWN: "",
    INIT_CORE: "CORE",
    INIT_BEFORE_MAP_LOADED: "BEFORE MAP",
    INIT_AFTER_MAP_LOADED: "AFTER MAP",
    INIT_SESSION: "SESSION",
  };

  export let config: Config;
  export let gameName = "GTA Online";

  let initFunction: InitFunctionType = "INIT_UNKNOWN";
  let progress = 0;
  let statusMessage: string;
  let log: Log;

  $: initPhase = initFunctionMap[initFunction];

  onMount(() => {
    window.addEventListener("message", (ev) => {
      const message: Message = ev.data;

      log?.addLog(message);

      switch (message.eventName) {
        case "startInitFunction":
          initFunction = message.type;
          break;
        case "loadProgress":
          progress = message.loadFraction;
          break;
        case "onLogLine":
          statusMessage = message.message;
          break;
      }
    });
  });

  $: if (import.meta.env.DEV && log) emulator(log.addLog);
</script>

<div class="fullscreen">
  <div class="content">
    <div class="text">
      <h1>{gameName}</h1>
      <h2>
        {#if statusMessage}{statusMessage}{:else}
          Loading <span class="number">{progress.toFixed(2)}%</span>
          {#if initPhase}&ndash; {initPhase}{/if}
        {/if}
      </h2>

      <div class="description">
        <Log bind:this="{log}" />
      </div>
    </div>

    <div class="image" transition:fade="{{ delay: 500, duration: 1000 }}">
      <SlideShow config="{config.image}" imgClass="right" />
    </div>
  </div>
</div>

<style lang="scss">
  .content {
    height: 65%;
    width: 65%;
    overflow: hidden;
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    backdrop-filter: blur(0.2rem);

    .image {
      height: 100%;
      width: 48rem;
    }

    .text {
      padding: 2rem;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;

      h1 {
        font-size: 4rem;
        font-weight: 400;
        margin: 0;
      }

      h2 {
        font-size: 2rem;
        font-weight: 300;
        margin: 0;
      }

      .description {
        font-size: 1.1rem;
        line-height: 1.75;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }
  }

  .number {
    font-family: monospace;
    font-weight: 300;
  }
</style>
