import React from 'react'
import styles from './LogOut.module.scss'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function LogOut({ setLogOutState}) {

    const navigate = useNavigate()

    const logOutUser = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/signout`, {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            if (data.attempt) {
                localStorage.removeItem('AppDetail');
                toast.success('Logged Out Successfully')
                navigate('/')
                window.location.reload()
            } else {
                toast.error('Log Out Failed')
            }
        } catch (err) {
            console.error(err);
            toast.error('Log Out Failed')
        } finally {
            setLogOutState(false);
        }
    };

    const handleSubmission = (shouldLogOut) => {
        if (shouldLogOut) {
            logOutUser();
        } else {
            toast.error('Log Out Failed')
            setLogOutState(false);
        }
    };

    return (
        <div className={`${styles['LogOutBox']} p-2`}>
            <div className={`${styles['LogOutTitle']} d-flex justify-content-center p-2`}>
                <p className='h5'>Log Out Alert</p>
            </div>
            <hr />
            <div className={`${styles['LogOutMessage']} d-flex p-2 py-3`}>
                <p className='fs-6'>Are you sure you want to log out?</p>
            </div>
            <hr />
            <div className={`${styles['LogOutButton']} d-flex justify-content-end pt-3 pb-1`}>
                <button
                    className='btn btn-primary py-1 px-4 me-2'
                    onClick={() => handleSubmission(true)}
                >
                    Yes
                </button>
                <button
                    className='btn btn-danger py-1 px-4 me-2'
                    onClick={() => handleSubmission(false)}
                >
                    No
                </button>
            </div>
        </div>
    );
}

export default LogOut;
