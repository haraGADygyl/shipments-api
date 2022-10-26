export const couriers = ["DHL","USPS","UPS","Speedy"]
export const status = ["Delivered","Awaiting Shipment","Shipped","Awaiting Shipment","Disputed"]
export const date = ['2022-10-23','2022-10-24','2022-10-25','2022-10-26','2022-10-27','2022-10-28','2022-10-29','2022-10-30']
export const data = [
  {
    order_date: '13-12-2021',
    product_scu: '12',
    customer_name: "ivan",
    delivery_address: "road 31",
    courier: "UPS",
    status: 'Delivered',
  },
  {
    order_date: '14-12-2021',
    product_scu: '11',
    customer_name: "Pesho",
    delivery_address: "road 34",
    courier: "UPS",
    status: 'Delivered',
  },
  {
    order_date: '15-12-2021',
    product_scu: '12',
    customer_name: "Ico ",
    delivery_address: "road 32",
    courier: "UPS",
    status: 'Delivered',
  },
  {
    order_date: '16-12-2021',
    product_scu: '13',
    customer_name: "ivan",
    delivery_address: "road 31",
    courier: "UPS",
    status: 'Delivered',
  },
  
];



export const allData = JSON.stringify([
  {
      "id": 2,
      "order_date": "2022-10-24",
      "product_sku": "SKU-1919-OSO1",
      "customer_name": "John",
      "delivery_address": "1st Ave",
      "courier": "DHL",
      "status": "Shipped"
  },
  {
      "id": 1,
      "order_date": "2022-10-24",
      "product_sku": "SKU-1919-OSO",
      "customer_name": "John",
      "delivery_address": "1st Ave",
      "courier": "DHL",
      "status": "Shipped"
  },
  {
      "id": 3,
      "order_date": "2022-10-25",
      "product_sku": "SKU-1919-OSO12",
      "customer_name": "Smith",
      "delivery_address": "Road 31",
      "courier": "UPS",
      "status": "Disputed"
  },
  {
      "id": 4,
      "order_date": "2022-10-25",
      "product_sku": "SKU-101",
      "customer_name": "John3",
      "delivery_address": "1st Ave",
      "courier": "Speedy",
      "status": "Delivered"
  }
])