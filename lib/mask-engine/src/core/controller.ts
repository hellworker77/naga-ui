import {MaskEngine, MaskState} from "../types/engine";
import {Mapper} from "./mappers/abstract";

export
class MaskController<T extends Mapper> {
    declare _engine: MaskEngine;
    declare _mapper: Mapper;

    constructor(engine: MaskEngine, constructor?: new (...args: any[]) => T) {
        this._engine = engine;
        if (constructor) {
            this._mapper = new constructor();
        }
    }

    set_mapper<T extends Mapper>(
        constructor: new (...args: any[]) => T
    ): void {
        this._mapper = new constructor();
    }

    dispatch(e: InputEvent, input: HTMLInputElement): MaskState | undefined {
        if (!input || !this._mapper) return;

        const o = this._mapper.map(e);
        if (!o) return;

        e.preventDefault();

        const caret = this._safeGetInputCaret(input);
        this._engine.setCaretFromFormatted(caret);

        const state = this._engine.apply(o);

        requestAnimationFrame(() => {
            input.setSelectionRange(state.caret, state.caret)
        })

        return state;
    }

    _safeGetInputCaret(input: HTMLInputElement): number {
        return input.selectionStart ?? input.value.length;
    }
}