import { Navbar, List, Sidebar } from "@/components";
import { ROUTES } from "@/constants/routes";

const Home = () => {
    return (
        <>
            <Navbar />
            <Sidebar currentRoute={ROUTES.NOTES} />
            <div className="ml-10 mt-14 p-4">
                <List />
            </div>
        </>
    )
}

export default Home