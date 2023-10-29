import { useState, useEffect } from 'react';
import { userCategoryService, userImageService } from 'services';

import { MyMasonryComponent } from 'components';
import { useRouter } from 'next/router';

function Home() {
    const router = useRouter();

    const [images, setImages] = useState([]);    
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState([]);
    const [searchVal, setSearchVal] = useState('');

    useEffect(() => {
        userCategoryService.getAll()
            .then(x => setCategories(x));
        userImageService.getAll()
            .then(x => setImages(x));
    }, []);

    useEffect(() => {
        userImageService.getAll(searchVal, activeCategory)
            .then(x => setImages(x));
    }, [searchVal, activeCategory])

    const searchImage = () => {
        userImageService.getAll(searchVal, activeCategory)
            .then(x => setImages(x));
    }

    const seeImageDetail = (imageId) => {
        router.push(`/images/${imageId}`);
    }

    return (
        <div className="p-4">
            <div className="container">
                <div className="search-wrapper">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Search" onChange={(e) => setSearchVal(e.target.value)} value={searchVal}/>
                        <button className="btn btn-success btn-search" onClick={() => searchImage()}>Go</button>
                    </div>
                </div>
                <div className='category-list-wrapper'>
                    <button className={`category-list-item ${activeCategory === null ? 'active-item' : ''}`} onClick={() => setActiveCategory(null)}>All</button>
                    {
                        categories.map((category, index) => (
                            <button key={category._id} className={`category-list-item ${activeCategory === category._id ? 'active-item' : ''}`} onClick={() => setActiveCategory(category._id)}>{category.categoryName}</button>
                        ))
                    }
                </div>
                <MyMasonryComponent>
                    {
                        images.map((image, index) => (
                            <div className='masonry-item' key={image.id} onClick={() => seeImageDetail(image.id)}>
                                <img src={`/api/images${image.imgContent}`} alt={image.imageAltTag} width='100%' loading='lazy'/> 
                                <h4>{image.imageName}</h4>
                                <h5>{image.category.categoryName}</h5>
                            </div>
                        ))
                    }
                </MyMasonryComponent>
            </div>
        </div>
    );
}

export default Home;
