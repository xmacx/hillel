const history = {
  records: [],
  get templateRecords() {
    const template = this.records.map(
      (record) =>
        '<li class="record">' + JSON.stringify(record, null, 50) + "</li>"
    );
    return (
      '<ul class="records card card__shadow">' + template.join(" ") + "</ul>"
    );
  },
  drawRecords() {
    document.write(this.templateRecords);
  },
};

const shape = {
  dependencies: Object.seal({
    left: 100,
    right: 100,
    top: 100,
    bottom: 100,
  }),
  get perimeter() {
    //------ Bug ---

    //  ------ Your resolve problem there -----
    if (history.records.length) {
      const objDependiesName = Object.values(this.dependencies).join('');
      const hr = history.records;
      
      for (let i = 0; i < hr.length; i++) {
          const recordDependiesName = Object.values( hr[i].dependencies ).join('');
          
          if (recordDependiesName === objDependiesName) {
            return hr[i].perimeter;
          }
      }
    }
    //  ------ Your resolve problem there -----

    // there are maybe heavy calculations
    const total = Object.values(this.dependencies).reduce(
      (accm, value) => accm + value,
      0
    );

    // side effect
    history.records.push({
      dependencies: Object.assign({}, this.dependencies),
      perimeter: total,
    });
    
    return total;
  },

  set perimeter(perimeter) {
    if (!Number.isInteger(perimeter) || perimeter < 400) {
      return;
    }

    const size = perimeter / 4;

    this.dependencies = Object.seal({
      left: size,
      right: size,
      top: size,
      bottom: size,
    });

    // side effect
    history.records.push({
      dependencies: Object.assign({}, this.dependencies),
      perimeter: perimeter,
    });
  },
};
