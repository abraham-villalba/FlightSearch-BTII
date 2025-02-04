import { Loader2 } from "lucide-react"; // Using Lucide icons for a nice spinner

type SpinnerProps = {
    size: number,
    className: string
}

export default function LoadingSpinner({size = 5, className=""}: SpinnerProps) {
    return (
        <Loader2 className={`animate-spin ${className}`} size={size} />
    );
}