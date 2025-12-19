"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

/**
 * ⚠️ COMPATIBILITY SHIM
 * Your installed version does NOT expose typed exports.
 * We resolve components dynamically to avoid TS failures.
 */
const PanelGroup =
  (ResizablePrimitive as any).PanelGroup ??
  (ResizablePrimitive as any).default ??
  ResizablePrimitive;

const Panel =
  (ResizablePrimitive as any).Panel ??
  ((props: any) => <div {...props} />);

const PanelResizeHandle =
  (ResizablePrimitive as any).PanelResizeHandle ??
  (ResizablePrimitive as any).ResizeHandle ??
  ((props: any) => <div {...props} />);

function ResizablePanelGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props}
    />
  );
}

function ResizablePanel(props: React.HTMLAttributes<HTMLDivElement>) {
  return <Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  withHandle?: boolean;
}) {
  return (
    <PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "bg-border relative flex w-px items-center justify-center " +
          "data-[panel-group-direction=vertical]:h-px " +
          "data-[panel-group-direction=vertical]:w-full",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
