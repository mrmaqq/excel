class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector;
  }
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML().trim();
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (Element.prototype.append) {
      if (node instanceof Dom) {
        node = node.$el;
      }
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  style(obj = {}) {
    for (const [key, value] of Object.entries(obj)) {
      this.$el.style[key] = value;
    }
  }

  dataset(val) {
    if (!val) return this.$el.dataset;
    return this.$el.dataset[val];
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    const elements = this.$el.querySelectorAll(selector);
    const instances = [];
    elements.forEach(element => instances.push($(element)));
    return instances;
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  const instance = $(el);
  if (classes) {
    instance.addClass(classes);
  }
  return instance;
};
