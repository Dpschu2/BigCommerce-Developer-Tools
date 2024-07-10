/*
Author: Dean Schulz
Installation: 
    1. Install ScriptAutoRunner Chrome Extension
    2. Add the following script
Features:
    -Adds Themes quick link to sidebar
    -Collapses front end admin bar by default
    -siteNotes - Adds custom info message to themes page 
*/

const siteNotes = {
    '6g3rgg': 'Clear cache through Section.io after pushing theme live'
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
if (scriptAutoUrl.includes('-dev.myshopify.com')) {
    waitForEl('#preview-bar-iframe', () => {
        document.querySelector('#preview-bar-iframe').remove();
    });
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
                <a style="position: absolute;right: 16px;top: 10px;" href='${link}' target="_blank" class="floating-icon"><svg fill="currentColor" aria-labelledby=":rp:" height="24" stroke="currentColor" stroke-width="0" viewBox="0 0 24 24" width="24" class="base__StyledIcon-sc-a9u0e1-0 fwbACG"><title id=":rp:">(Opens in new window)</title><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5a2 2 0 00-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1zM14 4c0 .55.45 1 1 1h2.59l-9.13 9.13a.996.996 0 101.41 1.41L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1z"></path></svg></a>
            </div>
        `);
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
                        right: 10px;
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
document.querySelectorAll('video').forEach(video => video.pause());