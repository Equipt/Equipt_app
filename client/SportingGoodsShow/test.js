
var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');

import SportingGoodShow from './index.js';

var mock = new MockAdapter(axios);

mock.onGet('/sporting_goods/test').reply(200, {
  "category":"Camp",
  "title":"Test",
  "brand":"Testing Brand",
  "model":"Testing Modal",
  "description":null,
  "age":2,
  "pricePerDay":50.0,
  "pricePerWeek":100.0,
  "deposit":0.0,
  "errors":{},
  "slug":"marmot-tent",
  "images":[
    {
      "id":7,
      "imageable_type":"SportingGood",
      "imageable_id":3,
      "file":{"url":"https://equipt-app.s3.amazonaws.com/uploads/image/file/7/marmot.jpeg"},
      "primary":null,
      "created_at":"2018-11-24T18:23:22.612-08:00",
      "updated_at":"2018-11-24T18:23:22.612-08:00",
      "url":null
    }
  ],
  "overallRating":0,
  "totalRatings":0,
  "primaryImage":"https://equipt-app.s3.amazonaws.com/uploads/image/file/7/marmot.jpeg",
  "coordinates":{"latitude":49.3189091,"longitude":-123.0757133},
  "rentals":[],
  "ratings":[],
  "user":{
    "hashId":"EMY7IqlLqtvP",
    "firstname":"tom",
    "lastname":"Davis",
    "profile":null
  }
});

// Create a browser history
const history = createHistory();

// Thunk setup
const thunkMiddleware = thunk.withExtraArgument({api, history});

// Middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const mockStore = createStore(
  reducers,
  applyMiddleware(middleware, thunkMiddleware)
);

describe('SportingGoodsShow', () => {

  let component;
  let tree

  before(() => {
    component = render.create(
      <Provider store={ mockStore }>
        <SportingGoodShow/>
      </Provider>
    )

    tree = component.toJSON();

  });

  test('SnapShot exists', () => {
    expect(tree).toMatchSnapshot();
  })

});
