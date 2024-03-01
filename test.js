class Choice extends BasicComponent {
  _state = {
    active: false,
    activeItem: 1,
  };

  constructor({ title, data }, ChoiceItem, callback) {
    super();
    this._title = title;
    this._data = data;
    this.ChoiceItem = ChoiceItem;
    this._callback = callback;
    this._init();
  }

  _init() {
    super._init();
    this._addListeners();
  }

  _addListeners() {
    this._subElements.btn.addEventListener("click", () => {
      this._setStateActive();
      this._render();
    });
  }

  _render() {
    // в рендере мы рисуем на основании состояния
    if (this._state.active) {
      this._subElements.list.classList.add("choice__list--active");
    } else {
      this._subElements.list.classList.remove("choice__list--active");
    }
    // когда будем на react, там чистка будет автоматически
    this._subElements.list.innerHTML = ""; //стираем и рисуем заново
    this._subElements.list.append(...this._generateItems());
  }

  _setStateActive() {
    this._state.active = !this._state.active;
  }

  _setStateActiveItem(id) {
    this._state.activeItem = id;
    this._callback(id);
    // после изменения состояния, надо обяательно перерисовать компонент с новым состоянием (эта операцию будет автоматизирована react)
    this._render();
  }

  _generateItems() {
    // при создании ChoiceItem мы должны указать каждому активный он или нет
    return this._data.map((item) => {
      if (this._state.activeItem === item.id) {
        // мы узнали что этот ChoiceItem надо рисовать активным
        return new this.ChoiceItem({ ...item, active: true }, this._setStateActiveItem.bind(this)).element;
      }
      return new this.ChoiceItem({ ...item, active: false }, this._setStateActiveItem.bind(this)).element;
    });
  }

  _getTemplate() {
    return `
						<div class="choice">
							<button class="btn choice__btn" data-element="btn">${this._title}</button>
							<ul class="choice__list" data-element="list"></ul>
						</div>`;
  }
}

class ChoiceItem extends BasicComponent {
  constructor({ id, text, unit, active }, callback) {
    super();
    this._id = id;
    this._text = text;
    this._unit = unit;
    this._active = active;
    this._callback = callback;
    this._init();
  }

  _init() {
    super._init();
    this._addListeners();
  }

  _addListeners() {
    this._element.addEventListener("click", (e) => {
      this._callback(+e.target.getAttribute("data-key"));
    });
  }

  _getTemplate() {
    return `<li class="choice-item ${this._active ? "choice-item--active" : ""}" data-key=${this._id}>${this._text}${this._unit}</li>`;
  }
}
