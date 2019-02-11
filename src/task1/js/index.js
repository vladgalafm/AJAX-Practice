const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://mate-academy.github.io/phone-catalogue-static/phones/phones.json', true);

xhr.send();

xhr.onload = function() {
  const response = xhr.responseText;
  console.dir(JSON.parse(response));
};