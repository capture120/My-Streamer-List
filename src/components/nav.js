import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";

import { logoutThunk } from "../features/users/services/users-thunks";


function Nav() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { currentUser } = useSelector((state) => state.user);
    const top_right_nav = "xl:justify-self-end text-[8px] sm:text-[10px] md:text-[12px] text-neutral-300 dark:text-neutral-300 px-2 md:px-4"
    
    function TopRightButton({ children }) {
        return <button className="bg-blue-500 hover:bg-blue-700 text-white text-[8px] sm:text-md md:text-lg font-bold mx-1 py-2 px-1 sm:mx-3 sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline">{children}</button>
    }

    return (
        <nav className="relative flex w-full flex-wrap items-center justify-between bg-black py-2 lg:py-4">
            <div className="flex w-full flex-wrap items-center justify-between px-0 md:px-3">
                <div className="ml-2">
                    <Link className="text-sm md:text-lg text-neutral-300 dark:text-neutral-300" to="/">MyStreamerList</Link>

                </div>
                <div className="ml-2">
                    <span className={top_right_nav}> {currentUser ? ("Signed-in as: " + currentUser.username) : ""}</span>
                    <span className="flex-auto w-10">
                        <Link to="/search">
                            <TopRightButton>
                                Search
                            </TopRightButton>
                        </Link>
                        <Link to="/profile">
                            <TopRightButton>
                                Profile
                            </TopRightButton>
                        </Link>
                        {/* ( () => {history.pushState({}, "", window.location.pathname); return <Link to="/login"><TopRightButton>Log-In</TopRightButton></Link>}) */}
                        {!currentUser ? <Link to="/login"><TopRightButton>Log-In</TopRightButton></Link>
                            : <button onClick={() => {dispatch(logoutThunk()); navigate("/"); window.location.reload()}} className="bg-red-700 hover:bg-blue-700 text-white text-[8px] sm:text-md md:text-lg font-bold mx-1 py-2 px-1 sm:mx-3 sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline">Log-Out</button>}
                    </span>

                </div>
            </div>
        </nav>
    )
}

export default Nav;