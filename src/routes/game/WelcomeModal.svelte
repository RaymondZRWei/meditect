<script lang="ts">
    import userData from "$lib/store/userData";
    import { createDialog, melt } from "@melt-ui/svelte";
    import { fade } from "svelte/transition";

    const {
        elements: { overlay, content, title, description, portalled },
    } = createDialog({
        forceVisible: true,
    });

    const createNewUser = () => {
        userData.set({
            games: [],
        });
    };
</script>

{#if $userData === null}
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
            <h2 use:melt={$title} class="mb-3 text-3xl font-bold text-black">
                Welcome to Med Ed
            </h2>
            <p
                use:melt={$description}
                class="mb-5 mt-2 leading-normal text-slate-600"
            >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Pariatur molestiae quo quod expedita magnam animi quidem fuga.
                Beatae, ea in.
            </p>

            <button
                on:click={createNewUser}
                class="bg-primary hover:bg-primary-dark transition-colors px-6 py-3 outline-none rounded-lg text-white"
            >
                Go to Dashboard
            </button>
        </div>
    </div>
{/if}
