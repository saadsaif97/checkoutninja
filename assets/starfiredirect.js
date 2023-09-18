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
    this.sortedProductOptions = this.options.sort(
      (a, b) => a.frontend_sorting - b.frontend_sorting
    );
  }

  renderAllOptions() {
    for (const category in this.sortedProductOptions) {
      let divElement = this.createOptionDiv(
        this.sortedProductOptions[category].title,
        this.sortedProductOptions[category].options
      );
      this.productOptionsDiv.appendChild(divElement);
    }
  }

  createOptionDiv(title, options) {
    let divElement = document.createElement("div");
    let titleElement = document.createElement("h3");
    titleElement.textContent = this.slugify(title);
    divElement.appendChild(titleElement);
    
    // Create radio buttons with image for each option
    for (const option of options) {
      let radioButton = document.createElement("input");
      radioButton.type = "radio";
      radioButton.name = title;
      radioButton.value = option.value;
  
      let labelElement = document.createElement("label");
      labelElement.textContent = option.value;
  
      let imgElement = document.createElement("img");
      imgElement.src = option.imageUrl;
      imgElement.alt = option.value;
  
      labelElement.appendChild(radioButton);
      labelElement.appendChild(imgElement);
      divElement.appendChild(labelElement);
    }
  
    return divElement;
  }
  

  createSelectElement(category, optionValues) {
    let select = document.createElement("select");
    select.id = `option-${this.slugify(this.sortedProductOptions[category].title)}`;
    select.className = "select__select";
    select.name = category;
    select.dataset.url_sorting =
      this.sortedProductOptions[category].url_sorting;

    optionValues.forEach((value) => {
      let optionElement = document.createElement("option");
      optionElement.value = this.slugify(value.value);
      optionElement.textContent = value.value;
      select.appendChild(optionElement);
    });

    return select;
  }
}
