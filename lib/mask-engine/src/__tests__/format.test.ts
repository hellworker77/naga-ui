import { describe, it, expect } from "vitest"
import {parseMask} from "../_parser";
import {autoDetectPrefix, toValue} from "../_format";
import {createBuffer} from "../_buffer";

describe("format", () => {

    it("autoDetectPrefix works", () => {
        const tokens = parseMask("+7 (999)")
        const prefix = autoDetectPrefix(tokens)

        expect(prefix).toBe(2) // "+7"
    })

    it("returns prefix when empty", () => {
        const tokens = parseMask("+7 (999)")
        const buffer = createBuffer(tokens)

        const value = toValue(buffer.slots, 2)
        expect(value).toBe("+7")
    })

})