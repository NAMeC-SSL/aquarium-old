import Link from "next/link";

function App() {
    return (
        <div className="container">
            <h1>Bienvenue dans notre viewer!</h1>
            <Link href="/field">Terrain</Link>
        </div>
    );
}

export default App;
