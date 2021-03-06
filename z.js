/**
 * @param {Window|Element|String} argument
 */
window.z = function (argument) {
    var elements;

    if (typeof(argument) === 'string') {
        elements = document.querySelectorAll(argument);
    } else if ((argument instanceof Element) || (argument === window)) {
        elements = [argument];
    } else {
        throw new TypeError('argument should be CSS selector or DOM element. You passed ' + argument);
    }

    var result = {

        elements: elements,

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

        hide: function () {
            elements.forEach(function (element) {
                element.style.display = "none";
            });
        },

        /**
         * @param {Element} wrapper
         */
        wrap: function (wrapper) {
            elements.forEach(function (element) {
                var parent = element.parentNode;
                parent.insertBefore(wrapper, element);
                wrapper.appendChild(element);
            });
        },

        /**
         * @param {Element} wrapper
         */
        unwrap: function (wrapper) {
            elements.forEach(function (element) {
                // TODO: insertBefore(element, wrapper)
                var parent = wrapper.parentNode;
                parent.insertBefore(element, wrapper);

                z(element).hide();
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
        isOnScreen: function () {
            var rect = elements[0].getBoundingClientRect();
            return (rect.top >= 0) && (rect.bottom <= window.innerHeight);
        },

        /**
         * @return {Boolean}
         */
        isVisible: function () {
            return getComputedStyle(this.elements[0]).display  !== "none";
        },

        /**
         * @param {String} className
         */
        addClass: function (className) {
            elements.forEach(function (element) {
                element.classList.add(className);
            })
        },

        /**
         * @param {String} className
         */
        removeClass: function (className) {
            elements.forEach(function (element) {
                element.classList.remove(className);
            })
        }
    };

    for (var i = 0; i < elements.length; i++) {
        result[i] = elements[i];
    }

    return result;
};

/**
 * @param {string} tagName
 * @param {string[]} classNames
 * @return {Element}
 */
window.z.create = function (tagName, classNames) {
    var element = document.createElement(tagName);
    classNames.forEach(function (className) {
        element.classList.add(className);
    });
    return element;
};