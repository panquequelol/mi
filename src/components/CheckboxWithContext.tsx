import { memo, useCallback } from "react";
import { motion } from "motion/react";
import { ContextMenuTrigger } from "./ContextMenu";

interface CheckboxWithContextProps {
  lineId: string;
  state: "TODO" | "DONE";
  onToggle: (lineId: string) => void;
  onDelete: (lineId: string) => void;
  t: (key: string) => string;
}

export const CheckboxWithContext = memo(({ lineId, state, onToggle, onDelete, t }: CheckboxWithContextProps) => {
  const handleToggle = useCallback(() => {
    onToggle(lineId);
  }, [lineId, onToggle]);

  const handleDelete = useCallback(() => {
    onDelete(lineId);
  }, [lineId, onDelete]);

  return (
    <ContextMenuTrigger lineId={lineId} onDelete={handleDelete} t={t}>
      <motion.div
        className="cursor-pointer select-none min-w-[calc(var(--base-font-size)*1.25)] inline-flex items-center justify-center"
        style={{ color: "var(--color-text-light)" }}
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="block"
          style={{ width: "calc(var(--base-font-size)*1.25)", height: "calc(var(--base-font-size)*1.25)" }}
        >
          <motion.rect
            x="2"
            y="2"
            width="16"
            height="16"
            rx="3"
            stroke="var(--color-text-done)"
            strokeWidth="var(--stroke-width)"
            initial={false}
            transition={{ duration: 0.3 }}
          />
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: state === "DONE" ? 1 : 0,
              opacity: state === "DONE" ? 1 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 12,
              delay: state === "DONE" ? 0.05 : 0,
            }}
            style={{ transformOrigin: "10px 10px" }}
          >
            <path
              d="M6 10 L9 13 L14 7"
              stroke="var(--color-text-done)"
              strokeWidth="var(--stroke-width)"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </motion.g>
        </svg>
      </motion.div>
    </ContextMenuTrigger>
  );
});
