<script lang="ts">
    import "./global.css";

    import { Toaster } from "svelte-french-toast";

    import Header from "$lib/components/Header.svelte";
</script>

<div class="min-h-screen grid" style="grid-template-rows: 1fr">
    <Header />

    <main class="h-full w-full">
        <slot />
    </main>
</div>

<Toaster />
