import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { findAllUsersThunk } from '../services/users-thunks';

import UserSettings from './user-settings';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser, editingUsers } = useSelector((state) => { return state.user });

    const findAllUsers = async () => {
        await dispatch(findAllUsersThunk());
    }

    useEffect(() => {
        if (currentUser && currentUser.isAdmin !== true) {
            navigate("/");
            return;
        }
        findAllUsers();

    }, []);

    return (
        <div>
            <h1>Admin Screen</h1>
            <div>
                <h2>Users</h2>
                {editingUsers && editingUsers.map((user) => {
                    const deepCopy = { ...user };
                    return (
                        <UserSettings user={deepCopy} />
                    );
                })}
            </div>
        </div>
    );
}

export default AdminDashboard;