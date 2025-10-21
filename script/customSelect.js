function executeCodeWithEval(code) {
    try {
        return eval(code);
    } catch (error) {
        console.error('执行代码时出错:', error);
        return null;
    }
}
class SelectCustom {
    getValue() {
        return this.select.querySelector(".selected-text").dataset.value;
    }
    constructor(selectCssChoose) {
        var arr = [];
        var outDiv = document.querySelector(selectCssChoose);
        this.select = outDiv;
        var select = outDiv.querySelector('select');
        var options = select.querySelectorAll('option');
        var div = document.createElement('div');
        var selectBtn = div.querySelector('.select-btn');
        options.forEach(option => {
            arr.push({ value: option.value, color: option.dataset.color, backgroundColor: option.dataset.backgroundColor, html: option.innerHTML, des: option.dataset.tippyContent, click: option.dataset.click, style: option.style });
        });
        if (select.dataset.init !== undefined) {
            this.InitFunction = select.dataset.init;
        }
        executeCodeWithEval(this.InitFunction);
        select.remove();
        outDiv.classList.add('select');
        div.classList.add('custom-select');
        div.innerHTML = `<div class="select-btn">
                                    <span class="selected-text">${arr[0].html}</span>
                                    <svg class="arrow-icon" aria-hidden="true" focusable="false" data-prefix="far" data-icon="angle-down"
                                        role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor"
                                            d="M241 369c-9.4 9.4-24.6 9.4-33.9 0L47 209c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l143 143L367 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L241 369z">
                                        </path>
                                    </svg>
                                </div>`;
        var selectText = div.querySelector(".selected-text");
        if (arr[0].style.length) {
            selectText.style = arr[0].style;
        }
        if (arr[0].value !== undefined) {
            selectText.dataset.value = arr[0].value;
        }
        if (arr[0].color !== undefined) {
            selectText.style.color = arr[0].color;
        }
        if (arr[0].backgroundColor !== undefined) {
            selectBtn.style.backgroundColor = arr[0].backgroundColor;
        }
        if (arr[0].click !== undefined) {
            executeCodeWithEval(arr[0].click);
        }
        var OptionsContainer = document.createElement('div');
        OptionsContainer.classList.add('options-container');
        arr.forEach(option => {
            var optionDiv = document.createElement('div');
            optionDiv.classList.add('option');
            if (option.value !== undefined) {
                optionDiv.dataset.value = option.value;
            }
            if (option.color !== undefined) {
                optionDiv.style.color = option.color;
            }
            if (option.backgroundColor !== undefined) {
                optionDiv.style.backgroundColor = option.backgroundColor;
            }
            if (option.des !== undefined) {
                optionDiv.dataset.tippyContent = option.des;
            }
            if (option.click !== undefined) {
                optionDiv.dataset.click = option.click;
            }
            if (option.style.length) {
                optionDiv.style = option.style;
            }
            optionDiv.innerHTML = option.html;
            OptionsContainer.appendChild(optionDiv);
        });
        div.appendChild(OptionsContainer);
        outDiv.appendChild(div);
        const CS = this;
        document.addEventListener('DOMContentLoaded', function () {
            const customSelects = document.querySelectorAll('.custom-select');
            let currentOpenSelect = null;
            customSelects.forEach(select => {
                const selectBtn = select.querySelector('.select-btn');
                const optionsContainer = select.querySelector('.options-container');
                const options = select.querySelectorAll('.option');
                const selectedText = select.querySelector('.selected-text');
                const arrowIcon = select.querySelector('.arrow-icon');
                options.forEach(item => {
                    item.style.color = item.dataset.color;
                });
                selectBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    if (optionsContainer.classList.contains('open')) {
                        optionsContainer.classList.remove('open');
                        arrowIcon.classList.remove('open');
                        document.body.classList.remove('no-scroll');
                        currentOpenSelect = null;
                        return;
                    }
                    document.querySelectorAll('.options-container.open').forEach(container => {
                        container.classList.remove('open');
                        container.previousElementSibling.querySelector('.arrow-icon').classList.remove('open');
                    });
                    const selectRect = selectBtn.getBoundingClientRect();
                    const spaceBelow = window.innerHeight - selectRect.bottom;
                    const spaceAbove = selectRect.top;
                    if (spaceBelow < 250 && spaceAbove >= 250) {
                        optionsContainer.classList.add('upward');
                        optionsContainer.classList.remove('downward');
                    } else {
                        optionsContainer.classList.add('downward');
                        optionsContainer.classList.remove('upward');
                    }
                    optionsContainer.classList.add('open');
                    arrowIcon.classList.add('open');
                    document.body.classList.add('no-scroll');
                    currentOpenSelect = select;
                });
                options.forEach(option => {
                    option.addEventListener('click', function () {
                        executeCodeWithEval(CS.InitFunction);
                        if (this.dataset.click !== undefined) {
                            executeCodeWithEval(this.dataset.click);
                        }
                        const value = this.dataset.value;
                        const text = this.textContent;
                        selectedText.textContent = text;
                        if (this.style.color !== undefined) {
                            selectedText.style.color = this.style.color;
                        } else {
                            selectedText.style.removeProperty('color');
                        }
                        if (this.style.backgroundColor !== undefined) {
                            selectBtn.style.backgroundColor = this.style.backgroundColor;
                        } else {
                            selectBtn.style.removeProperty('background-color');
                        }
                        selectedText.dataset.value = value;
                        optionsContainer.classList.remove('open');
                        arrowIcon.classList.remove('open');
                        document.body.classList.remove('no-scroll');
                        currentOpenSelect = null;
                    });
                });
            });
            document.addEventListener('click', function (e) {
                if (currentOpenSelect && !currentOpenSelect.contains(e.target)) {
                    const optionsContainer = currentOpenSelect.querySelector('.options-container');
                    const arrowIcon = currentOpenSelect.querySelector('.arrow-icon');
                    optionsContainer.classList.remove('open');
                    arrowIcon.classList.remove('open');
                    document.body.classList.remove('no-scroll');
                    currentOpenSelect = null;
                }
            });
            document.querySelectorAll('.options-container').forEach(container => {
                container.addEventListener('wheel', function (e) {
                    e.stopPropagation();
                }, { passive: true });
            });
        });
    }
}