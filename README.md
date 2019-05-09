# Description 

This subsystem is designed to provide suggestions based on machine learning models.

**Notice! It is recommended to use this library starting from version 1.1.0  that introduces authentication via an API key.**

## Installation

### Node

Install with npm:


`npm install prozorro_ai`

### Browser

Include the latest script directly from npm.

```js
<script src="https://cdn.jsdelivr.net/npm/prozorro_ai@1.1.0/prozorro_ai.min.js"></script>
```

OR

1. Download the latest distribution in [releases](https://github.com/quintagroup/prozorro_ai/releases).
2. Make sure to serve it from your webserver.
3. Include it on the client from a `SCRIPT` tag.


## Usage

### Authentication

This library requires authentication via an API key. 
The API key is issued after the registration confirmation on the [https://ocdsanalytics.com/](https://ocdsanalytics.com/register/) website. 
You can find it in the API section on the [Account page](https://ocdsanalytics.com/account/).

Use API key as follows:

```js
Prozorro_AI.client({apiKey: 'Insert your API_KEY here'}).units.suggest({
...
})
```

### Unit prediction

Based on the inputs, you can get the most probable unit of measurement.

[Try it](https://ocdsanalytics.com/ua/prozorro/ai/docs/examples/unit.html)

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

Request:
```js
import Prozorro_AI from "prozorro_ai";
// const Prozorro_AI = require('prozorro_ai');
Prozorro_AI.client({apiKey: 'Insert your API_KEY here'}).units.suggest({
  tenderTitle: 'Тканини бавовняні',
  tenderDescription: 'Відбілений сатин',
  itemDescription: 'Сатин відбілений. Склад - 100% бавовна, ширина 200 см',
  itemClassification: '19212000-5'
}, {accuracyCutoff: '0.02', limit: '5'})
.then(response => {
  console.log(response);
}, error => {
  console.log(error);
})
```

Response:
```js
[
	{
	  id: 'MTR',
      name: 'метри',
      symbol: 'м',
      accuracy: 0.5046774744987488
	},
	{
	  id: 'LM',
      name: 'Погонний метр',
      symbol: 'пог.м.',
      accuracy: 0.40248599648475647
	},
	{
	  id: 'H87',
      name: 'штуки',
      symbol: 'шт.',
      accuracy: 0.05680004507303238
	}
]
```

### Classification prediction
Based on the inputs, you can get the most probable classification.

[Try it](https://ocdsanalytics.com/ua/prozorro/ai/docs/examples/classification.html)

|№|property|description|type|required|default|
|:-|:-|:-|:-|:-|:-|
|1|tenderTitle|A name of the tender|string|required at least one of № 1-4|' '|
|2|tenderDescription|A description of the tender|string|required at least one of № 1-4|' '|
|3|itemDescription|A description of the goods, services to be provided|string|required at least one of № 1-4|' '|
|4|itemUnit|Name of the unit based on the UN/CEFACT Recommendation 20 unit code.|string|required at least one of № 1-4|' '|
|5|accuracyCutoff|Probability threshold|string/number|not required |0.1|
|6|limit|Number of the results to be displayed|string/number|not required |5|


**Find classification based on tender's title and description, item's description and unit of measure.**

Request:
```js
import Prozorro_AI from "prozorro_ai";
// const Prozorro_AI = require('prozorro_ai');
Prozorro_AI.client({apiKey: 'Insert your API_KEY here'}).classifications.suggest({
  tenderTitle: 'Технічне обслуговування і ремонт офісної техніки',
  tenderDescription: 'Послуги з технічного обслуговування принтерів та картриджів',
  itemDescription: 'Послуги з технічного обслуговування принтерів',
  itemUnit: 'E48'
}, {accuracyCutoff: '0.02', limit: '5'})
.then(response => {
  console.log(response);
}, error => {
  console.log(error);
})
```
Response:
```js
[
	{
	  id: '50310000-1',
      description: 'Технічне обслуговування і ремонт офісної техніки',
      scheme: 'ДК021',
      accuracy: 0.23198238015174866
	},
	{
	  id: '50323000-5',
      description: 'Ремонт і технічне обслуговування комп’ютерних периферійних пристроїв',
      scheme: 'ДК021',
      accuracy: 0.07701390236616135
	},
	{
	  id: '50320000-4',
      description: 'Послуги з ремонту і технічного обслуговування персональних комп’ютерів',
      scheme: 'ДК021',
      accuracy: 0.07315685600042343
	}
]
```


## Examples

Various examples can be viewed [here](./examples/)
