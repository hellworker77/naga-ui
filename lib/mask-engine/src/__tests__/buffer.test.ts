import { describe, it, expect } from "vitest"
import {parseMask} from "../_parser";
import {createBuffer, insert} from "../_buffer";

describe("buffer", () => {

    it("inserts respecting tokens", () => {
        const tokens = parseMask("99-99")
        const state = createBuffer(tokens)

        insert(state, "1234")

        const raw = state.slots
            .filter(s => s.char && s.token.type !== "literal")
            .map(s => s.char)
            .join("")

        expect(raw).toBe("1234")
    })

})