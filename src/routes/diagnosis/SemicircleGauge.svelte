<script lang="ts">
  import { writable, type Writable, derived } from "svelte/store";

  export let value: Writable<number | null> = writable(null);
  export let defaultValue: number = 25; // Default value for the gauge bar
  export let maxValue: number = 100; // Default max value
  export let width: number = 200; // Default width
  export let height: number = 100; // Default height
  export let strokeWidth: number = 8; // Default stroke width

  // Function to calculate the end point of the arc
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

  // Function to convert polar coordinates to Cartesian
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

  // Function to interpolate color between green and red based on value
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

  // Derived store to display '?' if value is null or undefined
  const displayValue = derived(value, ($value) =>
      $value == null ? "?" : $value,
  );

  $: value.subscribe((val) => {
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
  });

  // Calculate dynamic font size
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
      {$displayValue}
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