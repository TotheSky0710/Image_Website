import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ImageAddModal = (props) => {

    const { categories }= props;

    const {submitData, setSubmitData} = props;

    useEffect(() => {
        console.log(submitData.imgContent);
    },[]);

    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const uploadToClient = async (event) => {
        if(event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            const base64Img = await toBase64(i);
            setSubmitData({...submitData, imgContent: base64Img});
        }
    }

    return (
        <>
            <Modal show={props.isModalOpen} onHide={() => {props.setIsModalOpen(false);setSubmitData({...submitData, imgContent:''})}}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Image
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Image</label>
                            <input name="imgPath" type="file" className={`form-control`} onChange={uploadToClient} />
                            <img src={submitData.imgContent} width='150px' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Image Name</label>
                            <input name="imageName" type="text" className={`form-control`} onChange={(event) => {
                                setSubmitData({...submitData, imageName:event.target.value})
                            }}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Image Alt Tag</label>
                            <input name="imageAltTag" type="text" className={`form-control`} onChange={(event) => {
                                setSubmitData({...submitData, imageAltTag:event.target.value})
                            }} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Image Category</label>
                            <select name="category" type="select" className={`form-control`} onChange={(event) => {
                                setSubmitData({...submitData, category:event.target.value})
                            }}>
                                <option></option>
                                {
                                    categories.map((category, index) => (
                                        <option value={category._id} key={category.categoryName} >{category.categoryName}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setIsModalOpen(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => props.onClickSave(submitData)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export { ImageAddModal };