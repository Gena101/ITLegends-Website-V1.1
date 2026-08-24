import type { CollectedData } from './nodeTypes';

/**
 * Merges an option's preset field values into already-collected data.
 * Presets seed a field; they never block a later node from overwriting it
 * with the visitor's own typed or clicked answer - the reducer just applies
 * actions in order, so whichever happens second wins naturally.
 */
export function applyPresets(
  collectedData: CollectedData,
  presets: CollectedData | undefined,
): CollectedData {
  if (!presets || Object.keys(presets).length === 0) return collectedData;
  return { ...collectedData, ...presets };
}