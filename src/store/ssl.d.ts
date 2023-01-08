// TODO : Rename this files by packet.d.ts ?
export interface Field {
    length: number,
    width: number,
    center_radius: number,
    goal_width: number,
    goal_depth: number,
    penalty_width: number,
    penalty_depth: number,
}

interface Position {
    x : number,
    y: number
}

export interface Ball extends Position {
}

export interface Robot extends Position {
    id: number,
    orientation : number
}

enum Color {
    YELLOW=0,
    BLUE=1,
}

export interface tools_packet {
    field: Field,
    allies: [Robot], // TODO : Mark 16 max
    opponents: [Robot],
    ball: Ball,
    yellow: Color
}
