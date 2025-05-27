import {Menu, House, Search} from "@deemlol/next-icons"

export type IconName = "home" | "tracks" | "pilots" | "f1" | "loading"

interface IconProps {
    icon: IconName
    className?: string | undefined
}

export const icons = {
    home: <Icon icon="home" className="w-[24px]" />,
    pilots: <Icon icon="pilots" className="w-[24px] rotate-y-180 " />,
    tracks: <Icon icon="tracks" className="w-[24px]" />,
    f1: <Icon icon="f1" className="w-[24px]" />,
}

export function Icon({icon, className, ...props}: IconProps) {
    switch (icon) {
        case "pilots":
            return <Pilots className={className} />
        case "tracks":
            return <Tracks className={className} />
        case "home":
            return <House {...props} className={className} />
        case "f1":
            return <F1 className={className} />
        case "loading":
            return <Loading className={className} />
        default:
            return <></>
    }
}

function Pilots({className}: {className?: string}) {
    return (
        <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
            className={className}
        >
            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                <path d="M2565 4709 c-798 -81 -1501 -569 -1850 -1284 -34 -71 -210 -502 -389 -957 l-326 -826 70 -584 c38 -320 73 -600 76 -620 l6 -38 1905 0 1905 0 96 63 c562 363 933 938 1038 1607 25 160 25 500 1 660 -128 829 -653 1500 -1422 1820 -329 136 -747 196 -1110 159z m575 -318 c738 -129 1340 -647 1575 -1353 40 -121 93 -353 82 -364 -2 -2 -324 -3 -715 -2 l-710 3 89 149 c50 82 87 151 84 154 -5 6 -241 45 -1625 273 -476 78 -868 145 -873 149 -4 3 24 53 62 111 336 507 852 822 1471 899 121 15 428 4 560 -19z m-1452 -1406 c416 -69 897 -148 1069 -176 l312 -52 -22 -37 c-12 -21 -146 -243 -297 -493 l-275 -456 -1049 -1 c-994 0 -1048 1 -1044 18 3 9 121 311 263 670 162 410 263 652 272 652 7 0 354 -56 771 -125z m3132 -644 c0 -41 -20 -232 -26 -253 -5 -17 -56 -18 -896 -18 -492 0 -888 4 -886 9 2 4 41 72 88 149 l85 141 818 1 817 0 0 -29z m-127 -638 c-133 -369 -403 -715 -742 -951 l-74 -52 -1731 0 -1731 0 -43 368 c-24 202 -46 375 -48 385 -5 16 55 17 1158 17 l1163 0 89 150 88 150 948 0 948 0 -25 -67z" />
            </g>
        </svg>
    )
}

function Tracks({className}: {className?: string}) {
    return (
        <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
            className={className}
        >
            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                <path d="M811 4144 c-238 -65 -394 -306 -352 -544 27 -150 18 -139 631 -755 307 -308 565 -574 574 -592 11 -22 16 -58 16 -115 0 -99 -21 -153 -71 -189 l-34 -24 -595 -5 c-583 -5 -596 -5 -653 -27 -158 -60 -271 -182 -312 -338 -65 -251 93 -513 352 -580 49 -13 194 -15 979 -15 528 0 942 4 970 9 28 5 75 19 107 31 111 42 162 87 390 344 225 253 271 299 316 319 19 9 232 13 786 17 l760 5 66 26 c99 38 154 74 221 142 69 72 131 188 147 281 15 80 15 852 0 932 -38 213 -230 405 -443 443 -34 6 -191 11 -362 11 l-302 0 -4 70 c-6 110 -58 165 -158 165 -100 0 -152 -55 -158 -166 l-4 -70 -562 3 -561 3 -45 27 c-26 15 -139 125 -265 257 -226 238 -277 281 -380 322 -60 24 -60 24 -530 26 -388 2 -479 0 -524 -13z m946 -314 c15 -6 145 -129 288 -273 233 -236 267 -267 328 -295 128 -61 137 -62 748 -62 l557 0 4 -70 c6 -110 58 -165 158 -165 100 0 152 55 158 165 l4 70 295 0 c203 0 309 -4 337 -12 55 -16 138 -99 154 -154 17 -58 17 -810 0 -868 -16 -55 -99 -138 -154 -154 -31 -9 -223 -12 -751 -12 -460 0 -730 -4 -769 -11 -81 -14 -209 -79 -270 -136 -29 -26 -142 -150 -253 -275 -215 -242 -244 -270 -306 -288 -29 -8 -289 -10 -952 -8 -903 3 -912 3 -939 24 -52 38 -69 71 -69 132 0 70 26 111 88 141 42 21 56 21 594 21 326 0 572 4 604 10 171 32 326 178 371 349 22 84 23 253 3 340 -30 127 -33 130 -631 731 -487 489 -564 571 -575 608 -21 72 15 152 83 185 29 14 86 17 450 17 259 0 427 -4 445 -10z" />
            </g>
        </svg>
    )
}

function F1({className}: {className?: string}) {
    return (
        <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2560.000000 640.000000"
            preserveAspectRatio="xMidYMid meet"
            className={className}
        >
            <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                <path d="M9250 6389 c-1523 -40 -2414 -233 -3200 -689 -407 -237 -798 -539 -1330 -1029 -194 -179 -1850 -1815 -3430 -3389 l-1285 -1281 1799 0 1798 -1 72 68 c40 37 369 355 732 707 1561 1517 2305 2229 2529 2420 600 513 1082 702 1980 775 406 33 500 33 5130 37 l4631 4 1194 1194 1195 1195 -5765 -2 c-3171 0 -5893 -5 -6050 -9z" />
                <path d="M18545 3200 l-3200 -3200 1925 0 1925 0 3200 3200 3200 3200 -1925 0 -1925 0 -3200 -3200z" />
                <path d="M9557 3599 c-1176 -38 -1707 -185 -2262 -626 -192 -153 -309 -266 -1661 -1613 l-1361 -1355 1675 -3 1676 -2 496 494 c510 509 604 592 772 684 209 115 428 167 813 192 103 6 1257 10 3250 10 l3090 0 1115 1115 1115 1115 -4240 -2 c-2332 0 -4347 -5 -4478 -9z" />
                <path d="M20830 740 l0 -60 125 0 125 0 0 -340 0 -340 70 0 70 0 0 340 0 340 125 0 125 0 0 60 0 60 -320 0 -320 0 0 -60z" />
                <path d="M21570 400 l0 -400 65 0 65 0 2 305 3 305 109 -305 109 -305 57 0 57 0 109 305 109 304 3 -304 2 -305 65 0 65 0 0 400 0 400 -94 0 -93 0 -47 -132c-25 -73 -73 -213 -107 -311 -34 -98 -64 -175 -68 -172 -3 4 -54 142 -112 308l-106 302 -97 3 -96 3 0 -401z" />
            </g>
        </svg>
    )
}

function Loading({className}: {className?: string}) {
    return (
        <svg className={className} viewBox="0 0 50 50">
            <path d="M5,25 Q12.5,15 25,25 T45,25" fill="none" stroke="#fb2c36" strokeWidth="2" opacity="0.3">
                <animate
                    attributeName="d"
                    values="M5,25 Q12.5,15 25,25 T45,25; M5,25 Q12.5,35 25,25 T45,25; M5,25 Q12.5,15 25,25 T45,25"
                    dur="2s"
                    repeatCount="indefinite"
                ></animate>
            </path>
            <path d="M5,25 Q12.5,15 25,25 T45,25" fill="none" stroke="#fb2c36" strokeWidth="2" opacity="0.5">
                <animate
                    attributeName="d"
                    values="M5,25 Q12.5,15 25,25 T45,25; M5,25 Q12.5,35 25,25 T45,25; M5,25 Q12.5,15 25,25 T45,25"
                    dur="3s"
                    repeatCount="indefinite"
                ></animate>
            </path>
            <path d="M5,25 Q12.5,15 25,25 T45,25" fill="none" stroke="#fb2c36" strokeWidth="2" opacity="0.7">
                <animate
                    attributeName="d"
                    values="M5,25 Q12.5,15 25,25 T45,25; M5,25 Q12.5,35 25,25 T45,25; M5,25 Q12.5,15 25,25 T45,25"
                    dur="4s"
                    repeatCount="indefinite"
                ></animate>
            </path>
        </svg>
    )
}
