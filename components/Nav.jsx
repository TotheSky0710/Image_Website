import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';

export { Nav };

function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    // only show nav when logged in
    if (!user) 
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-3 justify-content-between">
            <NavLink className="navbar-brand" href="/">Logo</NavLink>
            <div className="navbar-nav d-flex float-right">
                <NavLink href="/categories" exact className="nav-item nav-link">Categories</NavLink>
                <NavLink href="/about" className="nav-item nav-link">About</NavLink>
                <NavLink href="/contact" className="nav-item nav-link">Contact</NavLink>
            </div>
        </nav>
    );

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3 justify-content-center">
            <div className="navbar-nav">
                <NavLink href="/admin/categories" exact className="nav-item nav-link">Categories</NavLink>
                <NavLink href="/admin/images" className="nav-item nav-link">Images</NavLink>
                <button onClick={userService.logout} className="btn btn-link nav-item nav-link">Sign Out</button>
            </div>
        </nav>
    );
}