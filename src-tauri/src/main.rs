mod protobuf;

use std::net::UdpSocket;
use std::sync::Mutex;

struct State {
    mutex: Mutex<SocketState>,
}

struct SocketState {
    socket: UdpSocket,
}

const BUFFER_SIZE: usize = 4096;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn receive_packet(state: tauri::State<State>) {
    let socket_state = state.mutex.lock().unwrap();
    let mut buf = [0u8; BUFFER_SIZE];
    match socket_state.socket.recv_from(&mut buf) {
        Ok((_p_size, _)) => {
            /*let packet = ToolsSoftwarePacket::decode(Cursor::new(&buf[0..p_size]))
            .expect("Error - Decoding the packet");*/
        }
        Err(_err) => {}
    };
    // let p_size = 16;
}

/*async fn socket_run() {
    let sock = UdpSocket::bind(format!("127.0.0.1:{}", 10100));
    let mut buf = [0; 1024];

    loop {
        let (len, addr) = sock.recv_from(&mut buf);
        println!("{:?} bytes received from {:?}", len, addr);
    }
}
*/
fn main() {
    // tauri::async_runtime::spawn(socket_run());
    let sock = UdpSocket::bind(format!("127.0.0.1:{}", 10100)).unwrap();
    sock.set_nonblocking(true).unwrap();

    tauri::Builder::default()
        .manage(State {
            mutex: Mutex::new(SocketState { socket: sock }),
        })
        .invoke_handler(tauri::generate_handler![greet, receive_packet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
