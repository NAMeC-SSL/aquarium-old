use prost::Message;
use std::io::Cursor;
use std::net::UdpSocket;
use std::sync::Mutex;
use tauri::Error;

use aquarium::tools_packet;

struct State {
    mutex: Mutex<SocketState>,
}

struct SocketState {
    socket: UdpSocket,
    packet: Vec<tools_packet::ToolsPacket>,
}

const BUFFER_SIZE: usize = 4096;

#[tauri::command]
fn send_commands(state: tauri::State<State>, data: tools_packet::Commands) {
    let mut socket_state = state.mutex.lock().unwrap();
    let mut packet = tools_packet::ToolsPacket::default();
    packet.commands = Some(data);

    let mut buf = Vec::new();
    buf.reserve(packet.encoded_len());
    packet.encode(&mut buf).unwrap();
    println!("sending");

    socket_state.socket
        .send_to(
            &buf[0..packet.encoded_len()],
            format!("127.0.0.1:{}", 10101),
        )
        .expect("couldn't send data");
}


#[tauri::command]
fn receive_packet(state: tauri::State<State>) -> Result<tools_packet::SoftwarePacket, Error> {
    let socket_state = state.mutex.lock().unwrap();
    let mut buf = [0u8; BUFFER_SIZE];
    let p_size = socket_state.socket.recv(&mut buf)?;
    let packet = tools_packet::SoftwarePacket::decode(Cursor::new(&buf[0..p_size]))
        .expect("Error - Decoding the packet");

    /*    for tools_packet in &socket_state.packet {
            let mut buf = Vec::new();
            buf.reserve(tools_packet.encoded_len());
            tools_packet.encode(&mut buf).unwrap();
            println!("sending");

            socket_state.socket
                .send_to(
                    &buf[0..tools_packet.encoded_len()],
                    format!("127.0.0.1:{}", 10101),
                )
                .expect("couldn't send data");
        }*/

    Ok(packet)
}

fn main() {
    let sock = UdpSocket::bind(format!("127.0.0.1:{}", 10100)).unwrap();
    sock.set_nonblocking(true).unwrap();

    tauri::Builder::default()
        .manage(State {
            mutex: Mutex::new(SocketState { socket: sock, packet: Vec::new() }),
        })
        .invoke_handler(tauri::generate_handler![receive_packet, send_commands])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
