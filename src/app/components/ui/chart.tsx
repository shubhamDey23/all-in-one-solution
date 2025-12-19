"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "./utils";

/* =========================
   Theme handling
========================= */
const THEMES = { light: "", dark: ".dark" } as const;

/* =========================
   Types
========================= */
export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
    theme?: Record<keyof typeof THEMES, string>;
  };
};

type ChartContextProps = {
  config: ChartConfig;
};

type TooltipItem = {
  name?: string;
  value?: number;
  color?: string;
  dataKey?: string;
};

type LegendItem = {
  value?: string;
  color?: string;
  dataKey?: string;
};

/* =========================
   Context
========================= */
const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within ChartContainer");
  }
  return context;
}

/* =========================
   Chart Container
========================= */
function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

/* =========================
   Chart Style
========================= */
function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const entries = Object.entries(config);

  if (!entries.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, selector]) => `
${selector} [data-chart="${id}"] {
${entries
  .map(([key, item]) => {
    const color = item.theme?.[theme as keyof typeof item.theme] ?? item.color;
    return color ? `--color-${key}: ${color};` : "";
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
}

/* =========================
   Tooltip
========================= */
const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
  active,
  payload,
  label,
  className,
}: {
  active?: boolean;
  payload?: TooltipItem[];
  label?: React.ReactNode;
  className?: string;
}) {
  const { config } = useChart();

  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      className={cn(
        "rounded-lg border bg-background px-3 py-2 text-xs shadow-md",
        className
      )}
    >
      {label && (
        <div className="mb-1 font-medium text-foreground">{label}</div>
      )}

      <div className="space-y-1">
        {payload.map((item, index) => {
          const key = item.dataKey || item.name || `item-${index}`;
          const itemConfig = config[key];

          return (
            <div
              key={key}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">
                  {itemConfig?.label || item.name}
                </span>
              </div>
              <span className="font-mono font-medium text-foreground">
                {typeof item.value === "number"
                  ? item.value.toLocaleString()
                  : item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================
   Legend
========================= */
const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
  payload,
  className,
}: {
  payload?: LegendItem[];
  className?: string;
}) {
  const { config } = useChart();

  if (!payload || payload.length === 0) return null;

  return (
    <div className={cn("flex justify-center gap-4 pt-3", className)}>
      {payload.map((item, index) => {
        const key = item.dataKey || item.value || `legend-${index}`;
        const itemConfig = config[key];

        return (
          <div
            key={key}
            className="flex items-center gap-1.5 text-xs"
          >
            <span
              className="h-2 w-2 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            {itemConfig?.label || item.value}
          </div>
        );
      })}
    </div>
  );
}

/* =========================
   Exports
========================= */
export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
