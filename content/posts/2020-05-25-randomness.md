---
title: "Randomness"
slug: randomness
description: "The normal distribution doesn't match my gut"
date: 2020-05-26 10:51:13
author: Steve Shupe
tags:
    - Normal Distribution
    - Statistics
    - Probability
    - Randomness
cover: "https://ssshupe.com/wp-content/uploads/2020/05/GraphQLExplorer-1.jpg"
fullscreen: false
---

One interesting aspect of programming is having access to libraries and
functions that deal with statistics, probability,and randomness.

What I've found for myself when using these libraries is that my innate
"feeling" about probability and randomness is way off. In particular, if I
generate a succession of random elements, I find that _extreme events happen more frequently than my "gut" tells me they should._

I've developed a quick-and-dirty little program to show this.
Clicking the Random Number button below will return a random number from a normal
distribution having a mean (average) value of 50 and a standard deviation
of 20. For those who never took a statistics class (or who have forgotten
everything if they did), a [normal distribution](https://www.statsandr.com/blog/do-my-data-follow-a-normal-distribution-a-note-on-the-most-widely-used-distribution-and-how-to-test-for-normality-in-r/") is quite common in the world: It's the "bell-shaped curve" distribution
we're used to seeing. In a normal distribution, the [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation") value lets us know how "spread out" the distribution is. It also lets us calculate what percentage of values fall within certain ranges.

As noted, the distribution I've created has a mean of 50 and a standard
deviation of 20. The chart below shows the relationship between standard
deviation and percentiles. 68% of the values in a normal distribution fall
within one standard deviation of the mean, and 95% fall within two standard
deviations. Thus when you click the button, 68% of the time the random
number you get will fall between 30 and 70 (the mean of 50 plus and minus
the standard deviation of 20), and 95% will fall between 10 and 90 (the
mean of 50 plus or minus 40 [two times the standard deviation of 20]).

![](https://www.simplypsychology.org/Empirical-Rule.jpg?ezimgfmt=rs:555x303/rscb18/ng:webp/ngcb18)

I encourage you to take a few minutes and click the Random Number button
and watch the results go by. I just did it as a part of checking if this
page was functioning correctly. Within 10 clicks I received back a value
of -16. This number is more than three standard deviations from the mean.
Numbers outside of three standard deviations (that is, numbers less than
-10 or more than 110) should come up only 3 times out of 1000. Yet I got
one within 10 licks. That's randomness, and it's scary, because as much
as we'd like to comfort ourselves with the knowledge that 95% of values
are within 2 standard deviations, thus making us "safe" from rare events,
that's an _aggregate_ truth, not an individual one. As individuals, we don't
get to aggregate; we have to push the button and see what happens, one
result at a time.

Give it a try, and see how long it takes for you see a number outside of two deviations (less than 10 or more than 90) or outside of three deviations (less than -10 or more than 110).



<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script src= "http://chancejs.com/chance.min.js"></script>

<center><p>
<button onclick="randfunc()">
        Click For Random Number
    </button>
</p></center>

<center>
<p>Your random number (this time) is: <span id="rand">50</span></p>
</center>
<script>
        function randfunc() {
            document.getElementById("rand").innerHTML = Math.round(
                chance.normal({
                    mean: 50,
                    dev: 20
                })
            );
        }
</script>