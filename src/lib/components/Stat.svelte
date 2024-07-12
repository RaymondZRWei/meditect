<script lang="ts">
    import { createTooltip, melt } from "@melt-ui/svelte";
    import { fade } from "svelte/transition";

    const {
        elements: { trigger, content, arrow },
        states: { open },
    } = createTooltip({
        positioning: {
            placement: "right-end",
        },
        openDelay: 0,
        closeDelay: 0,
        closeOnPointerDown: false,
        forceVisible: true,
    });

    export let title: string;
    export let value: number;
    export let unit: string;
    export let tooltip: string;
</script>

<div
    class="bg-slate-100 w-full h-full rounded-xl p-6 outline-none flex items-center justify-between"
>
    <div class="flex flex-col gap-3.5 cursor-pointer" use:melt={$trigger}>
        <div class="text-black font-medium mb-0.5">{title}</div>

        <div class="flex items-end gap-1.5 text-slate-600">
            <span class="text-5xl font-extrabold">{value}</span>
            <span class="text-base">{unit}</span>
        </div>
    </div>
    <slot />
</div>

{#if $open}
    <div
        use:melt={$content}
        transition:fade={{ duration: 100 }}
        class="z-10 rounded-lg bg-slate-600 shadow"
    >
        <div use:melt={$arrow} />
        <p class="px-4 py-1 text-white">{tooltip}</p>
    </div>
{/if}
