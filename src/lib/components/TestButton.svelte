<script lang="ts">
    import SemicircleGauge from "$lib/components/SemicircleGauge.svelte";

    export let maxValue: number = 100;
    export let value: number | null = null;

    export let title: string = "Oxygen Saturation";
    export let unit: string = "% SpO2";
    export let actionMessage: string = "Use Pulse Oximetry";
    export let onclick: () => void;
</script>

<div class="bg-slate-200 rounded-xl p-2 flex items-center">
    <SemicircleGauge {value} {maxValue} width={100} height={80} />

    <div class="flex flex-col gap-1 min-w-20 px-4 flex-1">
        <div class="font-bold text-sm">{title}</div>
        <div class="font-extralight text-sm text-slate-400">{unit}</div>
    </div>

    <div>
        <button
            class="group border-2 border-zinc-600 rounded-xl text-xs font-light w-28 h-10 tracking-tighter relative
            active:border-slate-500"
            data-hover="1 minute"
            on:click={onclick}
        >
            <div
                class="invisible group-hover:visible absolute inset-0 flex items-center justify-center"
            >
                1 min
            </div>
            <div
                class="visible group-hover:invisible absolute inset-0 flex items-center justify-center"
            >
                {actionMessage}
            </div>
        </button>
    </div>
</div>
