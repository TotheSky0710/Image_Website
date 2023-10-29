export { Layout };

function Layout({ children }) {
    return (
        <div className="p-4">
            <div className="addCategory-container clearfix">
                {children}
            </div>
        </div>
    );
}