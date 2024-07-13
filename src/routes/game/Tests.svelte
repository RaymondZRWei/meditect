<script lang="ts">
    import type { GameData } from "$lib/types";
    import { tests } from "$lib/data/tests";
    import TestButton from "$lib/components/TestButton.svelte";
    import Checklist from "$lib/components/Checklist.svelte";

    export let game: GameData;
</script>

<div class="bg-slate-100 p-10 rounded-xl h-full">
    <h2 class="text-3xl font-bold mb-6">Tests</h2>

    <div class="flex gap-4">
        <div class="grow gap-4 flex flex-col">
            {#each tests as test}
                <TestButton bind:game {test} />
            {/each}
        </div>
        <div class="grow">
            <Checklist />
        </div>
    </div>
</div>
