import React from "react"
import ContentLoader from "react-content-loader"

export const FavoritesItemLoader = (props) => (
    <ContentLoader
        speed={2}
        width={734}
        height={90}
        viewBox="0 0 734 90"
        backgroundColor="#fafafa"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="0" rx="10" ry="10" width="90" height="90"/>
        <rect x="97" y="26" rx="10" ry="10" width="276" height="38"/>
        <rect x="380" y="26" rx="10" ry="10" width="133" height="38"/>
        <rect x="520" y="15" rx="10" ry="10" width="130" height="60"/>
        <rect x="657" y="15" rx="10" ry="10" width="77" height="60"/>
    </ContentLoader>
)
