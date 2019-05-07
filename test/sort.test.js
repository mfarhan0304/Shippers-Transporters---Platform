var expect = require("chai").expect;

const assert = require("assert");

const jobs = [
    {
        "id": 1,
        "origin": "Solo",
        "destination": "Semarang",
        "budget": 5400000,
        "shipment_date": new Date("2019-04-18 05:48:18"),
        "distance": 100
    },
    {
        "id": 2,
        "origin": "Surabaya",
        "destination": "Jember",
        "budget": 1300000,
        "shipment_date": new Date("2019-04-10 05:48:18"),
        "distance": 200
    }
]

const bids = [
    {
        "id": 1,
        "job_id": 1,
        "transporter_name": "david wildan",
        "transporter_rating": 4.5,
        "price": 4500000,
        "vehicle_name": "Tronton"
    },
    {
        "id": 1,
        "job_id": 2,
        "transporter_name": "david deng",
        "transporter_rating": 4,
        "price": 1500000,
        "vehicle_name": "Fuso"       
    }
]

function swap(obj, leftIdx, rightIdx) {
    var temp = obj[leftIdx];
    obj[leftIdx] = obj[rightIdx];
    obj[rightIdx] = temp;
}

function partition(obj, left, right, key) {
    var lo    = left; //left pointer
    var hi    = right; //right pointer
    var pivot = obj[Math.floor((lo+hi)/2)][key]; //middle element

    while (lo <= hi) {
        while (obj[lo][key] < pivot) {
            lo++;
        }

        while (obj[hi][key] > pivot) {
            hi--;
        }

        if (lo <= hi) {
            swap(obj, lo, hi);
            lo++;
            hi--;
        }
    }
    return lo;
}

function quickSort(obj, left, right, key) {
    var idx;

    if (obj.length > 1) {
        index = partition(obj, left, right, key);

        if (left < idx-1) {
            quickSort(obj, left, idx-1, key);
        }

        if (idx < right) {
            quickSort(obj, idx, right, key);
        }
    }
    return obj;
}

function sortObj(obj, key, direction) {
    return (direction == "DESC")
                    ? quickSort(obj, obj.length-1, 0, key)
                    : quickSort(obj, 0, obj.length-1, key);
}



describe('Test my sort', () => {
    it("Jobs: by shipment_date ASC", () => {
        const jobsShipmentDateASC = [
            {
                "id": 2,
                "origin": "Surabaya",
                "destination": "Jember",
                "budget": 1300000,
                "shipment_date": new Date("2019-04-10 05:48:18"),
                "distance": 200
            },
            {
                "id": 1,
                "origin": "Solo",
                "destination": "Semarang",
                "budget": 5400000,
                "shipment_date": new Date("2019-04-18 05:48:18"),
                "distance": 100
            }
        ]
        
        expect(sortObj(jobs, "shipment_date", "ASC")).to.eql(jobsShipmentDateASC);
    })

    it("Bids: by transporter_name DESC", () => {
        const bidsTransporterNameDESC = [
            {
                "id": 1,
                "job_id": 1,
                "transporter_name": "david wildan",
                "transporter_rating": 4.5,
                "price": 4500000,
                "vehicle_name": "Tronton"
            },
            {
                "id": 1,
                "job_id": 2,
                "transporter_name": "david deng",
                "transporter_rating": 4,
                "price": 1500000,
                "vehicle_name": "Fuso"       
            }
        ]
        
        expect(sortObj(bids, "transporter_name", "DESC")).to.eql(bidsTransporterNameDESC);
    })

    it("Bids: by price ASC", () => {
        const bidsPriceASC = [
            {
                "id": 1,
                "job_id": 2,
                "transporter_name": "david deng",
                "transporter_rating": 4,
                "price": 1500000,
                "vehicle_name": "Fuso"       
            },
            {
                "id": 1,
                "job_id": 1,
                "transporter_name": "david wildan",
                "transporter_rating": 4.5,
                "price": 4500000,
                "vehicle_name": "Tronton"
            }
        ]
        
        expect(sortObj(bids, "price", "ASC")).to.eql(bidsPriceASC);
    })
})