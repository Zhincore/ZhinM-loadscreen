<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import type { ImageConfig } from "$lib/Config";
  import { shuffle } from "$lib/util";
  import Image from "./Image.svelte";

  export let config: ImageConfig;
  export let duration = 1000;
  export let imgClass = "";

  let playlist: string[] = [];
  let slides: (string | false | null)[] = [null, false];
  let current = 1;

  onMount(() => {
    let timeout: CitizenTimer;

    const run = () => {
      if (!playlist.length) playlist = shuffle([...config.sources]);

      const newSrc = playlist.shift();
      if (!newSrc) return;

      const preload = new window.Image();
      preload.onload = () => {
        if (current) {
          current = 0;
          slides = [newSrc, slides[1]];
        } else {
          current = 1;
          slides = [slides[0], newSrc];
        }

        if (config.sources.length > 1) {
          timeout = setTimeout(run, config.duration - Math.random() * config.durationRandom * config.duration);
        }
      };
      preload.src = newSrc;
    };
    run();

    return () => clearTimeout(timeout);
  });
</script>

<div class="slideshow">
  {#each slides as src, i (i)}
    <div
      class="fullscreen slide"
      style="animation-duration: {duration}ms; transition-duration: {duration}ms;"
      class:current="{src && i == current}"
    >
      {#if src}
        <Image src="{src}" class="fill block {imgClass}" />
      {/if}
    </div>
  {/each}
</div>

<style lang="scss">
  .slideshow {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .slide {
    opacity: 0;
    transition: opacity ease;

    &.current {
      opacity: 1;
    }
  }
</style>
