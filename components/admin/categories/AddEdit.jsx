import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { categoryService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {
    const category = props?.category;
    const router = useRouter();

    const [submitData, setSubmitData] = useState({
        categoryName: '',
        categorySlug: '',
        imgContent: ''
    });
    const [imagePath, setImagePath] = useState('');

    useEffect(() => {
        if(category) {
            setSubmitData({
                categoryName: category.categoryName,
                categorySlug: category.categorySlug,
                imgContent: category.imgContent
            });
            setImagePath(`/api/images${category.imgContent}`);
        }
    }, [category]);

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
            //setCreateObjectURL(URL.createObjectURL(i));
            setImagePath(base64Img);

        }
    }

    const uploadToServer = async (event) => {
        event.preventDefault();

        try {
            // create or update user based on user prop
            let message;
            let response;
            
            if (category) {
                response = await categoryService.update(category._id, submitData);
                message = 'Category updated';
            } else {
                response = await categoryService.add(submitData);
                message = 'Category added';
            }
            
            // redirect to user list with success message
            router.push('/admin/categories');
            alertService.success(message, true);
        } catch (error) {
            alertService.error(error);
            console.error(error);
        }

        
    }

    // const category = props ? props.category : null;

    // // form validation rules 
    const validationSchema = Yup.object().shape({
        categoryName: Yup.string()
            .required('Category Name is required'),
        categorySlug: Yup.string()
            .required('Category Slug is required'),
        imgContent: Yup.string()
            .required('Image is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (category) {
        formOptions.defaultValues = props.category;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    return (
        <form>
            <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input name="categoryName" type="text" {...register('categoryName')} className={`form-control ${errors.categoryName ? 'is-invalid' : ''}`} onChange={(event) => {
                    setSubmitData({...submitData, categoryName:event.target.value})
                }} value={submitData.categoryName}/>
                <div className="invalid-feedback">{errors.categoryName?.message}</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Category Slug</label>
                <input name="categorySlug" type="text" {...register('categorySlug')} className={`form-control ${errors.categorySlug ? 'is-invalid' : ''}`} onChange={(event) => {
                    setSubmitData({...submitData, categorySlug:event.target.value})
                }} value={submitData.categorySlug} />
                <div className="invalid-feedback">{errors.categorySlug?.message}</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Image</label>
                <input name="imgPath" type="file" {...register('imgPath')} className={`form-control ${errors.imgPath ? 'is-invalid' : ''}`} onChange={uploadToClient} />
                <img src={imagePath} width='100%' loading='lazy'/> 
                <div className="invalid-feedback">{errors.imgPath?.message}</div>
            </div>
            <div className="mb-3">
                <button type="button" disabled={formState.isSubmitting} className="btn btn-primary me-2" onClick={uploadToServer}>
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/admin/categories" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}