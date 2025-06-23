import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import styles from './Navbar.module.scss'
import Filter from '../Filter/Filter'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import LogOut from '../LogOutGroup/LogOut'
import { useGetCartLengthQuery } from '../../redux/apiSlice/apiCartSlice'

export default function Navbar(){

    const displayTheme=useSelector((state)=>state.displayTheme)
    const userName=useSelector(state=>state.userInfo)
    const navigate=useNavigate()


    // for display of components
    const [logOutState, setLogOutState] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [searchBar, setSearchBar] = useState(false);
    const [filterBox, setFilterBox] = useState(false);

    //for search
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        const handleResize = () => {
        setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
        window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        setSearchBar(false);
        setFilterBox(false);
    }, [searchParams]);

    //for cart no.
    const { data, isLoading , isError }= useGetCartLengthQuery()

    return(
        <>
            <div className={`${styles["common-navbar"]} ${styles[displayTheme]} d-flex justify-content-between`}>
                <div className={`${styles["container-1"]} d-flex px-3`}>
                    <div className={`${styles["app-logo-container"]} d-flex align-items-center`} onClick={()=>{navigate('/')}}>
                        <img className={`${styles["app-icon"]} d-block`} src="/images/App-icon.png" alt="Logo"/>
                        <p className={`${styles["app-name"]} px-1 h2 m-0`} >EasyBuy</p>
                    </div>                    
                </div>

                

                <div className={`${styles["container-2"]} d-flex flex-grow-1 px-2`}>

                    <img className={` ${styles['hidingIcon']} p-2`} onClick={()=>{setSearchBar(true)}} src="/images/search-icon.png" alt="search icon" />

                    <div className={`${styles["search-bar-container"]} ${(windowWidth<=750)?((searchBar)? styles['show-search-bar-container'] : styles['hide-search-bar-container']):''} align-items-center justify-content-center input-group px-2 py-2`}>
                        <SearchBar/>
                    </div>

                    <img className={` ${styles['hidingIcon']} p-2`} src="/images/filter-icon.png" onClick={()=>{setFilterBox(true)}} alt="filter icon" />

                    <div className={` ${(windowWidth<=750 && filterBox)? styles['show-filter-box-container'] : styles['hide-filter-box-container']} align-items-center justify-content-center px-2 py-2`}>
                        <Filter/>
                    </div>

                    <div className={`${( ((windowWidth<=750)&&(searchBar || filterBox)) || logOutState )? styles["overlayBackground"]:''}`} onClick={()=>{
                        setSearchBar(false);
                        setFilterBox(false);
                    }}></div>
            
                </div>

                <div className={`${styles["container-3"]} justify-content-end ps-3`}>
                    <div className={`${styles["wishlist-container"]} d-flex align-items-center p-2`} onClick={()=>{navigate('/wishlist')}}>
                        <img className={`d-inline px-2`} src="/images/wishlist-icon.png" alt="" />
                    </div>
                    <div className={`${styles["cart-container"]} d-flex justify-content-center flex-column px-2 pb-2`} onClick={()=>{navigate('/cart')}}>
                        <p className={`d-inline px-2 m-0 text-center`} style={{position: 'relative',top: '2px'}}>{data || 0}</p>
                        <img className={`d-inline px-2`} src={`images/cart-dark-icon.png`} alt="" />
                    </div>
                    {!userName?
                    <div className={`${styles["Signup-Login-container"]} d-flex `}>
                        <div className='d-flex align-items-center' onClick={()=>{navigate('/signup')}}><p className={`h5 m-0 px-2`}>Signup</p></div>
                        <div className='d-flex align-items-center' onClick={()=>{navigate('/login')}}><p className={`h5 m-0 ps-2 pe-1`}>Login</p></div>
                    </div>:
                    <div className={`${styles["user-info-container"]} d-flex align-items-center p-2`}>
                        <div className={`d-flex`}>
                            <label htmlFor={`${styles["navbar-content-toggle-input"]}`} className={`${styles['navbar-content-toggle-label']} d-flex align-items-center`}>
                                <img className={`p-2`} src="/images/profile-pic-icon.png" alt="" />
                                <div className={`h4 m-0 pe-2 py-2`}>{userName.length<=5? userName.slice(0,5) : userName.slice(0,5).concat('..')}</div>
                            </label>
                            <input type="checkbox" id={`${styles["navbar-content-toggle-input"]}`} hidden/>
                            <div className={`${styles['navbar-content-toogle-list']} pe-2`}>
                                <ul className={`${styles['navbar-ul']} m-0 p-0 ${styles[displayTheme]}`}>
                                    <li>Account</li>
                                    <li>Home</li>
                                    <li>{(displayTheme=='dark')? 'Light Mode':'Dark Mode'}</li>
                                    <li>Settings</li>
                                    <li onClick={()=>{setLogOutState(true)}}>Log Out</li>
                                </ul>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
            <div className={`${styles["container-4"]} ${styles[displayTheme]} justify-content-evenly`}>
                    <div className={`${styles["wishlist-container"]} d-flex align-items-center p-4`}>
                        <img className={`d-inline px-2`} src="/images/wishlist-icon.png" alt="" />
                    </div>
                    <div className={`${styles["cart-container"]} d-flex justify-content-center flex-column p-4`}>
                        <p className={`d-inline px-2 m-0 text-center`} style={{position: 'relative',top: '2px'}}>{data || 0}</p>
                        <img className={`d-inline px-2`} src={`images/cart-dark-icon.png`} alt="" />
                    </div>
                    {!userName?
                    <div className={`${styles["Signup-Login-container"]} d-flex align-items-center p-4`}>
                        <div className={`h5 m-0`}>Signup/Login</div>
                    </div>
                    :
                    <div className={`${styles["user-info-container"]} d-flex align-items-center p-4`}>
                        <div className={`d-flex`}>
                            <label htmlFor={`${styles["navbar-content-toggle-input2"]}`} className={`${styles['navbar-content-toggle-label2']} d-flex align-items-center`}>
                                <img className={`p-2`} src="/images/profile-pic-icon.png" alt="" />
                                <div className={`h4 m-0 pe-2 py-2`}>{userName.length<=5? userName.slice(0,5) : userName.slice(0,5).concat('..')}</div>
                            </label>
                            <input type="checkbox" id={`${styles["navbar-content-toggle-input2"]}`} hidden/>
                            <div className={`${styles['navbar-content-toogle-list2']} pe-2`}>
                                <ul className={`${styles['navbar-ul']} p-0 m-0 ${styles[displayTheme]}`}>
                                    <li>Account</li>
                                    <li>Home</li>
                                    <li>{(displayTheme=='dark')? 'Light Mode':'Dark Mode'}</li>
                                    <li>Settings</li>
                                    <li onClick={()=>{setLogOutState(true)}}>Log Out</li>
                                </ul>
                            </div>
                        </div>
                    </div>}
            </div>

            {logOutState? 
            <div className={`${styles['logOutContainer']}`}>
                <LogOut setLogOutState={setLogOutState}/>
            </div>
            :
            ''}
        </>
    )
}