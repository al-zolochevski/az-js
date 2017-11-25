window.az = {
    /**
     * @param {Element} element
    */
    remove: function (element) {
        element.parentNode.removeChild(element);
    },

    /**
     * @param {Element} element
     * @param {Element} wrapper
     */
    wrap: function(element, wrapper) {
        var parent = element.parentNode;
        parent.insertBefore(wrapper, element);
        wrapper.appendChild(element);
    },

    /**
     * @param {string} tagName
     * @param {string[]} classNames
     * @return {Element}
     */
    create: function(tagName, classNames) {
        var element = document.createElement(tagName);
        classNames.forEach(function (className){
            element.classList.add(className);
        });
        return element;
    },

    /**
     * @param {Element} target
     * @param {Element} wrapper
     */
    unwrap: function(target, wrapper) {
        // TODO: insertBefore(target, wrapper)
        var parent = wrapper.parentNode;
        parent.insertBefore(target, wrapper);

        // TODO: hide(target)
        target.style.display = "none";
        az.remove(wrapper);
    }
};
