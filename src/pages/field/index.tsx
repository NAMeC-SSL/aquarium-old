import {Ref, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
// TODO : Rename components
import {Ball, Field as FieldType, Robot} from '../../store/ssl'
import {RootState} from "../../store/store";

let field = {} as FieldType

let ball = {} as Ball;


let opponents = [] as Robot[];

let allies = [] as Robot[];

function init_canvas(context: CanvasRenderingContext2D) {
    context.canvas.width = window.innerWidth - 30;
    context.canvas.height = window.innerHeight - 30;
    clear_canvas(context);

    let x = (0.8 * context.canvas.width) / field.length
    let y = (0.8 * context.canvas.height) / field.width
    let scale_factor = (x + y) / 2;

    context.translate(context.canvas.width / 2, context.canvas.height / 2);
    context.scale(scale_factor, -scale_factor);
}

function draw_shape(ctx, x, y, orientation) {
    ctx.beginPath();
    ctx.arc(x, y, 0.085, orientation + 0.75, orientation + Math.PI * 2 - 0.75);
    ctx.fill();
    ctx.closePath();
}


function draw_text(ctx, x, y, id) {
    ctx.save();
    ctx.translate(x, y);

    ctx.fillStyle = 'black';
    ctx.font = '1px serif';
    ctx.scale(0.12, -0.12);
    ctx.fillText(id, -0.085 * 4, 4 * 0.085);
    ctx.restore();
}

function draw_robots(context) {
    opponents.forEach((opponent) => {
        context.fillStyle = "#dbd81d";
        draw_shape(context, opponent.x, opponent.y, opponent.orientation);
        draw_text(context, opponent.x, opponent.y, opponent.id);
    })

    allies.forEach((opponent) => {
        context.fillStyle = "#249ed6";
        draw_shape(context, opponent.x, opponent.y, opponent.orientation);
        draw_text(context, opponent.x, opponent.y, opponent.id);
    })
}

function draw_penalty(ctx) {
    ctx.strokeRect((field.length / 2) - field.penalty_depth, -field.penalty_width / 2, field.penalty_depth, field.penalty_width);
    ctx.strokeRect(-(field.length / 2), -field.penalty_width / 2, field.penalty_depth, field.penalty_width);

}

function draw_goal(ctx) {
    ctx.strokeRect(field.length / 2, -field.goal_width / 2, field.goal_depth, field.goal_width);
    ctx.strokeRect(-(field.length / 2) - field.goal_depth, -field.goal_width / 2, field.goal_depth, field.goal_width);
}

function draw_ball(ctx) {
    console.log(ball);
    ctx.beginPath();
    ctx.strokeStyle = 'orange';
    ctx.fillStyle = 'orange';
    ctx.arc(ball.x, ball.y, 0.02, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

function clear_canvas(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function draw_line_vertical(ctx) {
    ctx.beginPath();
    ctx.moveTo(0, field.width / 2);
    ctx.lineTo(0, -field.width / 2);
    ctx.stroke();
    ctx.closePath();
}

function draw_center(ctx) {
    ctx.beginPath();
    ctx.arc(0, 0, field.center_radius, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
}

function Field() {
    field = useSelector((state: RootState) => state.field.field);
    allies = useSelector((state: RootState) => state.robots.allies);
    opponents = useSelector((state: RootState) => state.robots.opponents);
    ball = useSelector((state: RootState) => state.ball.ball);

    const canvasRef: Ref<HTMLCanvasElement> = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d');

        init_canvas(context);

        context.strokeStyle = "#fff";
        context.lineWidth = 0.03;

        context.strokeRect(-field.length / 2, -field.width / 2, field.length, field.width);
        draw_goal(context);
        draw_penalty(context);
        draw_line_vertical(context);
        draw_center(context);

        draw_robots(context);
        draw_ball(context);
    }, [field, allies, opponents, ball]);

    return (
        <canvas ref={canvasRef}>

        </canvas>
    )
}

export default Field;