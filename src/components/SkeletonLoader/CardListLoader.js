import ContentLoader from "react-content-loader";
import React from "react";

export const CardLoader = (props) => {
    return (
        <div>
            <ContentLoader
                speed={2}
                width={250}
                height={350}
                viewBox="0 0 250 350"
                backgroundColor="#fafafa"
                foregroundColor="#ecebeb"
                {...props}
            >
                <rect x="19" y="24" rx="10" ry="10" width="213" height="151"/>
                <rect x="51" y="187" rx="10" ry="10" width="149" height="34"/>
                <rect x="19" y="244" rx="10" ry="10" width="213" height="34"/>
                <rect x="19" y="289" rx="10" ry="10" width="171" height="34"/>
                <rect x="196" y="289" rx="10" ry="10" width="36" height="34"/>
            </ContentLoader>
        </div>
    )
}
