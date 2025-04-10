import { useEffect, useRef } from 'react';

export const useShortNameSize = (
    mediumThreshold = 220,
    largeThreshold = 450,
    mediumClass: string,
    smallClass: string
) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const width = element.offsetWidth;

        if (width > mediumThreshold && width < largeThreshold) {
            element.classList.add(mediumClass);
        } else if (width >= largeThreshold) {
            element.classList.add(smallClass);
        }
    }, [mediumThreshold, largeThreshold, mediumClass, smallClass]);

    return elementRef;
};