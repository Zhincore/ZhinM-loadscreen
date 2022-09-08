<script lang="ts">
  import { slide } from "svelte/transition";
  import type { Message } from "$lib/Messages";

  const logLimit = 32;

  let dones: string[] = [];
  let log: Message[] = [];
  let counts: Record<string, number> = {
    map: 0,
  };
  let mapLoads = 0;

  const _addLog = (msg: Message) => {
    log = [msg, ...log.slice(0, logLimit - 1)];
  };

  export async function addLog(msg: Message) {
    switch (msg.eventName) {
      case "startDataFileEntries":
        counts.map = msg.count;
        break;

      case "performMapLoadFunction":
        msg.idx = ++mapLoads;
        _addLog(msg);
        break;

      case "startInitFunctionOrder":
        counts = { ...counts, [msg.type]: msg.count };
        break;

      case "initFunctionInvoking":
      case "onDataFileEntry":
        _addLog(msg);
        break;

      case "initFunctionInvoked":
        dones = [msg.name, ...dones.slice(0, logLimit - 1)];
        break;
    }
  }
</script>

<ul>
  {#each log as line (line)}
    <li>
      {#if line.eventName == "onDataFileEntry"}
        <i>🚀</i> Loading <strong>{line.name}</strong>
      {:else if line.eventName == "initFunctionInvoking"}
        {#if dones.includes(line.name)}
          <i>✔️</i> Invoked <strong>{line.name}</strong>
          (<strong>{line.idx}</strong> / <strong>{counts[line.type] ?? 0}</strong>).
        {:else}
          <i>⏳</i> Invoking <strong>{line.name}</strong>
          (<strong>{line.idx}</strong> / <strong>{counts[line.type] ?? 0}</strong>)...
        {/if}
      {:else if line.eventName == "performMapLoadFunction"}
        <i>🗺️</i> Loaded <strong>{((line.idx / counts.map) * 100).toFixed(2)}</strong>
      {/if}
    </li>
  {/each}
</ul>

<style lang="scss">
  ul {
    list-style-type: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 0;
    margin: 0;
    margin-top: 1rem;

    mask-image: linear-gradient(to bottom, white 80%, transparent);

    li {
      animation: slideIn 0.2s both;

      i {
        font-style: normal;
        display: inline-block;
        width: 1.5rem;
      }
    }
  }

  strong {
    font-weight: normal;
  }
</style>
