import React from "react"
import ContentLoader from "react-content-loader"

export const ProductPriceLoader = (props) => (
    <ContentLoader
        speed={2}
        width={95}
        height={21}
        viewBox="0 0 95 21"
        backgroundColor="#fafafa"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="0" rx="5" ry="5" width="95" height="21"/>
    </ContentLoader>
)
