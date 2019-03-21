let params = '';
request = function (data, settings, itemType) {
    let url = 'https://ocdsanalytics.com/ua/prozorro/graphql';
    if (params) {
        if (params.endpoint) {
            url = params.endpoint;
        }
    }
    let cutOffLevel, limit;
    if (!settings) {
        limit = 5;
        cutOffLevel = 0.1;
    } else {
        limit = !settings.limit ? 5 : settings.limit;
        cutOffLevel = !settings.accuracyCutoff ? 0.1 : settings.accuracyCutoff;
    }
    let query;
    if (itemType === 'units') {
        query = JSON.stringify({
            query: `
                {
                  Predictions {
                    Unit(
                      page: {limit: ` + limit + `},
                      filters:[
                        {eq: {field: "tender.title", value: "` + (data.tenderTitle ? data.tenderTitle : '') + `"}},
                        {eq: {field: "tender.description", value: "` + (data.tenderDescription ? data.tenderDescription : '') + `"}},
                        {eq: {field: "item.description", value: "` + (data.itemDescription ? data.itemDescription : '') + `"}},
                        {eq: {field: "item.classification.id", value: "` + (data.itemClassification ? data.itemClassification : '') + `"}},
                        {gte: {field: "probability", value: "` + cutOffLevel + `"}}
                      ]){
                      values{
                        entity{
                          id,
                          name,
                          symbol
                        }
                        probability
                      }
                    }
                  }
                }
              `
        });
    } else {
        query = JSON.stringify({
            query: `
                {
                  Predictions {
                    Classification(
                      page: {limit: ` + limit + `},
                      filters:[
                        {eq: {field: "tender.title", value: "` + (data.tenderTitle ? data.tenderTitle : '') + `"}},
                        {eq: {field: "tender.description", value: "` + (data.tenderDescription ? data.tenderDescription : '') + `"}},
                        {eq: {field: "item.description", value: "` + (data.itemDescription ? data.itemDescription : '') + `"}},
                        {eq: {field: "item.unit.id", value: "` + (data.itemUnit ? data.itemUnit : '') + `"}},
                        {gte: {field: "probability", value: "` + cutOffLevel + `"}}
                      ]){
                      values{
                        entity{
                          id,
                          description,
                          scheme
                        }
                        probability
                      }
                    }
                  }
                }
              `
        });
    }

    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'accept': '*/*'
        },
        body: query
    })
};

const item = {
    units: {
        suggest: function (data, settings) {
            return request (data, settings, 'units')
                .then(r => r.json())
                .then(data => {
                    let values = [];
                    data.data.Predictions.Unit.values.forEach((value) => {
                        let returnObject = {};
                        if (value.entity.id) {
                            returnObject.id = value.entity.id;
                        }
                        if (value.entity.name) {
                            returnObject.name = value.entity.name;
                        }
                        if (value.entity.symbol) {
                            returnObject.symbol = value.entity.symbol;
                        }
                        if (value.probability) {
                            returnObject.accuracy = value.probability;
                        }
                        values.push(returnObject);
                    });
                    return values;
                }, (err) => {
                    return err
                });
        }
    },
    classifications: {
        suggest: function (data, settings) {
            return request (data, settings, 'classifications')
                .then(r => r.json())
                .then(data => {
                    let values = [];
                    data.data.Predictions.Classification.values.forEach((value) => {
                        let returnObject = {};
                        if (value.entity.id) {
                            returnObject.id = value.entity.id;
                        }
                        if (value.entity.description) {
                            returnObject.description = value.entity.description;
                        }
                        if (value.entity.scheme) {
                            returnObject.scheme = value.entity.scheme;
                        }
                        if (value.probability) {
                            returnObject.accuracy = value.probability;
                        }
                        values.push(returnObject);
                    });
                    return values;
                }, (err) => {
                    return err
                });
        }
    }
};

class Prozorro_AI {
    static client (param) {
        params = param;
        return item;
    }
}

module.exports = Prozorro_AI;
