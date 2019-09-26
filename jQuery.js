const myjQuery = function (value) {
    let listOfElements = [];

    if (value instanceof HTMLElement) {
        listOfElements.push(value);
    } else if (value.match(/<[^<>]+/)) {
        const newNode = value.match(/[^<>]+/);
        listOfElements.push(document.createElement(newNode));
        document.body.appendChild(listOfElements[0]);
    } else {
        listOfElements = document.querySelectorAll(value);
    }

    return {
        _element() {
            return listOfElements[0];
        },
        addClass(className) {
            [].forEach.call(listOfElements, element => {
                element.classList.add(className);
            });

            return this;
        },
        removeClass(className) {
            [].forEach.call(listOfElements, element => {
                element.classList.remove(className)
            });

            return this;
        },
        append(data) {
            let insert = data;

            if (data._element && typeof data._element === "function") {
                insert = data._element();
            } else if (data.match(/<[^<>]+/)) {
                const newNode = data.match(/[^<>]+/);
                const content = data.match(/<([\w]+)[^>]*>(.*?)<\/\1>/);
                const newElement = document.createElement(newNode);
                newElement.innerHTML = content[0];
                insert = newElement;
            }

            [].forEach.call(listOfElements, element => {
                element.append(insert);
            });

            return this;
        },
        remove(elementName) {
            if (elementName == null) {
                [].forEach.call(listOfElements, element => {
                    element.remove()});
            } else {
                [].forEach.call(listOfElements, element => {
                    const elementsToRemove = element.querySelectorAll(elementName);
                    [].forEach.call(listOfElements, element => {
                        element.remove();
                    });
                });
            }

            return this;
        },
        text(content) {
            if (content == null) {
                let commonValue = "";
        
                [].forEach.call(listOfElements, element => {
                    commonValue = commonValue + element.innerHTML;
                });
                return commonValue;
            }

            [].forEach.call(listOfElements, element => {
                element.innerHTML = content;
            });

            return this;
        },
        attr(attribute, valueAttribute) {
            if (valueAttribute == null) {
                return listOfElements[0].getAttribute(attribute);
            }

            listOfElements[0].setAttribute(attribute, valueAttribute);

            return this;
        },
        children() {
            const childNode = [];

            [].forEach.call(listOfElements, element => {
                const children = element.childNodes;
                [].forEach.call(children, child => {
                    if (child.nodeName != "#text") {
                        childNode.push(child);
                    }
                });
            });

            listOfElements = childNode;

            return this;
        },
        empty() {
            [].forEach.call(listOfElements, element => {
                element.innerHTML = "";
            });

            return this;
        },
        css(property, valueProperty) {
            if (valueProperty != null) {
                [].forEach.call(listOfElements, element => {
                    const style = window.getComputedStyle(element);
                    element.style.setProperty(property, valueProperty);
                });
            } else {
                const arrayOfProperties = [].map.call(listOfElements, () => {
                    const style = window.getComputedStyle(listOfElements[0]);
                    return style.getPropertyValue(property);
                });

                return arrayOfProperties;
            }

            return this;
        },
        click(handler) {
            [].forEach.call(listOfElements, (element) => {
                element.addEventListener("click", handler, false);
            });

            return this;
        },
        each(callback) {
            [].forEach.call(listOfElements, (element) => {
                callback.call(element);
            });

            return this;
        },
        toggle() {
            [].forEach.call(listOfElements, (element) => {
                if (element.hidden) {
                    element.hidden = false;
                } else {
                    element.hidden = true;
                }
            });

            return this;
        },
        wrap(wrappingElement) {
            const parent = listOfElements[0].parentNode;
            const newNode = wrappingElement.match(/[^<>]+/);

            [].forEach.call(listOfElements, element => {
                const newElement = document.createElement(newNode);
                parent.insertBefore(newElement, element);
                newElement.appendChild(element);
            });

            return this;
        },
    };
};
