import { useNavigate } from "react-router"
import { Button } from "~/components/ui/button"

interface ErrorPageProps {
    message: string;
    details: string;
}

export default function ErrorPage({
    message,
    details
}: ErrorPageProps) {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] space-y-6 text-center">
            <h1 className="text-4xl font-bold">{message}</h1>
            <p className="text-xl text-muted-foreground">
                {details}
            </p>
            <div className="flex gap-4">
                <Button onClick={() => navigate(-1)}>
                    Go Back
                </Button>
                <Button variant="outline" onClick={() => navigate("/")}>
                    Go Home
                </Button>
            </div>
        </div>
    )
}
