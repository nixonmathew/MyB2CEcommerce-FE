
import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { auth } from "../../firebase";
import { toast } from 'react-toastify'

const Password = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await auth.currentUser.updatePassword(password).then(() => {
            setLoading(false);
            toast.success('Password has been set')
        }).catch((err) => {
            console.log(err)
            setLoading(false);
            toast.success(err.message);
        }
        )
    }

    const passwordUpdateForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control"
                        placeholder="Enter your password" />
                    <br />
                    <button type="submit" className="btn btn-primary" disabled={!password || loading} > Change Password</button>
                </div>
            </form>
        )
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    <h4>Password Update</h4>
                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    )
}

export default Password;