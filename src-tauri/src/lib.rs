#![warn(clippy::needless_borrow)]
#![warn(clippy::unwrap_used)]
#![warn(clippy::panic)]
#![deny(clippy::all)]

pub mod tools_packet {
    include!(concat!(env!("OUT_DIR"), "/tools_packet.rs"));
    include!(concat!(env!("OUT_DIR"), "/tools_packet.serde.rs"));
}
