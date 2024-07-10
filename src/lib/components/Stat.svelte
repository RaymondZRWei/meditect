<script lang="ts">
    export let title: string = "Placeholder Title"
    export let value: string = "Placeholder Value"
    export let symbol;
    export let datatip: string = ""
</script>

<div class="stat">
    <div class="stat-title">{title}</div>
    <div class="stat-value">
        {value}
    </div>

    <div class="stat-figure">
        <div
            class="tooltip tooltip-bottom"
            data-tip={datatip}
        >
            <div class="h-8 w-8 opacity-60">
                <svelte:component this={symbol} />
            </div>
        </div>
    </div>
</div>