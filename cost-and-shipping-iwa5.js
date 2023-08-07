const FREE_WARNING = "Free shipping only applies to single customer orders";
const BANNED_WARNING =
	"Unfortunately we do not ship to your country of residence";
const NONE_SELECTED = 0;

const order_info = {
	customers: 1,
	location: "RSA",
	item_units: {
		shoes: 1,
		toys: 5,
		shirts: NONE_SELECTED,
		batteries: 2,
		pens: NONE_SELECTED,
	},
	item_cost: {
		shoes: 300,
		toys: 100,
		shirts: 150,
		batteries: 35,
		pens: 5,
	},
	total_cost: function () {
		total = 0;
		for (let item_name in this.item_units) {
			if (item_name in this.item_cost) {
				total += this.item_cost[item_name] * this.item_units[item_name];
			}
		}
		return total;
	},
};

total_cost_and_shipping = function (cust_count, country, total_cost) {
	let currency = "";
	let final_price = 0;
	const shipping_amount = {
		rsa: 400,
		nam: 600,
		other_countries: 800,
	};

	if (country === "RSA") {
		currency = "R";

		if (total_cost >= 1000 && cust_count === 1) {
			// eligible for free shipping
			final_price = total_cost;
		} else if (total_cost >= 1000 && cust_count !== 1) {
			return FREE_WARNING;
		} else {
			final_price = total_cost + shipping_amount.rsa;
		}
	} else if (country === "NAM") {
		currency = "$";

		if (total_cost >= 60 && cust_count === 1) {
			// eligible for free shipping
			final_price = total_cost;
		} else if (total_cost >= 1000 && cust_count !== 1) {
			return FREE_WARNING;
		} else {
			final_price = total_cost + shipping_amount.nam;
		}
	} else if (country !== "NK") {
		currency = "$";
		final_price = total_cost + shipping_amount.other_countries;
	} else {
		// North Korea (NK) not eligible for shipping
		return BANNED_WARNING;
	}

	return "Price: " + currency + final_price.toString();
};

console.log(
	total_cost_and_shipping(
		order_info.customers,
		order_info.location,
		order_info.total_cost()
	)
);
