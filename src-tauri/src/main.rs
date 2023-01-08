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
}

const BUFFER_SIZE: usize = 4096;

#[tauri::command]
fn receive_packet(state: tauri::State<State>) -> Result<tools_packet::SoftwarePacket, Error> {
    let socket_state = state.mutex.lock().unwrap();
    let mut buf = [0u8; BUFFER_SIZE];
    let p_size = socket_state.socket.recv(&mut buf)?;
    let packet = tools_packet::SoftwarePacket::decode(Cursor::new(&buf[0..p_size]))
        .expect("Error - Decoding the packet");
    
    Ok(packet)
}

/*async fn socket_run() {/*  */
    let sock = UdpSocket::bind(format!("127.0.0.1:{}", 10100));
    let mut buf = [0; 1024];

    loop {
        let (len, addr) = sock.recv_from(&mut buf);
        println!("{:?} bytes received from {:?}", len, addr);
        // Here sleep
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
        .invoke_handler(tauri::generate_handler![receive_packet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
