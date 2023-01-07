// TODO : Rename this files by packet.d.ts ?
export interface Field {
    length: number,
    width: number,
    center_radius: number,
    goal: {
        width: number,
        depth: number,
    },
    penalty: {
        width: number,
        depth: number,
    },
}

interface Position {
    x : number,
    y: number
}

export interface Ball extends Position {
}

export interface Robot {
    id: number,
    position: Position,
    orientation : number
}

enum Color {
    YELLOW=0,
    BLUE=1,
}

export interface packet_IATOVIEWER {
    field: Field,
    allies: [Robot], // TODO : Mark 16 max
    opponents: [Robot],
    yellow: Color
}
