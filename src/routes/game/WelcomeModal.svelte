<script lang="ts">
    import { createDialog, melt } from "@melt-ui/svelte";
    import { fade } from "svelte/transition";

    const {
        elements: { overlay, content, title, description, close, portalled },
        states: { open },
    } = createDialog({
        forceVisible: true,
    });
</script>

{#if $open}
    <div use:melt={$portalled}>
        <div
            use:melt={$overlay}
            class="fixed inset-0 z-50 bg-black/50"
            transition:fade={{ duration: 150 }}
        />
        <div
            class="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw]
            max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white
            p-6 shadow-lg"
            transition:fade={{
                duration: 150,
            }}
            use:melt={$content}
        >
            <h2 use:melt={$title} class="m-0 text-lg font-medium text-black">
                Edit profile
            </h2>
            <p
                use:melt={$description}
                class="mb-5 mt-2 leading-normal text-zinc-600"
            >
                Make changes to your profile here. Click save when you're done.
            </p>

            <button use:melt={$close} class="bg-fuchsia-400">Cancel</button>
        </div>
    </div>
{/if}
