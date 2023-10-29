import { useState, useEffect } from 'react';

import { Layout } from 'components/admin';
import { userCategoryService, alertService } from 'services';

import { useRouter } from 'next/router';

export default Index;

function Index() {
    const router = useRouter();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        userCategoryService.getAllWithImagesCount()
            .then(x => {
                setCategories(x);
            })
            .catch(alertService.error);
    }, []);

    const seeCategoryDetail = (id) => {
        router.push(`/categories/details/${id}`);
    }

    return (
        <Layout>
            <h1 className="header-title center">Categories</h1>
            <div className='clearfix'></div>
            <div className='main-content row'>
                {
                    categories.map((category, index) => (
                        <div className='col-md-3 category-item' key={category.categoryName} onClick={() => seeCategoryDetail(category._id)} >
                            <img src={`/api/images${category.imgContent}`} width='100%' loading='lazy'/> 
                            <h3>{category.categoryName}</h3>
                            <h6>{category.imageCount ? `${category.imageCount} Images`: 'No Image available'}</h6>
                        </div>
                    ))
                }
            </div>
        </Layout>
    );
}
