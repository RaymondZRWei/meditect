<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import { onMount } from "svelte";
    import SemicircleGauge from "$lib/components/SemicircleGauge.svelte";
    import Checklist from "$lib/components/Checklist.svelte";
    import Test from "./Test.svelte";

    const value1 = writable<number | null>(null);
    const value2 = writable<number | null>(null);
    const value3 = writable<number | null>(null);
    const value4 = writable<number | null>(null);

    function updateValue(event: Event, store: Writable<number | null>): void {
        const target = event.target as HTMLInputElement;
        store.set(Number(target.value));
    }

    onMount(() => {
        document.querySelectorAll(".buttons").forEach((button) => {
            const originalText = button.textContent;
            button.addEventListener("mouseover", function () {
                button.textContent = button.getAttribute("data-hover");
            });
            button.addEventListener("mouseout", function () {
                button.textContent = originalText;
            });
        });
    });
</script>

<div class="grid grid-cols-2">
    <div class="col-span-1 gap-4 flex flex-col py-4 overflow-auto">
        <Test
            title="Respiratory Rate"
            unit="Breaths per Min"
            actionMessage="Count"
            maxValue={30}
        />
        <Test
            title="Oxygen Saturation"
            unit="% Sp02"
            actionMessage="Use Pulse Oximetry"
            maxValue={100}
        />
        <Test
            title="Blood Glucose Level"
            unit="mg / dL"
            actionMessage="Use Glucometer"
            maxValue={100}
        />
        <Test
            title="Pain Level"
            unit="Scale 0-100"
            actionMessage="Ask Patient"
            maxValue={100}
        />
    </div>
    <div class="col-span-1">
        <Checklist />
    </div>
</div>
