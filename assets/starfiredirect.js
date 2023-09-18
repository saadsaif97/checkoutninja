/**
 * DUMMY DATA
{
  "options": [
    {
      "title": "Size",
      "options": [
        {
          "value": "36\"",
          "imageUrl": "https://source.unsplash.com/200x200/?size-36"
        },
        {
          "value": "45\"",
          "imageUrl": "https://source.unsplash.com/200x200/?size-45"
        }
      ],
      "frontend_sorting": 1,
      "url_sorting": 1,
      "label": "Size"
    },
    {
      "title": "Fuel & Ignition",
      "options": [
        {
          "value": "Match Lit - NG/LP",
          "imageUrl": "https://source.unsplash.com/200x200/?match-lit"
        },
        {
          "value": "PowerGlow Electronic - NG/LP",
          "imageUrl": "https://source.unsplash.com/200x200/?glow"
        },
        {
          "value": "HPC CSA Certified Electronic On/Off - NG",
          "imageUrl": "https://source.unsplash.com/200x200/?hpc-csa-ng"
        },
        {
          "value": "HPC CSA Certified Electronic On/Off - LP",
          "imageUrl": "https://source.unsplash.com/200x200/?hpc-csa-lp"
        },
        {
          "value": "HPC CSA Certified Electronic High/Low - NG",
          "imageUrl": "https://source.unsplash.com/200x200/?hpc-high-low-ng"
        },
        {
          "value": "HPC CSA Certified Electronic High/Low - LP",
          "imageUrl": "https://source.unsplash.com/200x200/?hpc-high-low-lp"
        }
      ],
      "frontend_sorting": 2,
      "url_sorting": 2,
      "label": "Fuel & Ignition"
    },
    {
      "title": "Color",
      "options": [
        {
          "value": "White",
          "imageUrl": "https://source.unsplash.com/200x200/?white-color"
        },
        {
          "value": "Natural Gray",
          "imageUrl": "https://source.unsplash.com/200x200/?natural-gray"
        },
        {
          "value": "Graphite",
          "imageUrl": "https://source.unsplash.com/200x200/?graphite"
        },
        {
          "value": "Brown",
          "imageUrl": "https://source.unsplash.com/200x200/?brown-color"
        },
        {
          "value": "Beige",
          "imageUrl": "https://source.unsplash.com/200x200/?beige-color"
        }
      ],
      "frontend_sorting": 3,
      "url_sorting": 3,
      "label": "Color"
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
    let mainDiv = document.createElement("div");

    let label = document.createElement("label");
    label.classList = "accordion"
    
    label.innerHTML = `${title} | <span id="selected-${this.slugify(title)}"> ${options[0].value} </span>`;

    mainDiv.appendChild(label);

    let fieldset = document.createElement("fieldset");
    fieldset.classList = "panel"
    fieldset.name = title;

    let legend = document.createElement("legend");
    legend.textContent = title;
    
    fieldset.appendChild(legend);
    
    options.forEach((option, index) => {
      let optionDiv = document.createElement("div");

      let radioButton = document.createElement("input");
      radioButton.type = "radio";
      radioButton.name = this.slugify(title);
      radioButton.value = this.slugify(option.value);
      radioButton.onclick = this.updateTitle
      radioButton.dataset.rawValue = option.value
      if (index == 0) radioButton.setAttribute("checked", true);

      let optionLabel = document.createElement("label");
      optionLabel.innerText = option.value;
      
      if(option.imageUrl) {
        let imgElement = document.createElement("img");
        imgElement.src = option.imageUrl;
        imgElement.alt = option.value;
        optionLabel.prepend(imgElement)
      }
      
      optionLabel.appendChild(radioButton);
      optionDiv.appendChild(optionLabel);

      fieldset.appendChild(optionDiv);
    })
    
    mainDiv.appendChild(fieldset);

    return mainDiv;
  }
  
  updateTitle(e) {
    const fieldsetName = e.target.name
    const selectedContainer = document.querySelector(`#selected-${fieldsetName}`)
    selectedContainer.innerText = e.target.dataset.rawValue
    console.log(selectedContainer)
  }

  createSelectElement(category, optionValues) {
    let select = document.createElement("select");
    select.id = `option-${this.slugify(
      this.sortedProductOptions[category].title
    )}`;
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
