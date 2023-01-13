import {useForm} from "react-hook-form"
import {useRef, useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";

type Commands = {
    normal_speed: number;
    tangent_speed: number;
    angular_speed: number;
    dribble: boolean;
}

function Index() {
    const [form, setForm] = useState({
        normal_speed: 0.0,
        tangent_speed: 0.0,
        angular_speed: 0.0,
        dribble: false
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        });
    };

    const onSubmit = event => {
        event.preventDefault()
        invoke("send_commands", {data: form});
    }
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="normal_speed">Vitesse normale (x)</label>
                <input type="number" value={form.normal_speed} id="normal_speed" min="-3.0" max="3.0"
                       step="0.01" onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="tangent_speed">Vitesse tangentielle (y)</label>
                <input type="number" value={form.tangent_speed} id="tangent_speed" min="-3.0" max="3.0" step="0.01"
                       onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="angular_speed">Vitesse angulaire</label>
                <input type="number" value={form.angular_speed} id="angular_speed" min="-3.14" max="3.14" step="0.01"
                       onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="dribble">Dribble</label>
                <input type="checkbox" value={form.dribble.toString()} id="dribble" onChange={handleChange}/>
            </div>
            <div>
                <input type="submit" value="Envoyer la commande"/>
            </div>
        </form>
    )
}

export default Index;