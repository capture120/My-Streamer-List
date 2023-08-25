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
            <h1 class="text-2xl font-bold text-gray-900 text-center">Dashboard</h1>
            <div>
                <div class="container flex flex-col items-center justify-center w-full mx-auto bg-white rounded-lg shadow dark:bg-gray-800">
                    <ul class="flex flex-col divide-y divide">
                        {editingUsers && editingUsers.map((user) => {
                            const deepCopy = { ...user };
                            return (
                                <UserSettings user={deepCopy} />
                            );
                        })}

                    </ul>
                </div>
            </div>
        </div>

    );
}

export default AdminDashboard;