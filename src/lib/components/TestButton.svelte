<script lang="ts">
    import SemicircleGauge from "$lib/components/SemicircleGauge.svelte";
    import type {
        GameData,
        Test,
        TestableSymptoms,
        TestResult,
    } from "$lib/types";

    export let test: Test;
    export let game: GameData;

    const findLatestSymptomValue = (
        symptom: TestableSymptoms,
        game: GameData,
    ): number | null => {
        for (let i = game.testResults.length - 1; i >= 0; i--) {
            let result = game.testResults[i].results[symptom];
            if (result) {
                return result;
            }
        }

        return null;
    };

    const adminsterTest = () => {
        let results: TestResult["results"] = {};

        results[test.queriedSymptom] = game[test.queriedSymptom];

        game.testResults = [
            ...game.testResults,
            {
                testName: test.name,
                duration: test.duration,
                results,
                timeAdministered: game.elapsedTime,
            },
        ];

        game.elapsedTime += test.duration;
    };
</script>

<div
    class="bg-slate-200 rounded-xl px-5 py-2 flex items-center justify-between"
>
    <div class="flex items-center gap-4">
        <div>
            <SemicircleGauge
                value={findLatestSymptomValue(test.queriedSymptom, game)}
                maxValue={test.maxValue}
            />
        </div>

        <div class="flex flex-col">
            <div class="font-bold">{test.name}</div>
            <div class="font-extralight text-sm text-slate-600">
                {test.unit}
            </div>
        </div>
    </div>

    <div>
        <button
            class="group border-2 border-zinc-600 rounded-xl text-xs font-light w-32 h-10 tracking-tighter relative
            active:border-slate-500"
            data-hover="1 minute"
            on:click={adminsterTest}
        >
            <div
                class="invisible group-hover:visible absolute inset-0 flex items-center justify-center"
            >
                1 min
            </div>
            <div
                class="visible group-hover:invisible absolute inset-0 flex items-center justify-center"
            >
                {test.actionMessage}
            </div>
        </button>
    </div>
</div>
