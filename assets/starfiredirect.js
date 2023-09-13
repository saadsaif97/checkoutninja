class ProductOptions {
  constructor(uid, options) {
    this.uid = uid;
    this.options = options;
    this.productOptionsDiv = document.getElementById(this.uid);
    this.sortOptions()
  }

  slugify(text) {
    return text.toLowerCase().replace(/[^\w ]/g, "").replace(/ /g,"-");
  }

  sortOptions() {
    let entries = Object.entries(this.options).sort(
      (a, b) => a[1].frontend_sorting - b[1].frontend_sorting
    );
    this.sortedProductOptions = Object.fromEntries(entries);
  }

  renderAllOptions() {
    for (const category in this.sortedProductOptions) {
      let divElement = this.createOptionDiv(
        category,
        this.sortedProductOptions[category].options
      );
      this.productOptionsDiv.appendChild(divElement);
    }
  }

  createOptionDiv(category, optionValues) {
    let div = document.createElement("div");
    div.className = "product-form__input product-form__input--dropdown";

    let label = document.createElement("label");
    label.className = "form__label";
    label.setAttribute("for", `option-${this.slugify(category)}`);
    label.textContent = category;

    let selectDiv = document.createElement("div");
    selectDiv.className = "select";

    let select = this.createSelectElement(category, optionValues);

    selectDiv.appendChild(select);
    div.appendChild(label);
    div.appendChild(selectDiv);

    return div;
  }

  createSelectElement(category, optionValues) {
    let select = document.createElement("select");
    select.id = `option-${this.slugify(category)}`;
    select.className = "select__select";
    select.name = category;

    optionValues.forEach((value) => {
      let optionElement = document.createElement("option");
      optionElement.value = this.slugify(value);
      optionElement.textContent = value;
      select.appendChild(optionElement);
    });

    return select;
  }
}
