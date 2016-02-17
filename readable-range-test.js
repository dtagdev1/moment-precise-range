
describe("preciseDiff", function() {
    function test(d1, d2, result) {
        var dateRange = moment.preciseDiff(moment(d1, 'YYYY-MM-DD HH:mm:ss'), moment(d2, 'YYYY-MM-DD HH:mm:ss'));

        expect(dateRange.year).toBe(result.year);
        expect(dateRange.month).toBe(result.month);
        expect(dateRange.day).toBe(result.day);
        expect(dateRange.hour).toBe(result.hour);
        expect(dateRange.minute).toBe(result.minute);
        expect(dateRange.second).toBe(result.second);
    }

    describe("order", function() {
        it("same date", function() {
            test('2013-01-01 00:00:00', '2013-01-01 00:00:00', {year: 0, month: 0, day: 0, hour: 0, minute: 0, second: 0});
        });

        it("first date after second", function() {
            test('2013-01-01 00:00:01', '2013-01-01 00:00:00', {year: 0, month: 0, day: 0, hour: 0, minute: 0, second: 1});
        });

        it("second date after first", function() {
            test('2013-01-01 00:00:00', '2013-01-01 00:00:01', {year: 0, month: 0, day: 0, hour: 0, minute: 0, second: 1});
        });
    });

    describe("single/plural", function() {
        it("multiple seconds", function() {
            test('2013-01-01 00:00:00', '2013-01-01 00:00:02', {year: 0, month: 0, day: 0, hour: 0, minute: 0, second: 2});
        });

        it("one minute", function() {
            test('2013-01-01 00:00:00', '2013-01-01 00:01:00', {year: 0, month: 0, day: 0, hour: 0, minute: 1, second: 0});
        });

        it("multiple minutes", function() {
            test('2013-01-01 00:00:00', '2013-01-01 00:02:00', {year: 0, month: 0, day: 0, hour: 0, minute: 2, second: 0});
        });

        it("one hour", function() {
            test('2013-01-01 00:00:00', '2013-01-01 01:00:00', {year: 0, month: 0, day: 0, hour: 1, minute: 0, second: 0});
        });

        it("multiple hours", function() {
            test('2013-01-01 00:00:00', '2013-01-01 02:00:00', {year: 0, month: 0, day: 0, hour: 2, minute: 0, second: 0});
        });

        it("one day", function() {
            test('2013-01-01 00:00:00', '2013-01-02 00:00:00', {year: 0, month: 0, day: 1, hour: 0, minute: 0, second: 0});
        });

        it("multiple days", function() {
            test('2013-01-01 00:00:00', '2013-01-03 00:00:00', {year: 0, month: 0, day: 2, hour: 0, minute: 0, second: 0});
        });

        it("one month", function() {
            test('2013-01-01 00:00:00', '2013-02-01 00:00:00', {year: 0, month: 1, day: 0, hour: 0, minute: 0, second: 0});
        });

        it("multiple months", function() {
            test('2013-01-01 00:00:00', '2013-03-01 00:00:00', {year: 0, month: 2, day: 0, hour: 0, minute: 0, second: 0});
        });

        it("one year", function() {
            test('2013-01-01 00:00:00', '2014-01-01 00:00:00', {year: 1, month: 0, day: 0, hour: 0, minute: 0, second: 0});
        });

        it("multiple years", function() {
            test('2013-01-01 00:00:00', '2015-01-01 00:00:00', {year: 2, month: 0, day: 0, hour: 0, minute: 0, second: 0});
        })
    });

    describe("counting back", function() {
        it("seconds", function() {
            test('2013-01-01 00:02:10', '2013-01-01 00:03:05', {year: 0, month: 0, day: 0, hour: 0, minute: 0, second: 55});
        });
        it("minutes", function() {
            test('2013-01-01 02:10:00', '2013-01-01 03:05:00', {year: 0, month: 0, day: 0, hour: 0, minute: 55, second: 0});
        });
        it("hours", function() {
            test('2013-01-01 23:00:00', '2013-01-02 01:00:00', {year: 0, month: 0, day: 0, hour: 2, minute: 0, second: 0});
        });
        it("days", function() {
            test('2013-01-20 00:00:00', '2013-02-10 00:00:00', {year: 0, month: 0, day: 21, hour: 0, minute: 0, second: 0});
        });
        it("months", function() {
            test('2013-11-01 00:00:00', '2014-02-01 00:00:00', {year: 0, month: 3, day: 0, hour: 0, minute: 0, second: 0});
        });
    });

    describe("days across month boundaries", function() {
        it("start month has more days than last full month", function() {
            test('2013-01-31 00:00:00', '2013-03-01 00:00:00', {year: 0, month: 1, day: 1, hour: 0, minute: 0, second: 0});
            test('2013-01-30 00:00:00', '2013-03-01 00:00:00', {year: 0, month: 1, day: 1, hour: 0, minute: 0, second: 0});
            test('2013-01-29 00:00:00', '2013-03-01 00:00:00', {year: 0, month: 1, day: 1, hour: 0, minute: 0, second: 0});
            test('2013-01-28 00:00:00', '2013-03-01 00:00:00', {year: 0, month: 1, day: 1, hour: 0, minute: 0, second: 0});
            test('2013-01-27 00:00:00', '2013-03-01 00:00:00', {year: 0, month: 1, day: 2, hour: 0, minute: 0, second: 0});

            test('2013-05-31 00:00:00', '2013-07-01 00:00:00', {year: 0, month: 1, day: 1, hour: 0, minute: 0, second: 0});
            test('2013-05-30 00:00:00', '2013-07-01 00:00:00', {year: 0, month: 1, day: 1, hour: 0, minute: 0, second: 0});
            test('2013-05-29 00:00:00', '2013-07-01 00:00:00', {year: 0, month: 1, day: 2, hour: 0, minute: 0, second: 0});
        });
        it("start month has fewer days than last full month", function() {
            test('2013-04-29 00:00:00', '2013-08-01 00:00:00', {year: 0, month: 3, day: 3, hour: 0, minute: 0, second: 0});
            test('2013-04-30 00:00:00', '2013-08-01 00:00:00', {year: 0, month: 3, day: 2, hour: 0, minute: 0, second: 0});
            // no way to get '3 months 1 day' to 2013-08-01 
        });
        it("start month has same days as last full month", function() {
            test('2013-05-30 00:00:00', '2013-08-01 00:00:00', {year: 0, month: 2, day: 2, hour: 0, minute: 0, second: 0});
            test('2013-05-31 00:00:00', '2013-08-01 00:00:00', {year: 0, month: 1, day: 1, hour: 0, minute: 0, second: 0});
        });
    });

    describe("combinations", function() {
        it("all values", function() {
            test('2001-11-12 13:01:43', '2014-02-01 01:03:01', {year: 12, month: 2, day: 19, hour: 12, minute: 1, second: 18});
        });
        it("multiple values", function() {
            test('2013-10-21 10:15:40', '2014-02-02 01:01:01', {year: 0, month: 3, day: 11, hour: 14, minute: 45, second: 21});
            test('2013-12-31 23:58:10', '2014-01-01 00:02:08', {year: 0, month: 0, day: 0, hour: 0, minute: 3, second: 58});
            test('2013-12-31 04:08:20', '2014-01-01 01:02:03', {year: 0, month: 0, day: 0, hour: 20, minute: 53, second: 43});
            test('2013-12-27 05:10:20', '2014-01-02 06:12:30', {year: 0, month: 0, day: 6, hour: 1, minute: 2, second: 10});
            test('2013-10-21 10:15:40', '2014-02-02 01:01:01', {year: 0, month: 3, day: 11, hour: 14, minute: 45, second: 21});
            test('2013-11-02 01:00:40', '2014-02-02 01:01:01', {year: 0, month: 3, day: 0, hour: 0, minute: 0, second: 21});
        });
    });
});