var async = require('async'),
	keystone = require('keystone');
var request = require("request");
var sleep = require('sleep');

var columns = ["subscription_key","subscription_status","subscription_name","email","order_id","order_status","start_shipment","start_date","expiration","end_date","last_payment","next_payment","renewals","product_id","coupon_code","email_address","first_name","last_name","company","address1","address2","city","zip","country","state"];
var dataArray = [];

// require("csv-to-array")({
//    file: "./routes/api/active_subscribers.csv",
//    columns: columns
// }, function (err, array) {
//   if (err) throw err;
//   dataArray = array;
//   wizard();
// });


function getNextCustomer(){
	if (dataArray.length > 0) {
		var record = dataArray.pop();
		console.log(record.email);
		getID(record);
	} else {
		console.log("finished");
	}
}

function wizard(){
  sleep.sleep(2)
  getNextCustomer();
}; 

function getID(data) {
	var email = data.email
	var options = { method: 'GET',
		url: keystone.get('shopify_api')+'/admin/customers/search.json',
		qs: { query: 'email:'+email },
		headers: { 'content-type': 'application/json' } };

	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		//console.log(body);
		console.info("bucket response level: "+response.headers.http_x_shopify_shop_api_call_limit);
		body = JSON.parse(body)
		if (body.customers.length > 0){
			var id = body.customers[0].id;
			console.log("customer id: "+id);
			createOrder(data, id)
		} else {
			console.log("*********************");
			console.log(email+" does not exist");
			wizard();
		}
	});
}

function createOrder(data, id){
	var productID
	if (data.subscription_name === "Six Month Membership"){
		productID = 2431063557
	} else if (data.subscription_name === "Annual Membership"){
		productID = 2431046725
	} else if (data.subscription_name === "Quarterly Membership"){
		productID = 2431059013
	}
	console.log('create order '+data.order_id+' for '+data.email);
	var fullname = (data.first_name+" "+data.last_name)
	var body = {
		"order" : {
			"id": data.order_id,
			"billing_address": {
				"address1" : data.address1,
				"address2" : data.address2,
				"city" : data.city,
				"company" : data.company,
				"first_name" : data.first_name,
				"last_name" : data.last_name,
				"id" : id,
				"province" : data.state,
				"zip" : data.zip,
				"name": fullname,
				"country" : data.country
			},
			"processed_at" : data.start_date,
			"customer" : {
				"id" : id,
				"orders_count" : data.renewals
			},
			"discount_codes" : [data.coupon_code],
			"email" : data.email,
			"name" : data.order_id,
			"tags" : "woocommerce,"+data.subscription_name+",order_import,"+data.start_shipment,
			"source_name" : "woocommerce",
			"line_items" : [
				{
					"name" : data.subscription_name,
					"quantity" : 1,
					"price" : "0.00",
					"id" : productID,
					"title" : data.subscription_name,
					"fulfillment_status" : "fulfilled"
				}
			]
		}
	}
	var options = { 
		method: 'POST',
		url: keystone.get('shopify_api')+'/admin/orders.json',
		headers: { 'content-type': 'application/json' },
  		body: body,
  		json: true
 	};
	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		if (body.order) {
			console.log("Created order "+body.order.id+" for "+body.order.email);
			wizard();
		} else if (response.statusCode === 422 ) {
			var body = {
				"order" : {
					"id": data.order_id,
					"processed_at" : data.start_date,
					"customer" : {
						"id" : id,
						"orders_count" : data.renewals
					},
					"discount_codes" : [data.coupon_code],
					"email" : data.email,
					"name" : data.order_id,
					"tags" : "woocommerce,"+data.subscription_name+",order_import,"+data.start_shipment,
					"source_name" : "woocommerce",
					"line_items" : [
						{
							"name" : data.subscription_name,
							"quantity" : 1,
							"price" : "0.00",
							"id" : productID,
							"title" : data.subscription_name,
							"fulfillment_status" : "fulfilled"
						}
					]
				}
			}
			var options = { 
				method: 'POST',
				url: keystone.get('shopify_api')+'/admin/orders.json',
				headers: { 'content-type': 'application/json' },
		  		body: body,
		  		json: true
			}
			request(options, function (error, response, body) {
				if (error) throw new Error(error);
				if (body.order) {
					console.log("Created order "+body.order.id+" for "+body.order.email);
					wizard();
				} else {
					console.log("********DIDN'T WORK*********");
					console.log("body: "+JSON.stringify(body));
					console.log("response: "+JSON.stringify(response));
					wizard();
				}
			})
 		} else {
			console.log("********DIDN'T WORK*********");
			console.log("body: "+JSON.stringify(body));
			console.log("response: "+JSON.stringify(response));
			wizard();
		}
	});
}

