import DeleteChatButton from "./DeleteChatButton"
import InviteUser from "./InviteUser"

interface AdminControlsProps {
  chatId: string
}

export default function AdminControls({chatId} : AdminControlsProps) {
  return (
    <div className='flex justify-end space-x-2 m-5 mb-0'>
      <InviteUser chatId={chatId} />
      <DeleteChatButton chatId={chatId} />
    </div>
  )
}
