interface Field {
    width: number,
    height: number,
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
interface Ball extends Position {
}

interface Robot {
    id: number,
    position: Position,
    orientation : number
}

enum Color {
    YELLOW=0,
    BLUE=1,
}

interface Data {
    field: Field,
    allies: [Robot],
    opponents: [Robot],
    yellow: Color
}

function draw_field(context, field: Field) {

}

export function draw() {

}

export default {}