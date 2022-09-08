<script lang="ts">
  export let src: string;
  let className: string = "";
  export { className as class };

  let image: HTMLImageElement;
  export let isLoaded = false;
  export let isError = false;

  const loaded = () => (isLoaded = true);
  const error = () => (isError = true);

  $: image && image.complete && loaded();
</script>

<img
  src="{src}"
  decoding="async"
  alt=""
  class="{className}"
  class:hide="{!isLoaded}"
  bind:this="{image}"
  on:load="{loaded}"
  on:error="{error}"
/>

<style>
  img {
    max-width: 100%;
    max-height: 100%;
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  .hide {
    opacity: 0;
  }
</style>
