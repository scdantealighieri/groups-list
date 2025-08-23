import { useEffect, useRef } from 'react';

export const useFontSize = (
    maxWidth = 230,
    minFontSize = 40
) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        if (element.offsetWidth > maxWidth) {
            const computedStyle = window.getComputedStyle(element);
            let fontSize = parseFloat(computedStyle.fontSize);

            while (element.offsetWidth > maxWidth && fontSize > minFontSize) {
                fontSize--;
                element.style.fontSize = `${fontSize}px`;
            }
        }
    }, [maxWidth, minFontSize]);

    return elementRef;
};