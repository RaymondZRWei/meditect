<script lang="ts">
    export let title: string;
    export let value: number;
    export let symbol: any;
    export let tooltip: string;
</script>

<div class="bg-blue-500 w-full rounded-lg p-6 flex justify-between">
    <div class="flex flex-col">
        <div class="text-white">{title}</div>
        <div class="text-slate-500">
            {value}
        </div>
    </div>

    <div>
        <svelte:component this={symbol} class="size-8 opacity-60" />
    </div>
</div>
