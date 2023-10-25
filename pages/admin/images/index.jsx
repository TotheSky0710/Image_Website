import { useState, useEffect } from 'react';

import { ImageAddModal } from 'components/admin/images';
import { Layout } from 'components/admin';
import { imageService, categoryService, alertService } from 'services';

export default Index;

function Index() {
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        categoryService.getAll()
            .then(x => {
                setCategories(x);
            })
            .catch(alertService.error);
        imageService.getAll()
            .then(x => {
                setImages(x);
            })
            .catch(alertService.error);
    }, []);

    const saveImageData = async (data) => {
        try {
            let message;
            let response;

            response = await imageService.add(data);
            imageService.getAll().then(x => {setImages(x)});

            message = 'Image added!';
            alertService.success(message, true);
        } catch (error) {
            alertService.error(error);
            console.error(error);
        };
        setIsModalOpen(false);
    }

    return (
        <Layout>
            <h1 className="header-title">Images</h1>
            <button type="button" className="btn btn-sm btn-success mb-2 mt-2 float-right" onClick={() => setIsModalOpen(true)}>
                Add New
            </button>
            <div className='clearfix'></div>
            <div className='main-content row'>
                {
                    images.map((image, index) => (
                        <div className='col-md-3 image-item' key={image.imageName} >
                            <img src={image.imgContent} width="100%"/>
                            <h3>{image.imageName}</h3>
                            <h4>{image.category ? image.category.categoryName : "Category doesn't exist"}</h4>
                        </div>
                    ))
                }
            </div>
            <ImageAddModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onClickSave={saveImageData} categories={categories} /> 
        </Layout>
    );
}
