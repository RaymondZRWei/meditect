<script lang="ts">
    export let title: string;
    export let value: number;
    export let unit: string;
    export let tooltip: string;
</script>

<div
    class="bg-slate-100 w-full h-full rounded-xl p-8 outline-none flex items-center justify-between"
>
    <div class="flex flex-col gap-3.5">
        <div class="text-black font-medium mb-0.5">{title}</div>

        <div class="flex items-end gap-1.5 text-slate-600">
            <span class="text-5xl font-extrabold">{value}</span>
            <span class="text-base">{unit}</span>
        </div>
    </div>
    <slot />
</div>
