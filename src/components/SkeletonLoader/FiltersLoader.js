import ContentLoader from "react-content-loader";
import React from "react";

export const FiltersLoader = (props) => {
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
                <rect width="136.8" height="29.143" x="185.4" y="52.143" fill="#F4F4F4" rx="10"
                      transform="rotate(180 185.4 52.143)"/>
                <rect width="28.8" height="29.143" x="43.8" y="52.143" fill="#F4F4F4" rx="10"
                      transform="rotate(180 43.8 52.143)"/>
                <rect width="136.8" height="29.143" x="185.4" y="144.143" fill="#F4F4F4" rx="10"
                      transform="rotate(180 185.4 144.143)"/>
                <rect width="28.8" height="29.143" x="43.8" y="144.143" fill="#F4F4F4" rx="10"
                      transform="rotate(180 43.8 144.143)"/>
                <rect width="136.8" height="29.143" x="185.4" y="98.143" fill="#F4F4F4" rx="10"
                      transform="rotate(180 185.4 98.143)"/>
                <rect width="28.8" height="29.143" x="43.8" y="98.143" fill="#F4F4F4" rx="10"
                      transform="rotate(180 43.8 98.143)"/>
                <rect width="136.8" height="29.143" x="185.4" y="190.143" fill="#F4F4F4" rx="10"
                      transform="rotate(180 185.4 190.143)"/>
                <rect width="28.8" height="29.143" x="43.8" y="190.143" fill="#F4F4F4" rx="10"
                      transform="rotate(180 43.8 190.143)"/>
            </ContentLoader>
        </div>
    )
}
