export class Carousel {
  constructor(previous, next, listCharacters, navigation) {
    this.previous = document.querySelector(previous);
    this.next = document.querySelector(next);
    this.listCharacters = document.querySelector(listCharacters);
    this.navigation = document.querySelector(navigation);

    this.slides = this.getListSlides();
    this.indicators = this.getListIndicators();
    this.widthSlide = this.getWidthSlide();

    this.currentSlide = 0;

    this.next.addEventListener('click', this.nextSlide.bind(this));
    this.previous.addEventListener('click', this.previousSlide.bind(this));
    this.navigation.addEventListener('click', this.navigationToSlide.bind(this));


    this.initPositionSlide();
    console.log(this.getWidthSlide())
  }

  /**
   * Este método returna uma lista de slides
   */
  getListSlides() {
    return Array.from(this.listCharacters.children);
  }

  /**
   * Este método returna uma lista de indicadores dos slide
   */
  getListIndicators() {
    return Array.from(this.navigation.children);
  }

  /**
   * Este método retorna o tamanho do slide
   */
  getWidthSlide() {
    return this.slides[0].getBoundingClientRect().width;
  }

  /**
   * Este método retorna o slide atual
   */
  getCurrentSlide() {
    return this.slides[this.currentSlide];
  }

  /**
   * Este método retorna o índice atual
   */
  getCurrentIndex() {
    return this.indicators[this.currentSlide]
  }

  /**
   * Este método muda para a proxima posição
   */
  nextSlide() {
    let nextPosition = this.currentSlide + 1;
    if (nextPosition > this.slides.length - 1) {
      nextPosition = 0;
    }

    this.updatePosition(nextPosition);
  }

  /**
   * Este método muda para a posição anterior
   */
  previousSlide() {
    let previousPosition = this.currentSlide - 1
    if (previousPosition < 0) {
      previousPosition = this.slides.length - 1;
    }

    this.updatePosition(previousPosition);
  }

  /**
   * Este método atualiza a posição atual com a nova posição
   * @param position nova posição
   */
  updatePosition(position) {
    const currentIndex = this.getCurrentIndex();
    this.currentSlide = position;
    const selectedIndex = this.getCurrentIndex();

    this.scrollToNewSlide(this.getCurrentSlide());

    this.updateIndicators(currentIndex, selectedIndex);
  }

  /**
   * Este método atualiza os indicares para mostrar qual está selecionado
   * @param currentIndicator indicador atual
   * @param selectedIndicator indicador selecionado
   */
  updateIndicators(currentIndicator, selectedIndicator) {
    currentIndicator.classList.remove('carousel-indicator-active');
    selectedIndicator.classList.add('carousel-indicator-active');
  }

  /**
   * Este método paga a lista de slides e atualiza a posição para o slide selecionado
   * @param slideSelected novo slide
   */
  scrollToNewSlide(slideSelected) {
    this.listCharacters.style.transform = 'translateX(-' + slideSelected.style.left + ')';
  }

  navigationToSlide(event) {
    if (event.target === event.currentTarget) return

    this.updatePosition(parseInt(event.target.getAttribute('data-indicator')))
  }

  /**
   * Este método define as posições de cada slide, um do lado do outro
   */
  initPositionSlide() {
    this.slides.forEach((slide, i) => {
      slide.style.left = `${this.widthSlide * i}px`
    })
  }
}
