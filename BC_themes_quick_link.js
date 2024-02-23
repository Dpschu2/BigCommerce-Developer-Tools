/*
Author: Dean Schulz
Installation: 
    1. Install ScriptAutoRunner Chrome Extension
    2. Add the following script
Description: Adds themes quick link to the BigCommerce backend sidebar and collapses top bar automatically.
*/
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
const url = window.location.href;
if (url.includes('.mybigcommerce.com/manage')) {
    waitForElm('.cp-nav-header-items').then((elm) => {
        let div = document.createElement('div');    
        let theme = document.querySelectorAll('.cp-nav-link[href*="/manage/storefront-manager/my-themes"]').length;
        let link = (theme ? '/manage/storefront-manager/my-themes' : '/manage/channel/1/my-themes');
        div.innerHTML += `
            <div class="cp-nav-header-link" style="position: relative;">
                <a class='cp-nav-item cp-nav-header-link' href='${link}'><div><svg id="icon-star" viewBox="0 0 35 32" width="24" style="margin-bottom: 2px;" class="base__StyledIcon-sc-a9u0e1-0 kIXSwy" fill="#c6b7fe">
                    <path d="M16.823 0l3.971 12.223h12.852l-10.397 7.554 3.971 12.223-10.397-7.554-10.397 7.554 3.971-12.223-10.397-7.554h12.852l3.971-12.223z"></path>
                    </svg></div><span>Themes</span></a>
                <a style="position: absolute;right: 16px;top: 10px;" href='${link}' target="_blank" class="floating-icon"><svg aria-labelledby=":rp:" fill="#c6b7fe" height="24" stroke="currentColor" stroke-width="0" viewBox="0 0 24 24" width="24" class="base__StyledIcon-sc-a9u0e1-0 fwbACG"><title id=":rp:">(Opens in new window)</title><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5a2 2 0 00-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1zM14 4c0 .55.45 1 1 1h2.59l-9.13 9.13a.996.996 0 101.41 1.41L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1z"></path></svg></a>
            </div>
        `;
        elm.appendChild(div);
    });  
}
if (url.includes('?ctk=')) {
    waitForElm('.adminBar-close').then((elm) => {
        elm.click();
    });
}