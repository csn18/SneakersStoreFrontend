import React from "react"
import ContentLoader from "react-content-loader"
import './Skeleton.css'

export const MenuNumberLoader = (props) => {
    return (
        <div className='nav-menu__number'>
            <ContentLoader
                speed={2}
                width={70}
                height={28}
                viewBox="0 0 70 28"
                backgroundColor="#fafafa"
                foregroundColor="#ecebeb"
                {...props}
            >
                <rect x="0" y="0" rx="5" ry="5" width="70" height="28"/>
            </ContentLoader>
        </div>
    )
}
