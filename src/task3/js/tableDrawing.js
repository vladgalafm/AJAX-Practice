;(function() {
  const table = document.querySelector('.js-table');
  const tbody = table.querySelector('tbody');
  const keys = ['id', 'createdAt', 'name', 'email', 'description'];

  const dataSort = (dataArray, key, flag) => {
    dataArray.sort(function(a, b) {
      if (a[key].toLowerCase() > b[key].toLowerCase() === flag) {
        return 1;
      } else {
        return -1;
      }
    });
  };

  const dateParse = (value) => {
    const match = /(\d{4})-(\d{2})-(\d{2})/.exec(value);
    return `${match[1]}.${match[2]}.${match[3]}`;
  };

  const newCellInput = (visObj, row, key, keyToHighlight) => {
    const newCell = document.createElement('td');
    newCell.className = 'table__cell';
    if (key === keys[0] || key === keys[1]) {
      newCell.classList.add('table__cell--center');
    }
    if (key === keyToHighlight) {
      newCell.classList.add('table__cell--highlighted');
    }
    if (key !== keys[1]) {
      newCell.innerHTML = visObj[key];
    } else {
      newCell.innerHTML = dateParse(visObj[key]);
    }
    row.appendChild(newCell);
  };

  const tableBuilder = (dataArray, sortedKey) => {
    dataArray.forEach(function(visitorData) {
      const newRow = document.createElement('tr');

      keys.forEach(function(item) {
        newCellInput(visitorData, newRow, item, sortedKey);
      });

      tbody.appendChild(newRow);
    });
  };

  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://tanuhaua.github.io/datas-file-json/visitors.json', true);
  xhr.send();
  xhr.onload = function() {
    const visitorsFile = JSON.parse(xhr.responseText);

    dataSort(visitorsFile, keys[0], true);
    table.querySelector(`[data-key="${keys[0]}"]`).dataset.flag = 'false';
    table.querySelector(`[data-key="${keys[0]}"]`).classList.add('table__head--highlighted');

    tableBuilder(visitorsFile, keys[0]);

    table.onclick = function(e) {
      if (e.target.tagName !== 'TH') {
        return;
      }

      table.querySelector('.table__head--highlighted').classList.remove('table__head--highlighted');
      e.target.classList.add('table__head--highlighted');
      tbody.innerHTML = '';
      dataSort(visitorsFile, e.target.dataset.key, JSON.parse(e.target.dataset.flag));
      e.target.dataset.flag = !JSON.parse(e.target.dataset.flag);
      tableBuilder(visitorsFile, e.target.dataset.key);
    };
  };
}());