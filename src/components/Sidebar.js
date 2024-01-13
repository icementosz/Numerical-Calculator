import React , {useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import {SidebarData} from './SidebarData'
import Submenu from './SubMenu'

const Nav = styled.div`
    background: #15171c;
    height: 90px;
    display: flex;
    justify-content: flex-start;
    align-items:center;
`;

const NavIcon = styled(Link)`
    margin-left:2rem;
    font-size:2rem;
    height: 80px;
    display: flex;
    justifly-content: flex-start;
    align-items: center;
    
`;

const SidebarNav = styled.nav`
    background : #15171c;
    width:250px;
    height:100vh;
    display:flex;
    justifly-content: center;
    position:fixed;
    top:0;
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition:250ms;
    z-index:100;
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

const iconwhitecolor = {color:"white"}

const Sidebar = () => {
    const[sidebar , setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    const sidebarClose = (close) => setSidebar(close);
    
    return (
        <>
            <Nav>
                <NavIcon to="#">
                    <FaIcons.FaBars onClick={showSidebar} style={iconwhitecolor} />
                </NavIcon>
            </Nav>
            <SidebarNav sidebar={sidebar}>
                <SidebarWrap>
                    <NavIcon to="#">
                        <AiIcons.AiOutlineClose onClick={showSidebar} style={iconwhitecolor}/>
                    </NavIcon>
                    {SidebarData.map((item,index) => {
                        return <Submenu item={item} key={index} sidebarClose={sidebarClose}/>;
                    })}
                </SidebarWrap>
            </SidebarNav>
        </>
  );
};

export default Sidebar;