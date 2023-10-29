import { useState, useEffect } from 'react';
import { userImageService } from 'services';
import { MyMasonryComponent } from 'components'

import { useRouter } from 'next/router';

function Home() {
    const router = useRouter();

    const [images, setImages] = useState([]);    
    const [selectedImage, setSelectedImage] = useState([]);

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;
    
        const fetchData = async () => {
            try {
                const response = await userImageService.getById(id);
                setSelectedImage(response);

                const relatedImages = await userImageService.getAll('', response.category._id);
                setImages(relatedImages.filter(x => x.id !== id));

            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
      }, [router.query]);

    const handleDownload = async () => {
        try {
            const ext = selectedImage.imgContent.split('.')[1];

            await userImageService.download(selectedImage.id);
            const link = document.createElement('a');
            link.href = `/api/images${selectedImage.imgContent}`;
            link.download = `${selectedImage.imageName}.${ext}`;

            console.log(link);
            link.click();
            
            setSelectedImage({ 
                ...selectedImage, 
                downloadCounts: selectedImage.downloadCounts + 1
            });
        } catch (error) {
            console.log(error);
        }
    };
    
    const seeImageDetail = (imageId) => {
        router.push(`/images/${imageId}`);
    }

    return (
        <div className="p-4">
            <div className="container">
                <div className='row'>
                    <div className='col-md-8'>
                        <div className='detail-image-wrapper'>
                            <img src={`/api/images${selectedImage.imgContent}`} width='100%' loading='lazy'/> 
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='detail-desc-wrapper'>
                            <h2>{selectedImage.imageName}</h2>
                            <h6>category: {selectedImage.category ? selectedImage.category.categoryName: ''}</h6>
                            <h6>Download Count: {selectedImage.downloadCounts}</h6>
                            <button className='btn btn-success btn-md btn-download' onClick={() => handleDownload()}>Download</button>
                            <div className='mt-4'>
                                <span>share on:</span><br />
                                <ul className='shared-link-list'>
                                    <li><a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(selectedImage.imgContent)}`}>Facebook</a></li>
                                    <li><a target="_blank" href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(selectedImage.imgContent)}&media=${encodeURIComponent(selectedImage.imgContent)}`}>Pinterest</a></li>
                                    <li><a target="_blank" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(selectedImage.imgContent)}`}>Twitter</a></li>
                                    <li><a target="_blank" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(selectedImage.imgContent)}`}>LinkedIn</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12 related-image-wrapper mt-4 mb-1' >
                        <h2 className='mb-0'>Related Images</h2>
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
