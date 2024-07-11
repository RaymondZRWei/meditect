<script lang="ts">
    export let value: number | null;
    export let defaultValue: number = 25;
    export let maxValue: number = 100;
    export let width: number = 200;
    export let height: number = 100;
    export let strokeWidth: number = 8;

    function describeArc(
        x: number,
        y: number,
        radius: number,
        startAngle: number,
        endAngle: number,
    ): string {
        const start = polarToCartesian(x, y, radius, endAngle);
        const end = polarToCartesian(x, y, radius, startAngle);

        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        const d = [
            "M",
            start.x,
            start.y,
            "A",
            radius,
            radius,
            0,
            largeArcFlag,
            0,
            end.x,
            end.y,
        ].join(" ");

        return d;
    }

    function polarToCartesian(
        centerX: number,
        centerY: number,
        radius: number,
        angleInDegrees: number,
    ): { x: number; y: number } {
        const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;

        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians),
        };
    }

    function getColor(value: number): string {
        const r = Math.min(255, Math.floor(255 * (value / maxValue)));
        const g = Math.min(
            255,
            Math.floor(255 * ((maxValue - value) / maxValue)),
        );
        return `rgb(${r},${g},0)`;
    }

    let svgPath: string;
    let color: string;

    $: updateValue(value);

    function updateValue(val: number | null) {
        if (!val) val = maxValue;

        const adjustedStartAngle = -25;
        const adjustedEndAngle = 205;
        const endAngle =
            adjustedStartAngle +
            ((val ?? defaultValue) / maxValue) *
                (adjustedEndAngle - adjustedStartAngle);
        svgPath = describeArc(
            width / 2,
            height / 2,
            Math.min(width, height) / 2 - 10,
            adjustedStartAngle,
            endAngle,
        );
        color = getColor(val ?? defaultValue);
    }

    let fontSize = Math.min(width, height) / 5;
</script>

<svg {width} {height} viewBox={`0 0 ${width} ${height}`}>
    <path d={svgPath} stroke={color} stroke-width={strokeWidth} fill="none" />
    <text
        x="50%"
        y="45%"
        text-anchor="middle"
        alignment-baseline="middle"
        font-size={fontSize}
        fill="#000"
    >
        {#if value}
            {value}
        {:else}
            ?
        {/if}
    </text>
</svg>

<style>
    svg {
        display: block;
        margin: auto;
    }
    text {
        font-family: Arial, sans-serif;
    }
</style>
