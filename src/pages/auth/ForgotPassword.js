import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';


const ForgotPassword = ({ history }) => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) history.push("/")
    }, [user, history])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true,
        }
        try {
            await auth.sendPasswordResetEmail(email, config);
            setEmail("");
            setLoading(false);
            toast.success("Reset Link has been shared to your email")
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    }
    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Forgot Password</h4>)}
            <form onSubmit={handleSubmit}>
                <input type="email" className="form-control" placeholder="Type your Email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <button className="btn btn-raised" type="primary" disabled={!email}>Submit</button>
            </form>
        </div>
    )

}

export default ForgotPassword;