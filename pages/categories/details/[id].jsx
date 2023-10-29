import { useState, useEffect } from 'react';
import { userCategoryService, userImageService } from 'services';
import { MyMasonryComponent } from 'components'

import { useRouter } from 'next/router';

function Home() {
    const router = useRouter();

    const [images, setImages] = useState([]);    
    const [selectedCategory, setSelectedCategory] = useState([]);

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;
    
        const fetchData = async () => {
            try {
                const response = await userCategoryService.getById(id);
                setSelectedCategory(response);

                const relatedImages = await userImageService.getAll('', response._id);
                setImages(relatedImages.filter(x => x.id !== id));

            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
      }, [router.query]);

    const seeImageDetail = (imageId) => {
        router.push(`/images/${imageId}`);
    }

    return (
        <div className="p-4">
            <div className="container">
                <div className='row'>
                    <div className='category-page-header-wrapper'>
                        <div className='category-page-header' style={{ backgroundImage: `url(/api/images${selectedCategory.imgContent})` }}></div>
                        <h1>{selectedCategory.categoryName}</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12 related-image-wrapper mt-4 mb-1' >
                        <MyMasonryComponent>
                            {
                                images.map((image, index) => (
                                    <div className='masonry-item' key={image.id} onClick={() => seeImageDetail(image.id)}>
                                        <img src={`/api/images${image.imgContent}`} alt={image.imageAltTag} width='100%' loading='lazy'/> 
                                        <h4>{image.imageName}</h4>
                                        <h5>{image.category.categoryName}</h5>
                                        <h6>Downloads: {image.downloadCounts}</h6>
                                    </div>
                                ))
                            }
                        </MyMasonryComponent>
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default Home;
