import Masonry from "react-masonry-css";

export const MyMasonryComponent = (props) => {
    const breakpointColumnsObj = {
        default: 4, // Number of columns for default screen width
        1200: 3, // Number of columns for screen width >= 1100px
        768: 2, // Number of columns for screen width >= 700px
    };

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid row"
            columnClassName="masonry-grid_column"
        >
            {props.children}
        </Masonry>
    );
};