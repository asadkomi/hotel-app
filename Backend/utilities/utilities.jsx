class Utilities {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const location = this.queryStr.location
      ? {
          address: {
            $regex: this.queryStr.location,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...location });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    const removeLoactionFields = ["location", "page"];
    removeLoactionFields.forEach((el) => delete queryCopy[el]);

    this.query = this.query.find(queryCopy);
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skipPages = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skipPages);
    return this;
  }
}

export default Utilities;
