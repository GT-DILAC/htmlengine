SIR Model README

The example.js file is the best place to start as it uses and explains all the key functions available in the SIR model source code.

If you wish to change the model directly, the SIRModel.bundle.js file is the place to look. It should only be modified after line 800 (var SIR_function) onwards.


Basic Information about the SIR Model:
The following will help you learn what the basic SIR Model is.

The SIR Model is an epidemiological model consisting of three dependent parameters:
- The Susceptible fraction of the population (S) over time, i.e,. those who have not yet contracted the virus
– The Infected fraction of the population (I) over time, i.e,. those who have the virus
– The Recovered fraction of the population (R) over time, i.e., those who had the virus, but have healed and cannot get the virus again

These three parameters are calculated over time using the following independent parameters:
– The number of days that you want to observe the pandemic for
– Transmission rate of the virus, 
– Recovery rate (usually 1/days),
– Initial Susceptible Fraction (S0), 
– Initial Infected Fraction (I0)

Once you have the S, I, R fractions for each day and shift, then you can use the information to calculate the chances of getting infected (see example.js). These fractions will tell you what the status of the people in a location is generally like. For example, if: 
S = 0.5 (50%), 
I = 0.4 (40%), and 
R = 0.1 (10%) on a given day and place, 
Then for a total of 10 people in that place, you can expect: 
Total Susceptible People = S x Total people = 0.5 x 10 = 5
Total Infected People = I x Total people = 0.4 x 10 = 4
Total Recovered People = R x Total people = 0.1 x 10 = 1

Once you know the number of infected people in a location, then you can assume probabilities of running into those people (Probability of Contact) and your catching the infection from them (Probability of Catching Infection). Using these probabilities, you can gauge your chance of being infected by: 
Total Infected People at location = Total People at location x I 
Probability of Getting Infected = Total Infected People x Probability of Contact x Probability of Catching Infection

So if there were 4 infected people, and the probability of running into them was 0.3, and the probability of catching infection which is usually around 0.05, then:
Probability of Getting Infected = 4 x 0.3 x 0.05 = 0.06 or 6%

On the other hand, you can also choose to not use the S, I, R calculation and simply calculate the chance of infection if you already know how many infected people are present. For example, if you know there are 6 total infected people at a location, then you may directly use:
Probability of Getting Infected = Total Infected People (6) x Probability of Contact x Probability of Catching Infection



