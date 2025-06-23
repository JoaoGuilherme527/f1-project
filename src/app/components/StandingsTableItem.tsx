import Image from "next/image"

interface StandingTableItemProps {
    color: string
    position: string
    image: string
    contrastColor: string
    nameLabel: string
    points: string
}

export const StandingTableItem = ({color, contrastColor, image, nameLabel, points, position}: StandingTableItemProps) => (
    <div className="w-full flex items-center border-b-2 border-white text-white h-10" style={{background: color}}>
        <div className="w-14 h-full flex items-center justify-center  border-gray-600 bg-black">
            <h1 className="text-center text-sm">{position}</h1>
        </div>
        <div className="flex items-center gap-4 w-full h-full px-4 overflow-hidden">
            <div className="h-4 flex justify-center items-center py-4">
                <Image alt="Team Logo" src={image} height={16} width={32} />
            </div>
            <div className="flex items-center gap-1">
                <p
                    className="text-shadow text-sm"
                    style={{
                        fontFamily: "Formula1 Display Bold",
                        color: contrastColor,
                    }}
                >
                    {nameLabel.toUpperCase()}
                </p>
            </div>
        </div>
        <div className="bg-red-500 w-14 h-full flex items-center justify-center">
            <h1 style={{fontFamily: "Formula1 Display Bold"}} className="text-center text-white text-sm">
                {points}
            </h1>
        </div>
    </div>
)
