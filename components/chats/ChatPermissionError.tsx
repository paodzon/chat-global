import { AlertCircle } from "lucide-react"
import { Button } from "../ui/button"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import Link from "next/link"

export default function ChatPermissionError() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <p className="flex-1">
          You do not have permission to view this chat.
          <br />
          <span className="font-bold">
            Please ask the chat admin to add you to the chat.
          </span>
        </p>

        <Link href="/chat" replace>
          <Button variant="destructive">Dismiss</Button>
        </Link>

      </AlertDescription>
    </Alert>
  )
}
