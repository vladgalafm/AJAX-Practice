;(function() {
  const sortByName = (dataArray) => {
    dataArray.sort(function(a, b) {
      if (a.name > b.name) {
        return 1;
      } else {
        return -1;
      }
    });
  };

  const cardsGalleryBuilder = (dataArray) => {
    const body = document.body;

    const container = document.createElement('div');
    container.className = 'container container--gallery';
    body.insertBefore(container, body.children[0]);

    const headline = document.createElement('h1');
    headline.className = 'container__headline';
    headline.innerHTML = 'Cards Gallery';
    container.appendChild(headline);

    for (let i = 0; i < dataArray.length; i++) {
      const card = document.createElement('div');

      if (dataArray[i].sex === 'm') {
        card.className = 'container__card';
      } else {
        card.className = 'container__card container__card--female';
      }
      container.appendChild(card);

      const person = document.createElement('p');
      person.className = 'container__card-heading';
      person.innerHTML = dataArray[i].name;
      card.appendChild(person);

      const dates = document.createElement('p');
      dates.className = 'container__card-heading';
      dates.innerHTML = `(${dataArray[i].born} - ${dataArray[i].died})`;
      card.appendChild(dates);

      const sex = document.createElement('p');
      sex.className = 'container__card-text';
      if (dataArray[i].sex === 'm') {
        sex.innerHTML = 'Sex: Male';
      } else {
        sex.innerHTML = 'Sex: Female';
      }
      card.appendChild(sex);

      const father = document.createElement('p');
      father.className = 'container__card-text';
      if (!!dataArray[i].father) {
        father.innerHTML = `Father: <i>${dataArray[i].father}</i>`;
      } else {
        father.innerHTML = 'Father: -';
      }
      card.appendChild(father);

      const mother = document.createElement('p');
      mother.className = 'container__card-text';
      if (!!dataArray[i].mother) {
        mother.innerHTML = `Mother: <i>${dataArray[i].mother}</i>`;
      } else {
        mother.innerHTML = 'Mother: -';
      }
      card.appendChild(mother);
    }
  };

  const statsBlockBuilder = (dataArray) => {
    const body = document.body;

    const statsblock = document.createElement('div');
    statsblock.className = 'container';
    body.insertBefore(statsblock, body.children[1]);

    const headline = document.createElement('h1');
    headline.className = 'container__headline';
    headline.innerHTML = 'Some Statistics';
    statsblock.appendChild(headline);

    const averageAge = (sex) => {
      let count = 0;
      let years = 0;
      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].sex === sex) {
          years += (dataArray[i].died - dataArray[i].born);
          count++;
        }
      }
      return (years/count).toFixed(2);
    };

    const averageMale = document.createElement('p');
    averageMale.className = 'container__stats';
    averageMale.innerHTML = `Average male age: ${averageAge('m')}`;
    statsblock.appendChild(averageMale);

    const averageFemale = document.createElement('p');
    averageFemale.className = 'container__stats';
    averageFemale.innerHTML = `Average female age: ${averageAge('f')}`;
    statsblock.appendChild(averageFemale);

    const averageDifference = () => {
      let count = 0;
      let diffSum = 0;
      child: for (let i = 0; i < dataArray.length; i++) {
        const childBirthDate = dataArray[i].born;
        for (let j = 0; j < dataArray.length; j++) {
          if (dataArray[i].mother === dataArray[j].name) {
            const motherBirthDate = dataArray[j].born;
            diffSum += Math.abs(motherBirthDate - childBirthDate);
            count++;
            continue child;
          }
        }
      }
      return (diffSum/count).toFixed(2);
    };

    const averageDiff = document.createElement('p');
    averageDiff.className = 'container__stats';
    averageDiff.innerHTML = `Average difference between children and their mothers' ages: ${averageDifference()}`;
    statsblock.appendChild(averageDiff);
  };

  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://tanuhaua.github.io/datas-file-json/data.json', true);
  xhr.send();
  xhr.onload = function() {
    const ancestryFile = JSON.parse(xhr.responseText);

    sortByName(ancestryFile);
    cardsGalleryBuilder(ancestryFile);
    statsBlockBuilder(ancestryFile);
  };
}());