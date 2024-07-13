<script lang="ts">
    import { page } from "$app/stores";
</script>

<div class="h-full absolute inset-0 flex items-center justify-center">
    <div>
        <h1
            class="mb-2 text-8xl font-bold md:text-9xl lg:text-[12rem] text-primary lg:pr-2.5"
        >
            {$page.status}
        </h1>
        {#if $page.status === 404}
            <p class="mb-2 text-xl font-bold md:text-3xl lg:text-4xl">
                It looks like you're lost…
            </p>
            <p class="mb-8 text-slate-500 text-sm md:text-lg">
                The page you are looking for does not exist
            </p>
        {:else}
            <p class="mb-8 text-xl font-bold md:text-3xl lg:text-4xl">
                {$page.error?.message}…
            </p>
        {/if}
        <div class="flex justify-center">
            <a
                href="/"
                class="bg-primary px-6 py-4 rounded-lg text-white hover:bg-primary-dark transition-colors"
            >
                Back to Home Page
            </a>
        </div>
    </div>
</div>
