console.log('hello world')

// grabing elements from document
let inputUrl = document.getElementById('inputUrl');
let jsonType = document.getElementById('jsonType');
let customType = document.getElementById('customType');
let plusButton = document.getElementById('plusButton');
let addCustomInput = document.getElementById('addCustomInput');
let customInput = document.getElementById('customInput');
let jsonInput = document.getElementById('jsonInput');
let submitButton = document.getElementById('submitButton');
let inputOfJson = document.getElementById('inputOfJson');
let outputOfJson = document.getElementById('outputOfJson');

// utility functions
function adding(string) {
  let div = document.createElement('div');
  div.innerHTML = string;
  console.log(div.firstElementChild);
  return div.firstElementChild
}

// adding more parameters 
let parameterCount = 0;
plusButton.addEventListener('click', () => {
  let = template = ` <div class=" row form-group ">
                    <div class="col-md-2 data-type"></div>
                    <div class="col-md-5">
                    <input type="text" class="form-control my-1" id="key${parameterCount + 2}" placeholder=" Enter Key${parameterCount + 2}">
                    </div>
                    <div class="col-md-4 mx-0">
                    <input type="text" class="form-control my-1" id="value${parameterCount + 2}" placeholder="Enter Value${parameterCount + 2}">
                    </div>
                    <button class="btn btn-primary col-md-1 my-1 minus" id="minus${parameterCount + 1}">-</button>
                    </div>`
  let addInput = adding(template);
  customInput.append(addInput);
  // deleting more parameters
  let minusButton = document.getElementsByClassName('minus')
  for (item of minusButton) {
    item.addEventListener('click', (e) => {
      e.target.parentElement.remove();
    })

  }

  parameterCount++;
});

// Enable or disable parameters type accordingly
jsonType.addEventListener('click', () => {

  customInput.style.display = 'none';
  jsonInput.style.display = 'block';
});
customType.addEventListener('click', () => {
  customInput.style.display = 'block';
  jsonInput.style.display = 'none';
});

// fetching data from our document
submitButton.addEventListener('click', () => {
  let url = inputUrl.value;
  let requestType = document.querySelector("input[name='requestType']:checked").value;
  let containType = document.querySelector("input[name='containType']:checked").value;
  data = {};
  let stringifyData = '';
  if (containType == 'JSON') {
    let jsonValue = inputOfJson.value;
    data = jsonValue;
    data=JSON.stringify(data);
    console.log(data);
  }
  if (containType == 'customInput') {

    for (i = 0; i <= parameterCount; i++) {
      if (document.getElementById('key' + (i + 1)) != undefined) {
        let key = document.getElementById('key' + (i + 1)).value;
        let value = document.getElementById('value' + (i + 1)).value;
        if (value != 'null') {
          data[key] = value;
        }
      }
    }
    data = JSON.stringify(data);
    console.log(data);
  }

  // fetching data when request is get
  if (requestType == 'GET') {
    outputOfJson.innerHTML = `please wait while fetching........`
    fetch(url, {
      method: 'GET',
    })
      .then(response =>
        response.text()).then((text) => {
          outputOfJson.value = text;
        });
  }


  // fetching data when request is  post
  else {
    outputOfJson.innerHTML = `please wait while fetching........`;
    fetch(url, {
      method: 'POST',
      body: data,
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(response =>
        response.text()).then((text) => {
          outputOfJson.value = text;
        });
  }


});
