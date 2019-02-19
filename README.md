# Description 

This subsystem is designed to provide predictions based on machine learning modules.

## Installation

### Node

Install with npm:


`npm install prozorro_suggestions`

### Browser

Include the latest release directly from GitHub.

```js
<script src="https://cdn.jsdelivr.net/npm/prozorro_suggestions@1.0.1/prozorro_suggestions.min.js"></script>
```

OR

1. Download the latest distribution in [releases](https://github.com/quintagroup/prozorro-suggestions/releases).
2. Make sure to serve it from your webserver.
3. Include it on the client from a `SCRIPT` tag.


## Usage

Whenever you ask for a collection of resources, you will receive a `Prediction` object which gives you access to a page of results at a time.

|№|property|description|type|required|default|
|:-|:-|:-|:-|:-|:-|
|1|tenderTitle|A name of the tender|string|required at least one of № 1-3|' '|
|2|tenderDescription|A description of the tender|string|required at least one of № 1-3|' '|
|3|itemDescription|A description of the goods, services to be provided|string|required at least one of № 1-3|' '|
|4|itemClassification|The primary classification for the item. It is mandatory for classification.scheme to be CPV or ДК021|string|not required|' '|
|5|accuracyCutoff|Probability threshold|string/number|not required |0.1|
|6|limit|Number of the results to be displayed|string/number|not required |5|

The example would be as follows:

**Find unit based on tender's title, description, item description and classification.**
```js
import Prozorro_Suggestions from "prozorro_suggestions";
// const Prozorro_Suggestions = require('Prozorro_Suggestions');
Prozorro_Suggestions.units.suggest({
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

## Examples

Various examples are in the repository under `examples/`.


