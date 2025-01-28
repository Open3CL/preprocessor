/**
 * Retrieve a number describing a thickness from the description
 * @param description string in which to get the number
 * @returns {number} if found, 0 otherwise
 */
export function getThicknessFromDescription(description) {
  if (!description) {
    return 0;
  }

  const matching = description.match(/(\d+) cm/);
  return matching && matching.length > 1 ? Number.parseFloat(matching[1]) : 0;
}
