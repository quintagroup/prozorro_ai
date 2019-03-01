# Description 

This subsystem is designed to provide predictions based on machine learning models.

## Installation

### Node

Install with npm:


`npm install prozorro_ai`

### Browser

Include the latest script directly from npm.

```js
<script src="https://cdn.jsdelivr.net/npm/prozorro_ai@1.0.0/prozorro_ai.min.js"></script>
```

OR

1. Download the latest distribution in [releases](https://github.com/quintagroup/prozorro_ai/releases).
2. Make sure to serve it from your webserver.
3. Include it on the client from a `SCRIPT` tag.


## Usage

Whenever you ask for a collection of resources, you will receive a `Prediction` object which gives you access to a page of results at a time.

### Unit prediction

Based on the inputs, you can get the most probable unit of measurement.

|№|property|description|type|required|default|
|:-|:-|:-|:-|:-|:-|
|1|tenderTitle|A name of the tender|string|required at least one of № 1-4|' '|
|2|tenderDescription|A description of the tender|string|required at least one of № 1-4|' '|
|3|itemDescription|A description of the goods, services to be provided|string|required at least one of № 1-4|' '|
|4|itemClassification|The primary classification for the item. It is mandatory for classification.scheme to be CPV.|string|required at least one of № 1-4|' '|
|5|accuracyCutoff|Probability threshold|string/number|not required |0.1|
|6|limit|Number of the results to be displayed|string/number|not required |5|

The example would be as follows:

**Find unit of measurement based on tender's title and description, item's description and classification.**
```js
import Prozorro_AI from "prozorro_ai";
// const Prozorro_AI = require('prozorro_ai');
Prozorro_AI.client().unit.suggest({
  tenderTitle: 'string',
  tenderDescription: 'string',
  itemDescription: 'string',
  itemClassification: 'string'
}, {accuracyCutoff: 'string/number', limit: 'string/number'})
.then(response => {
  console.log(response);
}, error => {
  console.log(error);
})
```

[Try it](https://ocdsanalytics.com/ua/prozorro/ai/docs/examples/unit.html)

### Classification prediction
Based on the inputs, you can get the most probable classification.

|№|property|description|type|required|default|
|:-|:-|:-|:-|:-|:-|
|1|tenderTitle|A name of the tender|string|required at least one of № 1-4|' '|
|2|tenderDescription|A description of the tender|string|required at least one of № 1-4|' '|
|3|itemDescription|A description of the goods, services to be provided|string|required at least one of № 1-4|' '|
|4|itemUnit|Name of the unit based on the UN/CEFACT Recommendation 20 unit code.|string|required at least one of № 1-4|' '|
|5|accuracyCutoff|Probability threshold|string/number|not required |0.1|
|6|limit|Number of the results to be displayed|string/number|not required |5|


**Find classification based on tender's title and description, item's description and unit of measure.**
```js
import Prozorro_AI from "prozorro_ai";
// const Prozorro_AI = require('prozorro_ai');
Prozorro_AI.client().classification.suggest({
  tenderTitle: 'string',
  tenderDescription: 'string',
  itemDescription: 'string',
  itemUnit: 'string'
}, {accuracyCutoff: 'string/number', limit: 'string/number'})
.then(response => {
  console.log(response);
}, error => {
  console.log(error);
})
```


## Examples

Various examples can be viewed [here](./examples/)
