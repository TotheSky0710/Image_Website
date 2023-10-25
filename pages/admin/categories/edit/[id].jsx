import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEdit } from 'components/admin/categories';
import { Spinner } from 'components';
import { categoryService, alertService } from 'services';

export default Edit;

function Edit() {
    const router = useRouter();
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        categoryService.getById(id)
            .then(x => setCategory(x))
            .catch(alertService.error);
    }, [router]);

    return (
        <Layout>
            <h1>Edit User</h1>
            {category ? <AddEdit category={category} /> : <Spinner />}
        </Layout>
    );
}