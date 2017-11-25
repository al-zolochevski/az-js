/**
 * @param {Element} element
*/
function remove(element) {
    element.parentNode.removeChild(element);
}

/**
 * @param {Element} element
 * @param {Element} wrapper
 */
function wrap(element, wrapper) {
    var parent = element.parentNode;
    parent.insertBefore(wrapper, element);
    wrapper.appendChild(element);
}

/**
 * @param {string} tagName
 * @param {string[]} classNames
 * @return {Element}
 */
function create(tagName, classNames) {
    var element = document.createElement(tagName);
    classNames.forEach(function (className) {
        element.classList.add(className);
    });
    return element;
}

/**
 * @param {Element} target
 * @param {Element} wrapper
 */
function unwrap(target, wrapper) {
    // TODO: insertBefore(target, wrapper)
    var parent = wrapper.parentNode;
    parent.insertBefore(target, wrapper);

    // TODO: hide(target)
    target.style.display = "none";
    remove(wrapper);
}
