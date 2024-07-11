<script lang="ts">
    export let title: string;
    export let value: number;
    export let symbol: any;
    export let tooltip: string;
</script>

<div class="bg-slate-100 w-full h-full rounded-lg p-6 flex justify-between">
    <div class="flex flex-col justify-between">
        <div class="text-black font-medium">{title}</div>
        <div class="flex items-end gap-1.5 text-slate-600">
            <span class="text-4xl font-extrabold">
                {value}
            </span>
            <span class="text-base">minutes</span>
        </div>
    </div>

    <svelte:component this={symbol} class="size-8 opacity-60" />
</div>
