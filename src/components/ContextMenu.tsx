import { ContextMenu } from "@base-ui/react/context-menu";
import { useCallback } from "react";

interface ContextMenuTriggerProps {
  lineId: string;
  onDelete: (lineId: string) => void;
  t: (key: string) => string;
  children: React.ReactNode;
}

export const ContextMenuTrigger = ({ lineId, onDelete, t, children }: ContextMenuTriggerProps) => {
  const handleClick = useCallback(() => {
    onDelete(lineId);
  }, [lineId, onDelete]);

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Positioner sideOffset={4}>
          <ContextMenu.Popup
            style={{
              backgroundColor: "var(--color-bg)",
              border: "var(--stroke-width) solid var(--color-archive-border)",
              borderRadius: "6px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
              overflow: "hidden",
              minWidth: "120px",
              padding: "4px 0",
            }}
          >
            <ContextMenu.Item
              onClick={handleClick}
              style={{
                color: "var(--color-text)",
                fontSize: "var(--base-font-size)",
                fontFamily: "inherit",
                textTransform: "lowercase",
                padding: "8px 16px",
                cursor: "pointer",
                listStyle: "none",
                outline: "none",
                border: "none",
                backgroundColor: "transparent",
                width: "100%",
                textAlign: "left",
              }}
            >
              {t("delete")}
            </ContextMenu.Item>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};
