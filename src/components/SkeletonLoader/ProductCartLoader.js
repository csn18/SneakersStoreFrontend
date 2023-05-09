import React from "react"
import ContentLoader from "react-content-loader"

export const ProductCartLoader = (props) => (
    <ContentLoader
        speed={2}
        width={732}
        height={90}
        viewBox="0 0 732 90"
        backgroundColor="#fafafa"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="0" rx="10" ry="10" width="90" height="90"/>
        <rect x="97" y="26" rx="10" ry="10" width="330" height="38"/>
        <rect x="434" y="26" rx="10" ry="10" width="150" height="38"/>
        <rect x="591" y="15" rx="10" ry="10" width="141" height="60"/>
    </ContentLoader>
)
