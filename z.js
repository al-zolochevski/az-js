/**
 * @param {Element|String} argument
*/
window.z = function (argument) {
    var elements;

    if (typeof(argument) === 'string' ) {
        elements = document.querySelectorAll(argument);
    } else if (typeof(argument) === 'object' && argument instanceof Element) {
        elements = [argument];
    } else {
        throw new TypeError('argument should be CSS selector or DOM element. You passed ' + argument);
    }

    return {
        remove: function () {
            elements.forEach(function (element) {
                element.parentNode.removeChild(element);
            });
        },

        show: function () {
            elements.forEach(function (element) {
                element.style.display = "block";
            });
        },

        /**
         * @param {Element} wrapper
         */
        wrap: function(wrapper) {
            elements.forEach(function (element) {
                var parent = element.parentNode;
                parent.insertBefore(wrapper, element);
                wrapper.appendChild(element);
            });
        },

        /**
         * @param {Element} wrapper
         */
        unwrap: function(wrapper) {
            elements.forEach(function (element) {
                // TODO: insertBefore(element, wrapper)
                var parent = wrapper.parentNode;
                parent.insertBefore(element, wrapper);

                // TODO: hide(element)
                element.style.display = "none";
                z(wrapper).remove();
            });
        },

        /**
         * @param {String} eventType
         * @param {Function} listener
         */
        on: function (eventType, listener) {
            elements.forEach(function (element) {
                element.addEventListener(eventType, listener)
            });
        },

        /**
         * @return {Boolean}
         */
        isOnScreen: function() {
            var rect = elements[0].getBoundingClientRect();
            return (rect.top >= 0) && (rect.bottom <= window.innerHeight);
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