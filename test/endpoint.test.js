const chai = require('chai');
const expect = chai.expect;
const url = `http://localhost:4000`;
const request = require('supertest')(url);

describe('Test my endpoint', () => {
    it('Returns all jobs', (done) => {
        request.post('/')
        .send({ query: '{ jobs { id origin destination budget shipment_date distance } }' })
        .expect(200, done);
    })
    it('Returns all bids', (done) => {
        request.post('/')
        .send({ query: '{ bids { id job_id { id } transporter_name transporter_rating price vehicle_name } }' })
        .expect(200, done);
    })
    it('Returns bids with job_id = 1', (done) => {
        request.post('/')
        .send({ query: '{ bidsToJob(job_id: 1) { id job_id { id } transporter_name transporter_rating price vehicle_name } }' })
        .expect(200, done);
    })
    it('Returns sorted jobs by budget ascending', (done) => {
        request.post('/')
        .send({ query: '{ jobsOrdered(orderBy: budget_ASC) { id origin destination budget shipment_date distance } }' })
        .expect(200, done);
    })
    it('Returns sorted bids by vehicle_name descending', (done) => {
        request.post('/')
        .send({ query: '{ bidsOrdered(orderBy: vehicle_name_DESC) { id job_id { id } transporter_name transporter_rating price vehicle_name } }' })
        .expect(200, done);
    })
});