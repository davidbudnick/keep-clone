import { List } from "@/components";
import { NoteStatus } from "@/constants/status";

const Home = () => {
    return (
        <div className="ml-10 mt-14 p-4">
            <List status={NoteStatus.ACTIVE} />
        </div>
    )
}

export default Home