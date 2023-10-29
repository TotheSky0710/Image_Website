import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { messageService, alertService } from 'services';

export { ContactForm };

function ContactForm() {
    // form validation rules 
    const validationSchema = Yup.object().shape({
        Name: Yup.string()
            .required('Name is required'),
        Email: Yup.string()
            .required('Email is required'),
        Subject: Yup.string()
            .required('Subject is required'),
        Message: Yup.string()
            .required('Message is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    async function onSubmit(data) {
        alertService.clear();
        try {
            // create or update user based on user prop
            await messageService.sendMessage(data);
            let message = 'Message Sent';
            
            // redirect to user list with success message
            alertService.success(message, true);
            reset();
        } catch (error) {
            alertService.error(error);
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 col">
                <label className="form-label">Name</label>
                <input name="Name" type="text" {...register('Name')} className={`form-control ${errors.Name ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.Name?.message}</div>
            </div>
            <div className="mb-3 col">
                <label className="form-label">Email</label>
                <input name="Email" type="text" {...register('Email')} className={`form-control ${errors.Email ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.Email?.message}</div>
            </div>
            <div className="mb-3 col">
                <label className="form-label">Subject</label>
                <input name="Subject" type="text" {...register('Subject')} className={`form-control ${errors.Subject ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.Subject?.message}</div>
            </div>
            <div className="mb-3 col">
                <label className="form-label">Message</label>
                <textarea name="Message" type="text" {...register('Message')} className={`form-control ${errors.Message ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.Message?.message}</div>
            </div>
            <div className="mb-3">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                    Send Message
                </button>
            </div>
        </form>
    );
}