import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {invoke} from "@tauri-apps/api/tauri";
import {tools_packet} from "../store/ssl";
import {updateField} from "../store/field";
import {updateRobots} from "../store/robots";
import {updateBall} from "../store/ball";

function Init() {
    const dispatch = useDispatch();

    useEffect(() => {
        const id = setInterval(async () => {
            invoke("receive_packet").then((data: tools_packet) => {
                dispatch(updateField(data.field));
                dispatch(updateRobots({allies: data.allies, opponents: data.opponents}));
                dispatch(updateBall(data.ball));
            }).catch((_) => {});
        }, 16);
        return () => clearInterval(id);
    }, []);

    return (
        <>
        </>
    )
}

export default Init;

