/**
 * @param {Element|String} argument
*/
window.z = function (argument) {
    var element;

    if (typeof(argument) === 'string' ) {
        element = document.querySelector(argument);
    } else if (typeof(argument) === 'object' && argument instanceof Element) {
        element = argument;
    } else {
        throw new TypeError('argument should be CSS selector or DOM element. You passed ' + argument);
    }

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
            z(wrapper).remove();
        }
    };
};

/**
 * @param {string} tagName
 * @param {string[]} classNames
 * @return {Element}
 */
window.z.create = function(tagName, classNames) {
    var element = document.createElement(tagName);
    classNames.forEach(function (className){
        element.classList.add(className);
    });
    return element;
};