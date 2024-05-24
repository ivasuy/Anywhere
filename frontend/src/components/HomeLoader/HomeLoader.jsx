import React from 'react'
import "./homeLoader.scss"

const HomeLoader = () => {
    return (
        <div id='homeLoader'>
            <p class="rock">Anywhere</p>
            <div class="hand">
                <div class="palm">
                    <div class="bone"></div>
                    <div class="palm-shadow"></div>
                </div>
                <div class="thumb-base"></div>
                <div class="mobile-shadow"></div>
                <div class="mobile">
                    <div class="screensaver"></div>
                </div>
                <div class="finger-5 finger">
                    <div class="finger-shadow"></div>
                </div>
                <div class="finger-4 finger">
                    <div class="fingernail"></div>
                </div>
                <div class="finger-3 finger">
                    <div class="fingernail"></div>
                </div>
                <div class="finger-2 finger">
                    <div class="finger-shadow"></div>
                </div>
                <div class="finger-1 finger">
                    <div class="fingernail"></div>
                </div>
            </div>
        </div>
    )
}

export default HomeLoader