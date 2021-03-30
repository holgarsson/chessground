import * as cg from './types';

export const invRanks: readonly cg.Rank[] = [...cg.ranks].reverse();

export const NRanks: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const invNRanks: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

function files(n: number) {
    return cg.files.slice(0, n);
}

function ranks(n: number) {
    return cg.ranks.slice(0, n);
}

export function allKeys(geom: cg.Geometry) {
    const bd = cg.dimensions[geom];
    return Array.prototype.concat(...files(bd.width).map(c => ranks(bd.height).map(r => c + r)));
}

export function pos2key(pos: cg.Pos) {
    return (cg.files[pos[0] - 1] + cg.ranks[pos[1] - 1]) as cg.Key;
}

export const key2pos = (k: cg.Key): cg.Pos => [k.charCodeAt(0) - 96, k.charCodeAt(1) - 48];

export const allPos: readonly cg.Pos[] = allKeys(cg.Geometry.dim20x10).map(key2pos);

export function memo<A>(f: () => A): cg.Memo<A> {
    let v: A | undefined;
    const ret = (): A => {
        if (v === undefined) v = f();
        return v;
    };
    ret.clear = () => {
        v = undefined;
    };
    return ret;
}

export const timer = (): cg.Timer => {
    let startAt: number | undefined;
    return {
        start() {
            startAt = performance.now();
        },
        cancel() {
            startAt = undefined;
        },
        stop() {
            if (!startAt) return 0;
            const time = performance.now() - startAt;
            startAt = undefined;
            return time;
        },
    };
};

export const opposite = (c: cg.Color): cg.Color => (c === 'white' ? 'black' : 'white');

export const distanceSq: (pos1: cg.Pos, pos2: cg.Pos) => number = (pos1, pos2) => {
    return Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2);
}

export const samePiece = (p1: cg.Piece, p2: cg.Piece): boolean => p1.role === p2.role && p1.color === p2.color;

const posToTranslateBase: (pos: cg.Pos, asWhite: boolean, xFactor: number, yFactor: number, bt: cg.BoardDimensions) => cg.NumberPair =
    (pos, asWhite, xFactor, yFactor, bt) => [
        (asWhite ? pos[0] - 1 : bt.width - pos[0]) * xFactor,
        (asWhite ? bt.height - pos[1] : pos[1] - 1) * yFactor
    ];

export const posToTranslateAbs = (bounds: ClientRect, bt: cg.BoardDimensions) => {
    const xFactor = bounds.width / bt.width,
        yFactor = bounds.height / bt.height;
    return (pos: cg.Pos, asWhite: boolean) => posToTranslateBase(pos, asWhite, xFactor, yFactor, bt);
};

export const posToTranslateRel: (pos: cg.Pos, asWhite: boolean, bt: cg.BoardDimensions) => cg.NumberPair =
    (pos, asWhite, bt) => posToTranslateBase(pos, asWhite, 100 / bt.width, 100 / bt.height, bt);

export const translateAbs = (el: HTMLElement, pos: cg.NumberPair): void => {
    el.style.transform = `translate(${pos[0]}px,${pos[1]}px)`;
};

export const translateRel = (el: HTMLElement, percents: cg.NumberPair): void => {
    el.style.transform = `translate(${percents[0]}%,${percents[1]}%)`;
};

export const setVisible = (el: HTMLElement, v: boolean): void => {
    el.style.visibility = v ? 'visible' : 'hidden';
};

export const eventPosition = (e: cg.MouchEvent): cg.NumberPair | undefined => {
    if (e.clientX || e.clientX === 0) return [e.clientX, e.clientY!];
    if (e.targetTouches?.[0]) return [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
    return; // touchend has no position!
};

export const isRightButton = (e: cg.MouchEvent): boolean => e.buttons === 2 || e.button === 2;

export const createEl = (tagName: string, className?: string): HTMLElement => {
    const el = document.createElement(tagName);
    if (className) el.className = className;
    return el;
};

export function computeSquareCenter(key: cg.Key, asWhite: boolean, bounds: ClientRect): cg.NumberPair {
    const pos = key2pos(key);
    if (!asWhite) {
        pos[0] = 7 - pos[0];
        pos[1] = 7 - pos[1];
    }
    return [
        bounds.left + (bounds.width * pos[0]) / 8 + bounds.width / 16,
        bounds.top + (bounds.height * (7 - pos[1])) / 8 + bounds.height / 16,
    ];
}