document.addEventListener('DOMContentLoaded', () => {

    //burger
    const burger = document.querySelector('.header__burger'),
          menu = document.querySelector('.header__menu')

    burger.addEventListener('click', () => {
        burger.classList.toggle('header__burger--active')
        if (burger.classList.contains('header__burger--active')) {
            menu.style.maxHeight = menu.scrollHeight + 'px'
        } else {
            menu.style.maxHeight = 0
        }
    })

    //faq
    const tabs = document.querySelectorAll('.faq__item')
    const tabsTriggers = document.querySelectorAll('.faq__item__title')
    const tabsContents = document.querySelectorAll('.faq__item__content')

    tabsTriggers.forEach((trigger, triggerIndex, array) => {
        trigger.addEventListener('click', () => {
            tabs[triggerIndex].classList.toggle('faq__item--active')
            if (tabs[triggerIndex].classList.contains('faq__item--active')) {
                tabsContents[triggerIndex].style.height= tabsContents[triggerIndex].scrollHeight + 'px'
            } else {
                tabsContents[triggerIndex].style = ''
            }
        })
    })

    //slider
    function slider(window, field, cards, margin, dotsWrap, dotClass, dotClassActive, arrowPrev, arrowNext, arrowClass) {
        const window_ = document.querySelector(window),
            field_ = document.querySelector(field),
            cards_ = document.querySelectorAll(cards),
            arrowPrev_ = document.querySelector(arrowPrev),
            arrowNext_ = document.querySelector(arrowNext);

        const cardWidth = document.querySelector(cards).scrollWidth
        console.log(cardWidth);

        let startPoint,
            swipeAction,
            endPoint,
            sliderCounter = 0,
            dots_ = [];

        // Устанавливаем фиксированную ширину поля слайдов

        field_.style.width = `${cardWidth * cards_.length + (margin * (cards_.length - 1))}px`;
        field_.style.marginLeft = 'auto';
        field_.style.marginRight = 'auto';
        field_.style.display = 'flex';

        // Слайд следующий

        function slideNext() {
            sliderCounter++;
            arrowNext_.classList.remove(arrowClass);
            arrowPrev_.classList.remove(arrowClass);
            if (sliderCounter >= cards_.length) {
                sliderCounter = cards_.length - 1;
            }
            if ((sliderCounter + 1) == cards_.length) {
                arrowNext_.classList.add(arrowClass);
            }
            if (dotsWrap) {
                dots_.forEach((item, index)=> {
                item.classList.remove(dotClassActive);
                if (index == sliderCounter) {
                    item.classList.add(dotClassActive);
                }
                });
            }
            field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
            if (sliderName_) {
                slideName ();
            }
        }

        // Слайд предыдущий

        function slidePrev() {
            sliderCounter--;
            arrowNext_.classList.remove(arrowClass);
            arrowPrev_.classList.remove(arrowClass);
            if (sliderCounter <= 0) {
                sliderCounter = 0;
            }
            if (sliderCounter == 0) {
                arrowPrev_.classList.add(arrowClass);
            }
            if (dotsWrap) {
                dots_.forEach((item, index)=> {
                    item.classList.remove(dotClassActive);
                    if (index == sliderCounter) {
                        item.classList.add(dotClassActive);
                    }
                });
            }
            field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
            if (sliderName_) {
                slideName ();
            }
        }

        // Рендер точек

        if (dotsWrap) {
            const dotsWrap_ = document.querySelector(dotsWrap);

            cards_.forEach(() => {
                const dot = document.createElement('div');
                dot.classList.add(dotClass);
                dotsWrap_.appendChild(dot);
                dots_.push(dot);
            });
            dots_[0].classList.add(dotClassActive);
            dots_.forEach((item, index) => {
                item.addEventListener('click', () => {
                sliderCounter = index;
                arrowNext_.classList.remove(arrowClass);
                arrowPrev_.classList.remove(arrowClass);
                if (sliderCounter == 0) {
                    arrowPrev_.classList.add(arrowClass);
                }
                if ((sliderCounter + 1) == cards_.length) {
                    arrowNext_.classList.add(arrowClass);
                }
                dots_.forEach(item_ => {
                    item_.classList.remove(dotClassActive);
                });
                item.classList.add(dotClassActive);
                field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
                });
            });
        }

        // Переключение на стрелки

        arrowPrev_.addEventListener('click', () => {
            slidePrev();
        });

        arrowNext_.addEventListener('click', () => {
            slideNext();
        });

        // Свайп слайдов тач-событиями

        window_.addEventListener('touchstart', (e) => {
            startPoint = e.changedTouches[0].pageX;
        });

        window_.addEventListener('touchmove', (e) => {
            swipeAction = e.changedTouches[0].pageX - startPoint;
            field_.style.transform = `translateX(${swipeAction + (-(cardWidth + margin) * sliderCounter)}px)`;
        });

        window_.addEventListener('touchend', (e) => {
            endPoint = e.changedTouches[0].pageX;
            if (Math.abs(startPoint - endPoint) > 50) {
                arrowNext_.classList.remove(arrowClass);
                arrowPrev_.classList.remove(arrowClass);
                if (endPoint < startPoint) {
                    slideNext();
                } else {
                    slidePrev();
                }
            } else {
                field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
            }
        });
    }
    slider(
        '.slider__window',
        '.slider__field',
        '.slider__card',
        0
    );
    // slider(
    //     '.works__window',
    //     '.works__content__field',
    //     '.works__box--mobile',
    //     280,
    //     20,
    //     false,
    //     false,
    //     false,
    //     '.works__slider__button--prev--mobile',
    //     '.works__slider__button--next--mobile',
    //     'works__slider__button--inactive',
    //     '[data-worksSliderName]',
    //     '[data-worksSliderSlideName]'
    // );
})