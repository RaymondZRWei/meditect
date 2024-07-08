<script lang="ts">
    import { Canvas } from "@threlte/core";
    import Pill from "./Pill.svelte";
</script>

<style>
    .aspect-ratio-container {
        position: relative;
        width: 100%;
        padding-bottom: calc(100% / (16 / 9)); /* Adjust 16 / 9 to your desired aspect ratio */
    }

    .aspect-ratio-container > .content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>

<div class="aspect-ratio-container">
    <div class="content">
        <Canvas shadows>
            <Pill />
        </Canvas>
    </div>
</div>