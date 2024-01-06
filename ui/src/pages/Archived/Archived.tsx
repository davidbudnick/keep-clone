import { List } from '@/components'
import { NoteStatus } from '@/constants/status'

const Archived = () => {
    return (
        <div className="ml-10 mt-14 p-4">
            <List status={NoteStatus.ARCHIVED} />
        </div>
    )
}

export default Archived