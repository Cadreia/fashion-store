import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BackgroundImageContainer, ContentContainer, MenuItemContainer, SubtitleContainer, TitleContainer } from './menu-item.styles'

const MenuItem = ({title, imageUrl, linkUrl, size}) => {
    let navigate = useNavigate()
    // let location = useLocation()
    // let { slug } = useParams()

    return (
        <MenuItemContainer size={size} onClick={() => navigate(linkUrl)}>
         <BackgroundImageContainer className='background-image' imageUrl={imageUrl} />
          <ContentContainer className='content'>
            <TitleContainer>{title.toUpperCase()}</TitleContainer>
            <SubtitleContainer>SHOP NOW</SubtitleContainer>
          </ContentContainer>
        </MenuItemContainer>
    )
}

export default MenuItem
