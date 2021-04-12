export type Color = typeof colors[number];
export type Role = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
export type File = typeof files[number];
export type Rank = typeof ranks[number];
export type Key = 'a0' | `${File}${Rank}`;
export type FEN = string;
export type Pos = [number, number];
export interface Piece {
  role: Role;
  color: Color;
  promoted?: boolean;
}
export interface Drop {
  role: Role;
  key: Key;
}
export type Pieces = Map<Key, Piece>;
export type PiecesDiff = Map<Key, Piece | undefined>;

export type KeyPair = [Key, Key];

export type NumberPair = [number, number];

export type NumberQuad = [number, number, number, number];

export interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export type Dests = Map<Key, Key[]>;

export interface Elements {
  board: HTMLElement;
  container: HTMLElement;
  ghost?: HTMLElement;
  svg?: SVGElement;
  customSvg?: SVGElement;
}
export interface Dom {
  elements: Elements;
  bounds: Memo<ClientRect>;
  redraw: () => void;
  redrawNow: (skipSvg?: boolean) => void;
  unbind?: Unbind;
  destroyed?: boolean;
  relative?: boolean; // don't compute bounds, use relative % to place pieces
}
export interface Exploding {
  stage: number;
  keys: readonly Key[];
}

export interface MoveMetadata {
  premove: boolean;
  ctrlKey?: boolean;
  holdTime?: number;
  captured?: Piece;
  predrop?: boolean;
}
export interface SetPremoveMetadata {
  ctrlKey?: boolean;
}

export type MouchEvent = Event & Partial<MouseEvent & TouchEvent>;

export interface KeyedNode extends HTMLElement {
  cgKey: Key;
}
export interface PieceNode extends KeyedNode {
  tagName: 'PIECE';
  cgPiece: string;
  cgAnimating?: boolean;
  cgFading?: boolean;
  cgDragging?: boolean;
}
export interface SquareNode extends KeyedNode {
  tagName: 'SQUARE';
}

export interface Memo<A> {
  (): A;
  clear: () => void;
}

export interface Timer {
  start: () => void;
  cancel: () => void;
  stop: () => number;
}

export type Redraw = () => void;
export type Unbind = () => void;
export type Milliseconds = number;
export type KHz = number;

export const colors = ['white', 'black'] as const;
export const files = ['P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w'] as const;
export const ranks = ['\'', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':'] as const;

export const useChessgroundToPkConversion = true;
export const chessgroundToPkConversionMap: Object = {
    // RANKS
    'P': '1',
    'Q': '2',
    'R': '3',
    'S': '4',
    'T': '5',
    'U': '6',
    'V': '7',
    'W': '8',
    'X': '9',
    'Y': '10',
    'Z': '11',
    '\\[': '12',
    '\\\\': '13',
    '\\]': '14',
    '\\^': '15',
    '_': '16',
    '`': '17',
    'a': '18',
    'b': '19',
    'c': '20',
    'd': '21',
    'e': '22',
    'f': '23',
    'g': '24',
    'h': '25',
    'i': '26',
    'j': '27',
    'k': '28',
    'l': '29',
    'm': '30',
    'n': '31',
    'o': '32',
    'p': '33',
    'q': '34',
    'r': '35',
    's': '36',
    't': '37',
    'u': '38',
    'v': '39',
    'w': '40',

    // FILES
    '\'': 'a',
    '\\(': 'b',
    '\\)': 'c',
    '\\*': 'd',
    '\\+': 'e',
    '\\,': 'f',
    '\\-': 'g',
    '\\.': 'h',
    '/': 'i',
    '0': 'j',
    '1': 'k',
    '2': 'l',
    '3': 'm',
    '4': 'n',
    '5': 'o',
    '6': 'p',
    '7': 'q',
    '8': 'r',
    '9': 's',
    ':': 't',
};

export interface BoardDimensions {
    width: number;
    height: number;
}
