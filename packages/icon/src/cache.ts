import {IconComponent} from "./types";

const cache = new Map<string, IconComponent>();

export function getCachedIcon(name: string) {
    return cache.get(name);
}

export function setCachedIcon(name: string, icon: IconComponent) {
    cache.set(name, icon);
}