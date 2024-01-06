import { List } from '@/components'
import { NoteStatus } from '@/constants/status'

const Trash = () => {
    return (
        <div className="ml-10 mt-14 p-4">
            <List status={NoteStatus.DELETED} />
        </div>
    )
}

export default Trash