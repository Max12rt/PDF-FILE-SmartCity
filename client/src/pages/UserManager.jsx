// UserManager.js
import React from 'react';
import { Link } from 'react-router-dom';

const UserManager = () => {
    return (
        <div>
            <h1>User Manager</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/users">User List</Link>
                    </li>
                    <li>
                        <Link to="/create">Create User</Link>
                    </li>
                    <li>
                        <Link to="/change-avatar">Change Avatar</Link>
                    </li>
                </ul>
                <Link to="/myAccount">
                    <button>Go to My Account</button>
                </Link>
            </nav>
        </div>
    );
};

export default UserManager;
