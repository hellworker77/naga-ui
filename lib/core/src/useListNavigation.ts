export function useListNavigation(
    length: number,
    index: number,
    setIndex: (index: number) => void,
) {
    return function onKeyDown(e: React.KeyboardEvent) {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setIndex(Math.min(index + 1, length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setIndex(Math.max(index - 1, 0));
                break;
        }
    }
}