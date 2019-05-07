const fs = require('fs')
const path = require('path')
const EasyGraphQLTester = require('easygraphql-tester')

const schema = fs.readFileSync(path.join(__dirname, '../src/', 'schema.graphql'), 'utf8')

describe('Test my schemas validation', () => {
  let tester

  before(() => {
    tester = new EasyGraphQLTester([schema])
  })

  describe('Should pass if the query is valid', () => {
    it('Valid jobs query', () => {
      const validJobsQuery = `
        {
          jobs {
            id
            origin
            destination
            budget
            shipment_date
            distance
          }
        }
      `
      tester.test(true, validJobsQuery)
    })

    it('Valid bids query', () => {
      const validBidsQuery = `
        {
          bids {
            id
            job_id {
              id
            }
            transporter_name
            transporter_rating
            price
            vehicle_name
          }
        }
      `
      tester.test(true, validBidsQuery)
    })

    it('Valid bidsToJob query', () => {
      const validBidsToJobQuery = `
        {
          bidsToJob(job_id: 1) {
            id
            job_id {
              id
            }
            transporter_name
            transporter_rating
            price
            vehicle_name
          }
        }
      `
      tester.test(true, validBidsToJobQuery)
    })

    it('Valid jobsOrdered query', () => {
      const validJobOrderedQuery = `
        {
          jobsOrdered(orderBy: origin_ASC) {
            id
            origin
            destination
            budget
            shipment_date
            distance
          }
        }
      `
      tester.test(true, validJobOrderedQuery)
    })

    it('Valid bidsOrdered query', () => {
      const validBidsOrderedQuery = `
        {
          bidsOrdered(orderBy: transporter_name_DESC) {
            id
            job_id {
              id
            }
            transporter_name
            transporter_rating
            price
            vehicle_name
          }
        }
      `
      tester.test(true, validBidsOrderedQuery)
    })
  })

  describe('Should pass if the query is invalid', () => {
    it('Invalid jobs query', () => {
      const validJobsQuery = `
        {
          jobs {
            id
            origin
            destination
            budget
            shipmentDate
            distance
          }
        }
      `
      tester.test(false, validJobsQuery)
    })

    it('Invalid bids query', () => {
      const validBidsQuery = `
        {
          bids {
            id
            job_id {
              id
            }
            transporterName
            transporterRating
            price
            vehicleName
          }
        }
      `
      tester.test(false, validBidsQuery)
    })

    it('Invalid bidsToJob query', () => {
      const validBidsToJobQuery = `
        {
          bidsToJob(job_id: 1) {
            id
            job_id {
              id
            }
            transporterName
            transporterRating
            price
            vehicleName
          }
        }
      `
      tester.test(false, validBidsToJobQuery)
    })

    it('Invalid jobsOrdered query', () => {
      const validJobOrderedQuery = `
        {
          jobsOrdered(orderBy: origin_ASC) {
            id
            origin
            destination
            budget
            shipmentDate
            distance
          }
        }
      `
      tester.test(false, validJobOrderedQuery)
    })

    it('Invalid bidsOrdered query', () => {
      const validBidsOrderedQuery = `
        {
          bidsOrdered(orderBy: transporter_name_DESC) {
            id
            job_id {
              id
            }
            transporterName
            transporterRating
            price
            vehicleName
          }
        }
      `
      tester.test(false, validBidsOrderedQuery)
    })
  })
})