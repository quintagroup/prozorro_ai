const units = {
    suggest: function (data, settings) {
        let cutOffLevel, limit;
        if (!settings) {
            limit = 5;
            cutOffLevel = 0.1;
        } else {
            limit = !settings.limit ? 5 : settings.limit;
            cutOffLevel = !settings.accuracyCutoff ? 0.1 : settings.accuracyCutoff;
        }
        return fetch('http://edge-prod-hw.office.quintagroup.com/graphql-dev', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'accept': '*/*'
            },
            body: JSON.stringify({
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
            })
        })
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
};
exports.units = units;