import { Icon } from "../../public/icons/icons";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className={`absolute top-1/2 left-1/2 translate-x-[-50%] -translate-y-[50%]`}>
            <Icon icon="loading" className="w-30 h-30" />
        </div>
    )
}
