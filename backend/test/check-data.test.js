const checkData = require('./../controllers/check-data');
const expect = require('expect');

const rows = [
    {
        id: 1,
        employeeID: 1,
        startDisease: '2017-07-03',
        finishDisease: '2017-07-08',
        disease: 'Ангіна'
    },
    {
        id: 2,
        employeeID: 1,
        startDisease: '2017-07-16',
        finishDisease: '2017-07-20',
        disease: 'Ангіна'
    },
    {
        id: 3,
        employeeID: 1,
        startDisease: '2017-07-24',
        finishDisease: '2017-07-27',
        disease: 'Ангіна'
    },
    {
        id: 48,
        employeeID: 1,
        startDisease: '2017-06-16',
        finishDisease: '2017-08-07',
        disease: 'qew'
    },
    {
        id: 86,
        employeeID: 1,
        startDisease: '2017-06-04',
        finishDisease: '2017-07-04',
        disease: 'Kppp'
    },
    {
        id: 87,
        employeeID: 1,
        startDisease: '2017-07-21',
        finishDisease: '2017-08-06',
        disease: 'Fdssd'
    }
]

describe('Check data', () => {

    describe('#amount days', () => {
        it('should get amount days in month', () => {
            var res = checkData.getAmountDaysInMonth(2017, 11);

            expect(res).toBe(30).toBeA('number');
        });
        it('should get amount days in month February', () => {
            var res = checkData.getAmountDaysInMonth(2016, 2);

            expect(res).toBe(29).toBeA('number');
        });
    });

    describe('#coincidence', () => {
        it('should do not get a match', () => {
            var res = checkData.checkSickLeave(rows, '2017-08-08', '2017-08-11');

            expect(res).toBe(true).toBeA('boolean');
        });
        it('should do not get a match', () => {
            var res = checkData.checkSickLeave(rows, '2017-07-14', '2017-07-17');

            expect(res).toBe(false).toBeA('boolean');
        });
    });

    describe('#sum sick leave', () => {

        describe('#in the middle', () => {

            it('should get sum sick leave', () => {
                let sickLeave = [rows[0]];
                var res = checkData.testSumSickLeave(sickLeave, 2017, 7, 'month');

                expect(res).toBe(6).toBeA('number');
            });

            it('should get sum sick leave', () => {
                let sickLeave = [rows[0], rows[1], rows[2]];
                var res = checkData.testSumSickLeave(sickLeave, 2017, 7, 'month');

                expect(res).toBe(15).toBeA('number');
            });

        });

        describe('#in the all', () => {
            it('should get sum sick leave', () => {
                let sickLeave = [rows[3]];
                var res = checkData.testSumSickLeave(sickLeave, 2017, 7, 'month');

                expect(res).toBe(31).toBeA('number');
            });
        });

        describe('#in the start', () => {

            it('should get sum sick leave', () => {
                let sickLeave = [rows[4]];
                var res = checkData.testSumSickLeave(sickLeave, 2017, 7, 'month');

                expect(res).toBe(4).toBeA('number');
            });

            it('should get sum sick leave with middle', () => {
                let sickLeave = [rows[1], rows[4]];
                var res = checkData.testSumSickLeave(sickLeave, 2017, 7, 'month');

                expect(res).toBe(9).toBeA('number');
            });

        });

        describe('#in the finish', () => {

            it('should get sum sick leave', () => {
                let sickLeave = [rows[5]];
                var res = checkData.testSumSickLeave(sickLeave, 2017, 7, 'month');

                expect(res).toBe(11).toBeA('number');
            });

            it('should get sum sick leave with middle', () => {
                let sickLeave = [rows[0], rows[5]];
                var res = checkData.testSumSickLeave(sickLeave, 2017, 7, 'month');

                expect(res).toBe(17).toBeA('number');
            });

        });

        describe('#in the finish', () => {

            it('should get sum sick leave', () => {
                let sickLeave = [rows[4], rows[5]];
                var res = checkData.testSumSickLeave(sickLeave, 2017, 7, 'allTime');

                expect(res).toBe(48).toBeA('number');
            });

        });

    });


});

