;(function() {
  const table = document.querySelector('.js-table');
  const tbody = table.querySelector('tbody');
  const showMore = document.querySelector('.js-show-more');
  const keys = ['id', 'createdAt', 'name', 'email', 'description'];

  const dateParse = (value) => {
    const match = /(\d{4})-(\d{2})-(\d{2})/.exec(value);
    return `${match[1]}.${match[2]}.${match[3]}`;
  };

  const newCellInput = (visObj, row, key) => {
    const newCell = document.createElement('td');
    newCell.className = 'table__cell';
    if (key === keys[0] || key === keys[1]) {
      newCell.classList.add('table__cell--center');
    }
    if (key !== keys[1]) {
      newCell.innerHTML = visObj[key];
    } else {
      newCell.innerHTML = dateParse(visObj[key]);
    }
    row.appendChild(newCell);
  };

  const tableBuilder = (dataArray) => {
    dataArray.forEach(function(visitorData) {
      const newRow = document.createElement('tr');

      keys.forEach(function(item) {
        newCellInput(visitorData, newRow, item);
      });

      tbody.appendChild(newRow);
    });
  };

  const sendRequest = () => {
    xhr.open('GET', `https://tanuhaua.github.io/datas-file-json/dynamic-loading/${++pageNumber}/users.json`, true);
    xhr.send();
  };

  const xhr = new XMLHttpRequest();
  let pageNumber = 0;
  let loadAllow = true;

  showMore.onclick = function() {
    sendRequest();
  };

  sendRequest();
  xhr.onload = function() {
    const visitorsFile = JSON.parse(xhr.responseText);

    if (loadAllow) {
      tableBuilder(visitorsFile.data);
    }

    loadAllow = visitorsFile.loadMore;

    if (!loadAllow) {
      showMore.disabled = true;
    }
  };
}());