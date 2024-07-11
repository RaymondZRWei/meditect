<script lang="ts">
    import type { GameData } from "$lib/types";

    export let game: GameData;
</script>

<div class="h-full grid grid-cols-5 gap-6">
    <div class="col-span-3 bg-slate-100 p-6 rounded-xl">the graphs go here</div>
    <div class="bg-slate-600 rounded-xl p-8 col-span-2">
        <h2 class="text-white font-bold text-3xl mb-5">Observations</h2>
        <div class="flex flex-col gap-3 text-slate-200">
            {#each game.qualitativeSymptoms as symptom}
                <div>{symptom}</div>
            {/each}
        </div>
    </div>
</div>
