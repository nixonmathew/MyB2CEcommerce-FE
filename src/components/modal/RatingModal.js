import { StarOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useHistory, useParams } from 'react-router-dom';

const RatingModal = ({ children }) => {

    const { user } = useSelector((state) => ({ ...state }));
    const [isModalVisible, setIsModalVisible] = useState(false);
    const history = useHistory();
    const { slug } = useParams();

    const handleModal = () => {
        if (user && user.token) {
            setIsModalVisible(true);
        }
        else {
            history.push({
                pathname: '/login',
                state: { from: `/product/${slug}` }
            })
        }
    }

    return (
        <>
            <div onClick={handleModal}>
                <StarOutlined className="text-danger" />
                <br />{" "}
                {user ? "Leave Rating" : "Login to leave rating"}
            </div>
            <Modal title="Leave your rating"
                centered
                visible={isModalVisible}
                onOk={() => {
                    setIsModalVisible(false);
                    toast.success('Thanks for the review');
                }}
                onCancel={() => setIsModalVisible(false)}

            >
                {children}
            </Modal>
        </>
    )
}
export default RatingModal;