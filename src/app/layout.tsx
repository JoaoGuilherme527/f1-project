import type {Metadata} from "next"
import "./globals.css"
import { Navbar } from "./components/Navbar"

export const metadata: Metadata = {
    title: "F1 Search",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                <Navbar>{children}</Navbar>
            </body>
        </html>
    )
}
