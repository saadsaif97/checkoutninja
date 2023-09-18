/**
 * DUMMY DATA
{
  "options": [
    {
      "title": "Size",
      "options": [
        "36\"",
        "45\""
      ],
      "frontend_sorting": 1,
      "url_sorting": 1,
      "label": "Product size"
    },
    {
      "title": "Color",
      "options": [
        "White",
        "Natural Gray",
        "Graphite",
        "Brown",
        "Beige"
      ],
      "frontend_sorting": 3,
      "url_sorting": 3,
      "label": "Color"
    },
    {
      "title": "Fuel & Ignition",
      "options": [
        "Match Lit - NG/LP",
        "PowerGlow Electronic - NG/LP",
        "HPC CSA Certified Electronic On/Off - NG",
        "HPC CSA Certified Electronic On/Off - LP",
        "HPC CSA Certified Electronic High/Low - NG",
        "HPC CSA Certified Electronic High/Low - LP"
      ],
      "frontend_sorting": 2,
      "url_sorting": 2,
      "label": "Fuel & Ignition"
    }
  ]
}
 */

class ProductOptions {
  constructor(uid, options) {
    this.uid = uid;
    this.options = options.options;
    this.productOptionsDiv = document.getElementById(this.uid);
    this.sortOptions();
  }

  slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9_\-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  sortOptions() {
    let entries = this.options.sort(
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
    label.textContent = this.sortedProductOptions[category].label;

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
    select.dataset.url_sorting =
      this.sortedProductOptions[category].url_sorting;

    optionValues.forEach((value) => {
      let optionElement = document.createElement("option");
      optionElement.value = this.slugify(value);
      optionElement.textContent = value;
      select.appendChild(optionElement);
    });

    return select;
  }
}
