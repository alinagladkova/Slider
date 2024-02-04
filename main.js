"use strict";

const feedback = [
  {
    avatar: "",
    name: "Anna Johnson",
    position: "Web designer",
    feedback:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio corporis culpa magni expedita reiciendis odio omnis totam nesciunt blanditiis incidunt? Nobis delectus exercitationem sequi quos!",
  },
  {
    avatar: "",
    name: "Jack Jackovich",
    position: "Web designer",
    feedback: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio corporis culpa magni expedita reiciendis.",
  },
  {
    avatar: "",
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

  constructor(feedback, SliderItem) {
    this._feedback = feedback;
    this._SliderItem = SliderItem;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._render();
  }

  _generateSlides() {
    return this._feedback.map((person) => {
      return new this._SliderItem(person).element;
    });
  }

  _render() {
    this._subElements.wrapper.innerHTML = "";
    this._subElements.wrapper.append(...this._generateSlides());
  }

  _getTemplate() {
    return `<div class="slider">
      <div class="slider__wrapper" data-element='wrapper'></div>
      <div class="slider__control">
        <button class="btn slider__prev" data="btn-prev">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <button class="btn slider__next" data="btn-next">
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

  constructor({ avatar, name, position, feedback }) {
    this._avatar = avatar;
    this._name = name;
    this._position = position;
    this._feedback = feedback;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
  }

  _getTemplate() {
    return `<div class="slider__item" data-element="slider-item">
          		<img src="img/2.svg.png" alt="img" class="slider__image" />
          		<h3 class="slider__title">${this._name}</h3>
          		<div class="slider__subtitle"></div>
          		<p class="slider__text"></p>
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
