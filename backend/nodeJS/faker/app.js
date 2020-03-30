var faker = require("faker");
for(var i = 0 ; i<=10; i++){
    console.log(faker.commerce.productAdjective()+" "+ faker.commerce.productMaterial()+" "+faker.commerce.product() +" - "+faker.commerce.price());
}
