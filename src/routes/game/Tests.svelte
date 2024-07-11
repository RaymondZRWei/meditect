<script lang="ts">
    import { createDialog, melt } from "@melt-ui/svelte";
    import { fade } from "svelte/transition";

    import type { GameData } from "$lib/types";
    import { tests } from "$lib/data/tests";

    import Fa6SolidPlus from "~icons/fa6-solid/plus";

    export let game: GameData;

    const {
        elements: {
            trigger,
            overlay,
            content,
            title,
            description,
            close,
            portalled,
        },
        states: { open },
    } = createDialog({
        forceVisible: true,
    });
</script>

<div class="h-full bg-purple-400 p-5">
    <div class="flex items-center justify-between">
        <div>
            <h2>Tests</h2>
            <p>You have no test results so far</p>
        </div>
        <button use:melt={$trigger} aria-label="New Test">
            <Fa6SolidPlus class="size-8" />
        </button>
    </div>
    <div class="flex flex-col gap-3">
        {#each game.tests as test}
            <div>
                {test.name}
            </div>
        {/each}
    </div>
</div>

{#if $open}
    <div use:melt={$portalled}>hi</div>
{/if}
