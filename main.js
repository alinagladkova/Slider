"use strict";

const feedback = [
  {
    avatar: "92.png",
    name: "Anna Johnson",
    position: "Web designer",
    feedback:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio corporis culpa magni expedita reiciendis odio omnis totam nesciunt blanditiis incidunt? Nobis delectus exercitationem sequi quos!",
  },
  {
    avatar: "87.png",
    name: "Jack Jackovich",
    position: "Web designer",
    feedback: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio corporis culpa magni expedita reiciendis.",
  },
  {
    avatar: "32.png",
    name: "Ivan Ivanovich",
    position: "DevOps",
    feedback:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio corporis culpa magni expedita reiciendis odio omnis totam nesciunt blanditiis incidunt?",
  },
];

function createElement(html) {
  const root = document.createElement("div");
  root.insertAdjacentHTML("beforeend", html);
  return root.firstElementChild;
}

class Slider {
  _element = null;
  _subElements = {};

  _state = {
    targetSlide: 0,
  };

  constructor(feedback, SliderItem) {
    this._feedback = feedback;
    this._SliderItem = SliderItem;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._addListeners();
    this._render();
  }

  _addListeners() {
    this._subElements.btnPrev.addEventListener("click", this._clickPrev.bind(this));
    this._subElements.btnNext.addEventListener("click", this._clickNext.bind(this));
  }

  _isNext() {
    return this._generateSlides().length > this._state.targetSlide + 1;
  }

  _isPrev() {
    return this._state.targetSlide > 0;
  }

  _clickPrev() {
    if (this._isPrev()) {
      this._state.targetSlide -= 1;
      this._update();
    }
  }

  _clickNext() {
    if (this._isNext()) {
      this._state.targetSlide += 1;
      this._update();
    }
  }

  _update() {
    this._render();
  }

  _generateSlides() {
    return this._feedback.map((person, i) => {
      return new this._SliderItem(person, i, this._state.targetSlide).element;
    });
  }

  _render() {
    this._subElements.wrapper.innerHTML = "";
    this._subElements.wrapper.append(...this._generateSlides());

    !this._isNext() ? this._subElements.btnNext.setAttribute("disabled", true) : this._subElements.btnNext.removeAttribute("disabled");
    !this._isPrev() ? this._subElements.btnPrev.setAttribute("disabled", true) : this._subElements.btnPrev.removeAttribute("disabled");
  }

  _getTemplate() {
    return `<div class="slider">
      <div class="slider__wrapper" data-element='wrapper'></div>
      <div class="slider__control">
        <button class="btn slider__prev" data-element="btnPrev">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <button class="btn slider__next" data-element="btnNext">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>`;
  }

  get element() {
    return this._element;
  }

  _getSubElements() {
    return Array.from(this._element.querySelectorAll("[data-element]")).reduce((acc, el) => {
      return {
        ...acc,
        [el.getAttribute("data-element")]: el,
      };
    }, {});
  }
}

class SliderItem {
  _element = null;
  _subElements = {};

  constructor({ avatar, name, position, feedback }, i, targetSlide) {
    this._avatar = avatar;
    this._name = name;
    this._position = position;
    this._feedback = feedback;
    this._i = i;
    this._targetSlide = targetSlide;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._render();
  }

  _render() {
    this._element.style.left = `${this._i * 100}%`;
    this._element.style.transform = `translateX(${this._targetSlide * -100}%)`;
    // this._element.style.transitionDuration = "0.5s";
  }

  _getTemplate() {
    return `<div class="slider__item">
          		<img src="img/${this._avatar}" alt="img" class="slider__image" />
          		<h3 class="slider__title">${this._name}</h3>
          		<div class="slider__subtitle">${this._position}</div>
          		<p class="slider__text">${this._feedback}</p>
						</div>`;
  }

  get element() {
    return this._element;
  }

  _getSubElements() {
    return Array.from(this._element.querySelectorAll("[data-element]")).reduce((el, acc) => {
      return {
        ...acc,
        [el.getAttribute("data-element")]: el,
      };
    }, {});
  }
}

const root = document.querySelector(".root");

root.insertAdjacentElement("afterbegin", new Slider(feedback, SliderItem).element);
