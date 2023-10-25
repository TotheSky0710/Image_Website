export { Layout };

function Layout({ children }) {
    return (
        <div className="p-4">
            <div className="container clearfix">
                {children}
            </div>
        </div>
    );
}