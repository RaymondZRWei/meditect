<script lang="ts">
    export let title: string;
    export let value: number;
    export let tooltip: string;
</script>

<div
    class="bg-slate-100 w-full h-full rounded-lg p-5 flex flex-col justify-between"
>
    <div class="text-black font-medium">{title}</div>

    <div class="flex items-end gap-1 text-slate-600">
        <span class="text-5xl font-extrabold">
            {value}
        </span>
        <span class="text-base">minutes</span>
    </div>
</div>
