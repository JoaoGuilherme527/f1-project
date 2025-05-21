"use client"

import Image from "next/image"
import Link from "next/link"
import {usePathname} from "next/navigation"
import React from "react"
import {Menu, House, Search} from "@deemlol/next-icons"
import "./styles.css"

type IconName = "home" | "search"

interface Route {
    href: string
    name: string
    iconName: IconName
}

export function Navbar({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()

    const icons = {
        white: {
            home: <House size={24} color="white" />,
            search: <Search size={24} color="white" />,
        },
        black: {
            home: <House size={24} color="#1e2939" />,
            search: <Search size={24} color="#1e2939" />,
        },
    }

    const routes: Array<Route> = [
        {href: "/", name: "Home", iconName: "home"},
        {href: "/pages/search/circuits", name: "Circuits", iconName: "search"},
        {href: "/pages/search/pilots", name: "Pilots", iconName: "search"},
    ]

    function routeComponent(route: Route) {
        const isActive = pathname === route.href
        const isActiveClass = isActive ? "bg-red-400" : "bg-gray-100"
        const isActiveTextClass = isActive ? "text-white" : "text-gray-800"
        const isActiveIconClass = isActive ? "text-white" : "text-gray-800"

        return (
            <Link
                href={route.href}
                className={`flex items-center gap-8 w-full cursor-pointer rounded-md ${isActiveClass} ${
                    isActive ? "activeRoute relative" : " hover:bg-gray-200 transition duration-300 ease-in-out"
                }`}
            >
                <div className={`p-1 ${isActiveIconClass} z-10`}>
                    {isActive ? icons.white[route.iconName] : icons.black[route.iconName]}
                </div>
                <div className={`flex items-center justify-center z-10  ${isActiveTextClass}`}>
                    <h2 className={`w-full ${isActiveTextClass}`}>{route.name}</h2>
                </div>
            </Link>
        )
    }

    function Routes(array: {routes: Array<Route>}) {
        return (
            <div className="flex flex-col items-center gap-4 w-full">
                {array.routes.map((route, index) => {
                    return (
                        <div key={index} className="flex flex-col gap-2 w-full">
                            {routeComponent(route)}
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="flex max-sm:flex-col flex-row bg-gray-900 p-2 gap-2 min-lg:h-screen">
            {/* SIDEBAR */}
            <div
                className={`bg-gray-100 w-56 p-2 px-3 shadow-2xl flex flex-col gap-8 items-center rounded-md z-10 showSideBar max-sm:hidden`}
                id="sidebar"
            >
                {/* F1 IMAGE AND SANDWICH BUTTON */}
                <div className="flex items-center gap-2 w-full">
                    <div className="px-1">
                        <Menu
                            size={24}
                            color="black"
                            className="cursor-pointer"
                            onClick={() => {
                                const sidebar = document.querySelector("#sidebar")
                                sidebar?.classList.toggle("hiddenSideBar")
                                sidebar?.classList.toggle("showSideBar")
                            }}
                        />
                    </div>
                    <div id="imgHolder" className="flex items-center justify-center mr-4">
                        <Image src={"/f1Image.png"} className="w-1/2" height={640} width={2560} alt="f1 logo" />
                    </div>
                </div>

                {/* NAVBAR */}
                <div className="flex flex-col items-center gap-2 w-full">
                    <Routes routes={routes} />
                </div>
            </div>

            {/* SIDEBAR MOBILE */}
            <div
                className={`bg-gray-100 w-full h-58 p-2 px-3 pb-4 shadow-2xl flex flex-col gap-8 items-center rounded-md z-10 min-sm:hidden hiddenSideBarMobile`}
                id="sidebarMobile"
            >
                {/* F1 IMAGE AND SANDWICH BUTTON */}
                <div className="flex items-center gap-2 w-full">
                    <div className="px-1">
                        <Menu
                            size={24}
                            color="black"
                            className="cursor-pointer"
                            onClick={() => {
                                const sidebar = document.querySelector("#sidebarMobile")
                                sidebar?.classList.toggle("hiddenSideBarMobile")
                                sidebar?.classList.toggle("showSideBarMobile")
                            }}
                        />
                    </div>
                    <div id="imgHolder" className="flex items-center justify-center mr-4">
                        <Image src={"/f1Image.png"} className="w-1/2" height={640} width={2560} alt="f1 logo" />
                    </div>
                </div>
                {/* NAVBAR */}
                <div className="flex items-center gap-2 w-full">
                    <Routes routes={routes} />
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="bg-gray-900 w-full max-sm:h-calc(100vh-235px) relative">{children}</div>
        </div>
    )
}
