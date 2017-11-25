/**
 * @param {Element} element
*/
window.az = function (element) {
    return {
        remove: function () {
            element.parentNode.removeChild(element);
        },

        /**
         * @param {Element} wrapper
         */
        wrap: function(wrapper) {
            var parent = element.parentNode;
            parent.insertBefore(wrapper, element);
            wrapper.appendChild(element);
        },

        /**
         * @param {Element} wrapper
         */
        unwrap: function(wrapper) {
            // TODO: insertBefore(element, wrapper)
            var parent = wrapper.parentNode;
            parent.insertBefore(element, wrapper);

            // TODO: hide(element)
            element.style.display = "none";
            az(wrapper).remove();
        }
    };
};

/**
 * @param {string} tagName
 * @param {string[]} classNames
 * @return {Element}
 */
window.az.create = function(tagName, classNames) {
    var element = document.createElement(tagName);
    classNames.forEach(function (className){
        element.classList.add(className);
    });
    return element;
};