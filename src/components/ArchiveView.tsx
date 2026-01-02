import { useAtom, useSetAtom } from "jotai";
import { archiveAtom, restoreSectionAtom, deleteArchiveAtom } from "../atoms/archive";
import { formatArchiveTimestamp } from "../utils/timestamp";
import { motion, AnimatePresence } from "motion/react";

export const ArchiveView = () => {
  const [archive] = useAtom(archiveAtom);
  const restore = useSetAtom(restoreSectionAtom);
  const deleteArchive = useSetAtom(deleteArchiveAtom);

  return (
    <div className="archive-view">
      <p className="archive-notice">archives are deleted after 7 days</p>
      <AnimatePresence mode="popLayout">
        {archive.length === 0 ? (
          <motion.p
            className="archive-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            no archived sections yet
          </motion.p>
        ) : (
          <div className="archive-sections">
            {archive.map((section, index) => (
              <motion.div
                key={section.id}
                className="archive-section"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="archive-header">
                  <span className="archive-date">
                    {formatArchiveTimestamp(section.archivedAt)}
                  </span>
                  <div className="archive-actions">
                    <button
                      className="archive-btn restore"
                      onClick={() => restore(section.id)}
                    >
                      restore
                    </button>
                    <button
                      className="archive-btn delete"
                      onClick={() => deleteArchive(section.id)}
                    >
                      delete
                    </button>
                  </div>
                </div>
                <div className="archive-items">
                  {section.lines.map((line) => (
                    <div key={line.id} className="archive-item">
                      <span className="archive-item-check">✓</span>
                      <span className="archive-item-text">{line.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
