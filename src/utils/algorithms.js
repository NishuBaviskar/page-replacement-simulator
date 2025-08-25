// This file contains the core logic for the page replacement algorithms.

/**
 * FIFO (First-In, First-Out) Algorithm
 * @param {number} frameCount - The number of available frames.
 * @param {number[]} refString - The sequence of page requests.
 * @returns {object} - The simulation result.
 */
export const fifo = (frameCount, refString) => {
    let frames = Array(frameCount).fill(null);
    let pointer = 0;
    let faults = 0;
    let steps = [];

    refString.forEach(page => {
        let isFault = !frames.includes(page);
        let replacedPage = null;

        if (isFault) {
            faults++;
            replacedPage = frames[pointer];
            frames[pointer] = page;
            pointer = (pointer + 1) % frameCount;
        }

        steps.push({
            ref: page,
            isFault,
            replacedPage,
            frameSnapshot: [...frames],
        });
    });

    const hits = refString.length - faults;
    const hitRatio = hits / refString.length;

    return { name: 'FIFO', steps, faults, hits, hitRatio };
};

/**
 * LRU (Least Recently Used) Algorithm
 * @param {number} frameCount - The number of available frames.
 * @param {number[]} refString - The sequence of page requests.
 * @returns {object} - The simulation result.
 */
export const lru = (frameCount, refString) => {
    let frames = Array(frameCount).fill(null);
    let usageMap = new Map(); // Tracks last used index for each page
    let faults = 0;
    let steps = [];

    refString.forEach((page, index) => {
        let isFault = !frames.includes(page);
        let replacedPage = null;

        if (isFault) {
            faults++;
            if (frames.includes(null)) { // There's an empty frame
                const emptyIndex = frames.indexOf(null);
                frames[emptyIndex] = page;
            } else { // Eviction is needed
                let lruPage = -1;
                let earliestTime = Infinity;
                frames.forEach(p => {
                    if (usageMap.get(p) < earliestTime) {
                        earliestTime = usageMap.get(p);
                        lruPage = p;
                    }
                });
                replacedPage = lruPage;
                const lruIndex = frames.indexOf(lruPage);
                frames[lruIndex] = page;
            }
        }

        usageMap.set(page, index); // Update usage time for the current page

        steps.push({
            ref: page,
            isFault,
            replacedPage,
            frameSnapshot: [...frames],
        });
    });

    const hits = refString.length - faults;
    const hitRatio = hits / refString.length;

    return { name: 'LRU', steps, faults, hits, hitRatio };
};

/**
 * Optimal (Belady's) Algorithm
 * @param {number} frameCount - The number of available frames.
 * @param {number[]} refString - The sequence of page requests.
 * @returns {object} - The simulation result.
 */
export const optimal = (frameCount, refString) => {
    let frames = Array(frameCount).fill(null);
    let faults = 0;
    let steps = [];

    refString.forEach((page, index) => {
        let isFault = !frames.includes(page);
        let replacedPage = null;

        if (isFault) {
            faults++;
            if (frames.includes(null)) { // There's an empty frame
                const emptyIndex = frames.indexOf(null);
                frames[emptyIndex] = page;
            } else { // Eviction is needed
                let futureUses = new Map();
                frames.forEach(p => {
                    const nextUse = refString.slice(index + 1).indexOf(p);
                    futureUses.set(p, nextUse === -1 ? Infinity : nextUse);
                });

                let pageToReplace = -1;
                let farthestUse = -1;
                for (let [p, useIndex] of futureUses.entries()) {
                    if (useIndex > farthestUse) {
                        farthestUse = useIndex;
                        pageToReplace = p;
                    }
                }

                replacedPage = pageToReplace;
                const replaceIndex = frames.indexOf(pageToReplace);
                frames[replaceIndex] = page;
            }
        }

        steps.push({
            ref: page,
            isFault,
            replacedPage,
            frameSnapshot: [...frames],
        });
    });

    const hits = refString.length - faults;
    const hitRatio = hits / refString.length;

    return { name: 'Optimal', steps, faults, hits, hitRatio };
};

/**
 * Detects Belady's Anomaly for FIFO
 * @param {number} maxFrames - Max frames to test up to.
 * @param {number[]} refString - The sequence of page requests.
 * @returns {object|null} - An object with anomaly details if found, else null.
 */
export const detectBeladyAnomaly = (maxFrames, refString) => {
    if (refString.length < 3) return null;
    let lastFaults = -1;

    for (let i = 1; i <= maxFrames; i++) {
        const { faults } = fifo(i, refString);
        if (lastFaults !== -1 && faults > lastFaults) {
            return {
                anomalyFrames: i,
                previousFrames: i - 1,
                anomalyFaults: faults,
                previousFaults: lastFaults,
            };
        }
        lastFaults = faults;
    }
    return null;
};