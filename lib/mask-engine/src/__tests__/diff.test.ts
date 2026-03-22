import { describe, it, expect } from "vitest"
import {diff} from "../_diff";

describe("diff", () => {

    it("detects insert", () => {
        const d = diff("12", "123")

        expect(d).toEqual({
            start: 2,
            removed: "",
            inserted: "3"
        })
    })

    it("detects delete", () => {
        const d = diff("123", "12")

        expect(d.removed).toBe("3")
    })

    it("detects replace", () => {
        const d = diff("123", "1a3")

        expect(d).toEqual({
            start: 1,
            removed: "2",
            inserted: "a"
        })
    })

})