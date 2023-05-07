import React from "react"
import ContentLoader from "react-content-loader"

export const MainContentLoader = (props) => (
  <ContentLoader
    speed={2}
    width={1440}
    height={500}
    viewBox="0 0 1440 500"
    backgroundColor="#fafafa"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="10" ry="10" width="1440" height="500" />
  </ContentLoader>
)