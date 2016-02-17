# moment-precise-range
<p>
Using the plugin, we can display the exact difference using the same 2 dates:
</p>

<pre>
var m1 = moment('2014-01-01 12:00:00','YYYY-MM-DD HH:mm:ss');
var m2 = moment('2014-02-03 15:04:05','YYYY-MM-DD HH:mm:ss');
var diff = moment.preciseDiff(m1, m2); // return object {year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5}
</pre>

