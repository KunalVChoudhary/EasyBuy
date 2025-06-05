import { useState } from 'react'
import {useSelector} from 'react-redux'
import styles from './Navbar.module.scss'

export default function Navbar(){

    const displayTheme=useSelector((state)=>state.displayTheme)
    const userName=useSelector(state=>state.userInfo)

    return(
        <>
            <div className={`${styles["common-navbar"]} ${styles[displayTheme]} d-flex justify-content-between`}>
                <div className={`${styles["container-1"]} d-flex px-3`}>
                    <div className={`${styles["app-logo-container"]} d-flex align-items-center`}>
                        <img className={`${styles["app-icon"]} d-block`} src="/images/App-icon.png" alt="Logo"/>
                        <p className={`${styles["app-name"]} px-1 h2 m-0`}>EasyBuy</p>
                    </div>                    
                </div>

                <div className={`${styles["container-2"]} d-flex flex-grow-1 px-2`}>
                    {/* Search for samll screen */}
                    <label htmlFor={`${styles['searchbar-icon-toggle-input']}`} className={`${styles["search-bar-toggler"]} align-items-center`}>
                        <img className={`p-2`} src="/images/search-icon.png" alt="search icon" />
                    </label>
                    <input id={`${styles['searchbar-icon-toggle-input']}`} type='checkbox' hidden />
                    {/* ActualSearch Bar for samll screen */}
                    <div className={`${styles["search-bar-container"]} align-items-center justify-content-center input-group px-2 py-2`}>
                        <input className={`${styles["search-input-box"]} form-control px-2 py-1`} type="search" name="productSearch" id="prductSearch" placeholder='Search Product . . .' />
                    </div>
                    {/* Filter-icon for samll screen */}
                    <label htmlFor={`${styles['filter-icon-toggle-input']}`} className={`${styles["filter-item-toggler"]} align-items-center`}>
                        <img className={`p-2`} src="/images/filter-icon.png" alt="filter icon" />
                    </label>
                    <input id={`${styles['filter-icon-toggle-input']}`} type='checkbox' hidden />
                    {/* Actual Filter box for samll screen */}
                    <div className={`${styles["filter-box-container"]} align-items-center justify-content-center px-2 py-2`}>
                        <div className={`${styles["filter-box"]} px-2 py-1`}></div>
                    </div>
                    {/* dim body */}
                    <div className={styles.overlay} ></div>
                </div>

                <div className={`${styles["container-3"]} justify-content-end ps-3`}>
                    <div className={`${styles["wishlist-container"]} d-flex align-items-center p-2`}>
                        <img className={`d-inline px-2`} src="/images/wishlist-icon.png" alt="" />
                    </div>
                    <div className={`${styles["cart-container"]} d-flex justify-content-center flex-column p-2`}>
                        <p className={`d-inline px-2 m-0 text-center`}>589</p>
                        <img className={`d-inline px-2`} src="/images/cart-icon.png" alt="" />
                    </div>
                    {!userName?
                        <div className={`${styles["Signup-Login-container"]} d-flex align-items-center px-3 py-2`}>
                        <div className={`h5 m-0`}>Signup/Login</div>
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
                                    <li>{(displayTheme=='dark')? 'Switch Light Mode':'Switch Dark Mode'}</li>
                                    <li>Settings</li>
                                    <li>Log Out</li>
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
                        <p className={`d-inline px-2 m-0 text-center`}>589</p>
                        <img className={`d-inline px-2`} src="/images/cart-icon.png" alt="" />
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
                                    <li>{(displayTheme=='dark')? 'Switch Light Mode':'Switch Dark Mode'}</li>
                                    <li>Settings</li>
                                    <li>Log Out</li>
                                </ul>
                            </div>
                        </div>
                    </div>}
            </div>
        </>
    )
}