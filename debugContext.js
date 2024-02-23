/* 
Author: Dean Schulz
Installation:
    1. right click bookmarks bar
    2. add page
    3. replace url with the following:
Description:
    If on Bigcommerce local environment page: opens context debug page in new window
    If already on debug page: opens the finder dialog
*/
javascript: (() => { if (!window.location.href.includes("debug=context")) { window.open(window.location.href + (window.location.href.includes('?') ? "&" : "?") + "debug=context", "_blank").focus(); } else { const entries = document.querySelectorAll('#jsonFormatterParsed > .entry > .blockInner > .entry > .k'); let props = []; let page_type = JSON.parse(document.querySelector('#jsonFormatterRaw pre').innerHTML).page_type; let defaultInput = (['product', 'category'].includes(page_type) ? page_type : ''); entries.forEach((entry, ind) => props.push(`[${entry.textContent}]`)); const property = prompt(`Lookup property: (press <enter> to collapse all)\n\n${props.join('  ')}`, defaultInput); entries.forEach((entry, ind) => { if (property == '') { entry.parentElement.classList.add('collapsed'); } else if (property) { if (entry.textContent == property) { entry.parentElement.classList.remove('collapsed'); const innerObjects = entry.parentElement.querySelectorAll('& > .blockInner > .entry'); if (innerObjects) { innerObjects.forEach((obj, ind) => { if (obj.querySelector('& > .blockInner')) { obj.classList.add('collapsed'); } }); } entry.scrollIntoView(); } else { entry.parentElement.classList.add('collapsed'); } } }); } })()