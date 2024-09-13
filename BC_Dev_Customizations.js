/*
Author: Dean Schulz
Installation: 
    1. Install ScriptAutoRunner Chrome Extension
    2. Add the following script and enable
Features:
    -Adds Themes quick link to sidebar
    -Moves 'change store' button to bottom of sidebar
    -Collapses front end admin bar by default
    -siteNotes - Adds custom info message to themes page 
*/
const siteNotes = {
    '6gf5gg': 'Clear cache through Section.io after pushing theme live'
};
const waitForEl = function (selector, callback) {
    let inter = setInterval(() => {
        if (document.querySelector(selector) != null) {
            callback();
            clearInterval(inter);
        }
    }, 50);
};
let scriptAutoUrl = window.location.href;
//Collapse admin bar
if (scriptAutoUrl.includes('ctk=')) {
    waitForEl('.adminBar-close', () => {
        document.querySelector('.adminBar-close').click();
    });
}
//Remove shopify front end admin bar
if (document.querySelector('#admin-bar-iframe')) {
    document.querySelector('#admin-bar-iframe').remove();
}
//Themes Quicklink
if (scriptAutoUrl.includes('.mybigcommerce.com/manage')) {
    waitForEl('.cp-nav-header-items', () => {
        let theme = document.querySelector('.cp-nav-link[href*="/manage/storefront-manager/my-themes"]') != null;
        let link = theme ?
            '/manage/storefront-manager/my-themes' :
            '/manage/channel/1/my-themes';
        const bcNavList = document.querySelector('.cp-nav-header-items');
        bcNavList.insertAdjacentHTML('beforeend', `
            <div class="cp-nav-header-link" style="position: relative;">
                <style>.cp-nav-item:hover + a { color: #fff; } .cp-nav-header-link a { color: #b7c6fe; } .cp-nav-header-link a:hover { color: #fff; } </style>
                <a class='cp-nav-item cp-nav-header-link' href='${link}'>
                    <div>
                        <svg id="icon-star" fill="currentColor" viewBox="0 0 35 32" width="24" style="margin-bottom: 2px;" class="base__StyledIcon-sc-a9u0e1-0 kIXSwy"><path d="M16.823 0l3.971 12.223h12.852l-10.397 7.554 3.971 12.223-10.397-7.554-10.397 7.554 3.971-12.223-10.397-7.554h12.852l3.971-12.223z"></path></svg>
                    </div>
                    <span>Themes</span>
                </a>
                <a style="position: absolute;right: 16px;height: 16px;" href='${link}' target="_blank" class="floating-icon"><svg fill="currentColor" aria-labelledby=":rp:" height="16" width="16" stroke="currentColor" stroke-width="0" viewBox="0 0 24 24" class="base__StyledIcon-sc-a9u0e1-0 fwbACG"><title id=":rp:">(Opens in new window)</title><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5a2 2 0 00-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1zM14 4c0 .55.45 1 1 1h2.59l-9.13 9.13a.996.996 0 101.41 1.41L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1z"></path></svg></a>
            </div>
        `);
        const webPagesBtn = document.querySelector('[href="/manage/content/pages"]');
        const catsBtn = document.querySelector('[href="/manage/products/categories"]');
        const footerContainer = document.querySelector('.cp-nav-footer');
        let pageCats = document.createElement('div');
        pageCats.setAttribute('class', 'bc-side-links');
        if (footerContainer) {
            webPagesBtn.classList.add('cp-nav-header-link');
            catsBtn.classList.add('cp-nav-header-link');
            pageCats.append(webPagesBtn);
            pageCats.append(catsBtn);
            footerContainer.prepend(pageCats);
            footerContainer.innerHTML += `
                <button type="button" id="change-store" class="cp-nav-link cp-nav-header-link">Change Store<div class="floating-icon animate"><svg aria-hidden="true" fill="currentColor" height="24" stroke="currentColor" stroke-width="0" viewBox="0 0 24 24" width="24" class="base__StyledIcon-sc-a9u0e1-0 cwFLOb"><path d="M0 0h24v24H0z" fill="none"></path><path d="m6.14 11.86-2.78 2.79c-.19.2-.19.51 0 .71l2.78 2.79c.31.32.85.09.85-.35V16H13c.55 0 1-.45 1-1s-.45-1-1-1H6.99v-1.79c0-.45-.54-.67-.85-.35m14.51-3.21-2.78-2.79c-.31-.32-.85-.09-.85.35V8H11c-.55 0-1 .45-1 1s.45 1 1 1h6.01v1.79c0 .45.54.67.85.35l2.78-2.79c.2-.19.2-.51.01-.7"></path></svg></div></button>
                <style>
                .bc-side-links {
                    display: flex;
                    justify-content: space-evenly; 
                    align-items: center;
                }
                .bc-side-links a {
                    text-align: center;
                    white-space: nowrap;
                    padding: 10px;
                }
                .bc-side-links a:first-child {
                    width: fit-content;
                    padding-left: 23px;
                }
                .bc-side-links span {
                    display: none;
                }
                </style>
            `;
            document.getElementById('change-store').addEventListener('click', function(){
                const changeBtn = document.querySelector('.cp-nav-container > div > ul[role=\'group\']:last-child > .cp-nav-link:last-child');
                console.log(changeBtn);
                changeBtn.click();
            });
            footerContainer.style.backgroundColor = '#273a8a';
            footerContainer.querySelector('#nav-help').style.background = 'none';
        }
    });
}
if (document.querySelector('preview-bar-iframe')) {
    document.querySelector('preview-bar-iframe').remove();
}
//Theme Notes
if (scriptAutoUrl.includes(`/my-themes`)) {
    for (var key in siteNotes) {
        if (siteNotes.hasOwnProperty(key)) {
            const val = siteNotes[key];
            if (scriptAutoUrl.includes(`store-${key}.mybigcommerce.com`)) {
                waitForEl('.cp-iframe', () => {
                    const containerEl = document.querySelector('.cp-iframe').parentNode;
                    containerEl.insertAdjacentHTML(
                        'beforeend',
                        `<style>
                        .theme-note {
                        position: fixed;
                        bottom: 8px;
                        left: 270px;
                        background: white;
                        padding: 10px 16px;
                        font-size: 16px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.36);
                        border-radius: 20px;
                        margin: 0;
                        }
                        .theme-note svg {
                        margin-right: 3px;
                        }
                        </style>
                        <p class="theme-note">
                            <svg height="24" viewBox="0 0 24 24" width="24" stroke="currentColor" fill="currentColor" stroke-width="0" class="base__StyledIcon-sc-a9u0e1-0 glrOAV sc-AxheI eXzlnr"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1-8h-2V7h2v2z"></path></svg>
                            <span>${val}</span>
                        </p>`
                    );
                });
            }
        }
    }
}
