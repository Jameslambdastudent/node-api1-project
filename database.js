let candy = [
	{ id: "1", name: "Snikers" },
	{ id: "2", name: "Payday" },
	{ id: "3", name: "Starburst" },
]

function getCandy() {
	return candy
}

function getCandyById(id) {
	return candy.find(u => u.id === id)
}

function createCandy(data) {
	const payload = {
		id: String(candy.length + 1),
		...data,
	}

	candy.push(payload)
	return payload
}

function updateCandy(id, data) {
	const index = candy.findIndex(u => u.id === id)
	candy[index] = {
		...candy[index],
		...data,
	}
	
	return candy[index]
}

function deleteCandy(id) {
	candy = candy.filter(u => u.id != id)
}

module.exports = {
	getCandy,
	getCandyById,
	createCandy,
	updateCandy,
	deleteCandy,
}