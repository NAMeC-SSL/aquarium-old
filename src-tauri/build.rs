extern crate prost_build;

use std::path::{Path, PathBuf};

fn compile_packet(filename: &str, protos: &[impl AsRef<Path>], includes: &[impl AsRef<Path>]) {
    let mut build = prost_build::Config::new();

    build
        .default_package_filename(filename)
        //.out_dir(PathBuf::from("src/protobuf/"))
        .compile_protos(protos, includes)
        .expect(format!("Failed to compile {} protobuf files", filename).as_str());
}

fn main() {
    tauri_build::build();

    /*compile_packet(
        "tools_packet",
        &["protobuf/tools/tools.proto"],
        &["protobuf/tools"],
    );*/
    prost_build::compile_protos(&["protobuf/tools/tools.proto"], &["protobuf/tools"]).unwrap();
}
