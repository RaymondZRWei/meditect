<script lang="ts">
    import { Canvas } from "@threlte/core";
    import Pill from "./Pill.svelte";
</script>

<div class="relative w-full" style="padding-bottom: calc(100% / (16 / 9)); width: 100%;">
    <div class="absolute top-0 left-0 w-full h-full">
        <Canvas shadows>
            <Pill />
        </Canvas>
    </div>
</div>
