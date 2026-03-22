import { describe, it, expect } from "vitest"
import {createMaskEngine} from "../_engine";

describe("mask engine", () => {

    it("inserts digits into mask", () => {
        const engine = createMaskEngine("99/99")

        let res = engine.process("1", "")
        expect(res.value).toBe("1")

        res = engine.process("12", "1")
        expect(res.value).toBe("12")

        res = engine.process("123", "12")
        expect(res.value).toBe("12/3")
    })

    it("skips literals automatically", () => {
        const engine = createMaskEngine("99-99")

        let res = engine.process("123", "12")
        expect(res.value).toBe("12-3")
    })

    it("handles deletion", () => {
        const engine = createMaskEngine("99/99")

        let res = engine.process("1234", "")
        expect(res.value).toBe("12/34")

        res = engine.process("123", "12/34")
        expect(res.value).toBe("12/3")
    })

    it("handles paste", () => {
        const engine = createMaskEngine("99/99")

        const res = engine.process("1234", "")
        expect(res.value).toBe("12/34")
        expect(res.raw).toBe("1234")
    })

    it("keeps prefix when empty", () => {
        const engine = createMaskEngine({
            mask: "+7 (999)",
            prefixLength: 2
        })

        const res = engine.process("", "")
        expect(res.value).toBe("+7")
    })

    it("dynamic mask switches", () => {
        const engine = createMaskEngine({
            masks: ["+1 (999)", "+44 99"],
            dispatch(raw) {
                return raw.startsWith("44")
                    ? "+44 99"
                    : "+1 (999)"
            }
        })

        let res = engine.process("44", "")
        expect(res.value.startsWith("+44")).toBe(true)
    })

    it("preserves raw after remask", () => {
        const engine = createMaskEngine({
            masks: ["99-99", "999-999"],
            dispatch(raw) {
                return raw.length > 4 ? "999-999" : "99-99"
            }
        })

        let res = engine.process("1234", "")
        expect(res.raw).toBe("1234")

        res = engine.process("12345", res.value)
        expect(res.raw).toBe("12345")
    })

})