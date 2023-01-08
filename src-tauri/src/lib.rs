#![deny(clippy::all)]

pub mod tools_packet {
    include!(concat!(env!("OUT_DIR"), "/tools_packet.rs"));
    include!(concat!(env!("OUT_DIR"), "/tools_packet.serde.rs"));
}
