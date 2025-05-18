import type {Metadata} from "next"
import "./globals.css"
import { Navbar } from "./_components/Navbar"

export const metadata: Metadata = {
    title: "F1 Project",
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
