import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateUserThunk } from "../services/users-thunks";

const UserSettings = ({ user }) => {
    const dispatch = useDispatch();

    const [thisUser, setThisUser] = useState(user);

    const updateUser = async () => {
        await dispatch(updateUserThunk(thisUser));
    }

    return (
        <div className='flex'>
            <div>
                <label>Username: </label>{user.username}
            </div>

            <div>
                <label>Email: </label>{user.email}
            </div>
            <div>
                <select value={thisUser.isAdmin} onChange={(e) => {setThisUser({... thisUser, isAdmin: e.target.value})} }>
                    <option value={false}>User</option>
                    <option value={true}>Admin</option>
                </select>
            </div>
            <div>
                <button onClick={updateUser} type="button">Update</button>
            </div>
        </div>
    );
}

export default UserSettings;