import {Ref, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
// TODO : Rename components
import { Field as FieldType} from '../../store/ssl'

let field = {} as FieldType

const ball = {
    x : 0,
    y: 0
}


const opponents = [
    {
        id: 0,
        position: {
            x: 1.5,
            y: 1.12,
            theta: 3.14,
        },
    },
    {
        id: 1,
        position: {
            x: 1.5,
            y: 0,
            theta: 3.14,
        },
    },
    {
        id: 2,
        position: {
            x: 1.5,
            y: -1.12,
            theta: 3.14,
        },
    },
    {
        id: 3,
        position: {
            x: 0.55,
            y: 0,
            theta: 3.14,
        },
    },
    {
        id: 4,
        position: {
            x: 2.5,
            y: 0,
            theta: 3.14,
        },
    },
    {
        id: 5,
        position: {
            x: 3.6,
            y: 0,
            theta: 3.14,
        },
    },
];
const allies = [
    {
        id: 0,
        position: {
            x: -1.5,
            y: 1.12,
            theta: 0,
        },
    },
    {
        id: 1,
        position: {
            x: -1.5,
            y: 0,
            theta: 0,
        },
    },
    {
        id: 2,
        position: {
            x: -1.5,
            y: -1.12,
            theta: 0,
        },
    },
    {
        id: 3,
        position: {
            x: -0.55,
            y: 0,
            theta: 0,
        },
    },
    {
        id: 4,
        position: {
            x: -2.5,
            y: 0,
            theta: 0,
        },
    },
    {
        id: 5,
        position: {
            x: -3.6,
            y: 0,
            theta: 0,
        },
    },
];

function init_canvas(context: CanvasRenderingContext2D) {

    context.canvas.width = window.innerWidth - 30;
    context.canvas.height = window.innerHeight - 30;
    clear_canvas(context);
    let x = (0.8 * context.canvas.width) / field.length
    let y = (0.8 * context.canvas.height) / field.width

    let scale_factor = (x+y) / 2;

    context.scale(scale_factor, -scale_factor);

    context.translate(context.canvas.width / 2 / scale_factor , -context.canvas.height / 2 / scale_factor );
}
function draw_shape(ctx, x,y, orientation) {
    ctx.beginPath();
    ctx.arc(
        x,
        -y,
        0.085,
        -orientation + 0.75,
        -orientation + Math.PI * 2 - 0.75
    );
    ctx.fill();
    ctx.closePath();
}



function draw_text(ctx, x,y, id) {
    ctx.save();
    ctx.translate(
        x,
        -y
    );

    ctx.fillStyle = 'black';
    ctx.font = '1px serif';
    ctx.scale(0.15, -0.15);
    ctx.fillText(id, -0.085 * 4 , 4 * 0.085);

    ctx.restore();

}
function draw_robots(context) {
    opponents.forEach((opponent) => {
        context.fillStyle = "#dbd81d";
        draw_shape(context, opponent.position.x, opponent.position.y, opponent.position.theta);
        draw_text(context, opponent.position.x, opponent.position.y, opponent.id);
    })

    allies.forEach((opponent) => {
        context.fillStyle = "#249ed6";
        draw_shape(context, opponent.position.x, opponent.position.y, opponent.position.theta);
        draw_text(context, opponent.position.x, opponent.position.y, opponent.id);
    })
}

function draw_penalty(ctx) {
    ctx.strokeRect((field.length / 2) - field.penalty.depth, -field.penalty.width / 2, field.penalty.depth, field.penalty.width);

    // Right
    ctx.strokeRect(- (field.length / 2), - field.penalty.width / 2, field.penalty.depth, field.penalty.width);

}

function draw_goal(ctx) {
    ctx.strokeRect(field.length / 2, -field.goal.width / 2, field.goal.depth, field.goal.width);
    ctx.strokeRect(-(field.length / 2) - field.goal.depth, - field.goal.width / 2, field.goal.depth, field.goal.width);
}

function draw_ball(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = 'orange';
    ctx.fillStyle = 'orange';
    ctx.arc(ball.x, ball.y, 0.02, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

function clear_canvas(context: CanvasRenderingContext2D) {
    context.clearRect(0,0, context.canvas.width, context.canvas.height);
}

function draw_line_vertical(ctx) {
    ctx.beginPath();
    ctx.moveTo(0, field.width / 2);
    ctx.lineTo(0, - field.width / 2);
    ctx.stroke();
    ctx.closePath();
}
function Field() {
    // @ts-ignore
    field = useSelector((state) => state.field.field);
    console.log(field);

    const canvasRef : Ref<HTMLCanvasElement> = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d');
        //Our first draw
        init_canvas(context);

        context.strokeStyle = "#fff";
        context.lineWidth = 0.03;


        context.strokeRect(-field.length / 2, -field.width / 2, field.length, field.width);

        draw_robots(context);

        draw_goal(context);
        draw_penalty(context);
        draw_line_vertical(context);

        draw_ball(context);

       // context.strokeRect(0, 0, x * 9, y * 6)
    }, []);

    return (
        <canvas ref={canvasRef}>

        </canvas>
    )
}

export default Field;