class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    // console.log(this.queryString);
    const excludeStr = ['limit', 'sort', 'field', 'page'];
    excludeStr.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (op) => `$${op}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort(defaultSort) {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort(defaultSort);
    }

    return this;
  }

  field(defaultField) {
    if (this.queryString.field) {
      const select = this.queryString.field.split(',').join(' ');
      this.query = this.query.select(`${select}`);
    } else {
      this.query = this.query.select(defaultField);
    }
    return this;
  }
}

module.exports = APIFeatures;
