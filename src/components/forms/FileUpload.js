import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar, Badge } from 'antd';


const FileUpload = ({ formValues, setFormValues, setLoading }) => {

    const { user } = useSelector((state) => ({ ...state }));

    const fileUploadAndResize = (e) => {
        let files = e.target.files;
        let allUploadedFiles = formValues.images;

        if (files) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri) => {
                    axios.post(process.env.REACT_APP_API + '/uploadimages', { image: uri }, {
                        headers: {
                            authToken: user.token
                        }
                    }).then((res) => {
                        console.log('images uploaded res', res);
                        setLoading(false);
                        allUploadedFiles.push(res.data);
                        setFormValues({ ...formValues, images: allUploadedFiles })
                        console.log('formvalues', formValues)
                    }).catch((err) => {
                        setLoading(false);
                        console.log('cloudinary upload error', err)
                    })
                }, 'base64')
            }
        }
    }
    const removeImage = (public_id) => {
        console.log('removie image called', public_id)
        setLoading(true);
        axios.post(process.env.REACT_APP_API + '/removeimage', { public_id }, {
            headers: {
                authToken: user.token
            }
        }).then(res => {
            setLoading(false);
            let updatedImages = formValues.images;
            let index = updatedImages.findIndex(image => image.public_id === public_id)
            updatedImages.splice(index, 1);
            setFormValues({ ...formValues, images: updatedImages })
        }).catch(err => {
            setLoading(false);
            console.log('error while removing image ', err)
        })
    }

    return (
        <>
            <div className="row mr-3">
                {formValues.images && formValues.images.map((image) => (
                    <Badge key={image.public_id} style={{ cursor: 'pointer' }} onClick={() => removeImage(image.public_id)} count='X' >
                        <Avatar src={image.url}
                            shape="square"
                            className="ml-3" size={100} />
                    </Badge>
                ))}
            </div>
            <div className="row mt-3">
                <label className="btn btn-primary btn-raised">Choose File
                    <input type="file" hidden multiple accept="images/*" onChange={fileUploadAndResize} />
                </label>
            </div>

        </>
    )
}

export default FileUpload;