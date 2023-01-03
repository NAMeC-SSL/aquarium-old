import "../style.css";
import "../App.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head />
      <body>{children}</body>
    </html>
  )
}
