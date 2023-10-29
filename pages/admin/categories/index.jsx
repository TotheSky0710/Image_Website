import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Layout } from 'components/admin';
import { categoryService, imageService, alertService } from 'services';

export default Index;

function Index() {
    const [images, setImages] = useState([]);
    const [activeImages, setActiveImages] = useState([]);
    const [categories, setCategories ] = useState([]);
    const [activeCategory, setActiveCategory] = useState({});

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

    useEffect(() => {
        const activeImages = images.filter(x => x.category._id === activeCategory._id);
        setActiveImages(activeImages);
    }, [activeCategory, images]);

    useEffect(() => {
        if(categories.length) setActiveCategory(categories[0]);
    }, [categories])

    const deleteCategory = (id) => {
        categoryService.delete(id)
            .then(() => {
                setCategories(categories => categories.filter(x => x._id !== id));
            });
    }

    const changeActiveCategory = (id) => {
        const tmp = categories.find((ele) => ele._id === id);
        setActiveCategory(tmp);
    }

    return (
        <Layout>
            <h1 className="header-title">Categories</h1>
            <Link href="/admin/categories/add" className="btn btn-sm btn-success mb-2 mt-2 float-right">Add New</Link>
            <div className='clearfix'></div>
            <div className='main-content row'>
                {
                Object.keys(activeCategory).length ?
                    <>
                        <div className='hidden-sm col-md-3'>
                            <ul className='side-bar'>
                                {
                                    categories.map((category, index) => (
                                        <li className={`side-bar-item ${category._id === activeCategory._id ? 'active-item' : ''}`} key={category.categoryName} onClick={() => changeActiveCategory(category._id)}>{category.categoryName}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className='col-md-9'>
                            <div className='row category-section'>
                                <div className='col-md-8'>
                                    <img src={`/api/images${activeCategory.imgContent}`} width='100%' loading='lazy'/> 
                                </div>
                                <div className='col-md-4'>
                                    <h2>{activeCategory.categoryName}</h2>
                                    <p>Total Images: <b>{activeImages.length}</b></p>
                                    <Link href={`/admin/categories/edit/${activeCategory._id}`} className="btn-category editBtn">Edit</Link>
                                    <a className="btn-category deleteBtn" onClick={ () => deleteCategory(activeCategory._id) }>Delete</a>
                                </div>
                            </div>
                            <div className='row'>
                                {
                                    activeImages.map((image, index) => (
                                        <div className='col-md-3 image-item' key={image.imageName} >
                                            <img src={`/api/images${image.imgContent}`} width='100%' loading='lazy'/> 
                                            <h3>{image.imageName}</h3>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </> : '' 
                }
            </div>
        </Layout>
    );
}
