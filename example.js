/**the sirModel.CityParams function sets the initial conditions and independent parameters of a city: 
 * Transmission rate, 
 * Total Days that you want t, observe the pandemic form
 * Recovery rate (1/days), 
 * Initial Susceptible Fraction (S0), 
 * Initial Infected Fraction (I0)*/
var transmissionRate = 0.3;
var totalDays = 21;
var shiftsPerDay = 2;
var recoveryRate = 1/totalDays;
var S0 = 0.933;
var I0 = 0.0611;
var NewYorkParams = new sirModel.CityParams(0.3, 1 / 14, 0.933, 0.0661);

/** The sirModel.SIRMODEL function calculates the SIR values 
 * for the given city 
 * for the given number of days,
 * for the given shifts per day 
It stores them in a totalShifts x 3 array */
var newYorkSIRData = sirModel.SIRMODEL(NewYorkParams, totalDays, shiftsPerDay);


/** The sirModel.Infection_prob_city function returns the probability of infection for a given location using: 
    a given city's SIR data (e.g., newYorkSIRData defined above), 
    the current day since start of game starting with first day as 1 (e.g., 18)
    the current shift number on that day (e.g., 1 (Morning) or 2 (Afternoon), etc), 
    total number of people at the location (e.g., 30), 
    probability of coming into contact with an infected person at that location (e.g., 0.3)
    probability that contact with an infected person will spread infection (usually 0.05)

    This function uses the first 4 parameters to calculate how many sick people are there in a location.
    It then multiplies that answer with the probability of contacting them and the probability of infection spreading upon contact with them.
    */
var currentDay = 20;
var currentShift = 1;
var numPeopleAtLocation = 30;
var contactProb = 0.3;
var infectiousContactProb = 0.05;
var infectionProb = sirModel.Infection_prob_city(newYorkSIRData,currentDay,currentShift,numPeopleAtLocation,contactProb,infectiousContactProb);


//The sirModel.IsInfection function takes infection probability as an input and returns true or false depending on whether one gets infected */
var isInfected = sirModel.IsInfected(infectionProb);

//The sirModel.CurrentSIRData function returns the percentage Susceptible (S), Infected (I), and Recovered (R) fractions of the population
var currentSIR = sirModel.CurrentSIRData(newYorkSIRData, currentDay, currentShift);
var currentSusceptible = currentSIR[0];
var currentInfected = currentSIR[1];
var currentRecovered = currentSIR[2];


/** Display infection probability and if a person gets infected. 
 *  Refresh the index page in the browser to see different results for whether you got infected*/
console.log("Fraction of population susceptible in New York on day" + currentDay + " shift " + currentShift + ": " + currentSusceptible);
console.log("Fraction of population infected in New York on day" + currentDay + " shift " + currentShift + ": " + currentInfected);
console.log("Fraction of population recovered in New York on day" + currentDay + " shift " + currentShift + ": " + currentRecovered);
console.log("Probability of being infected in a place with " + numPeopleAtLocation + " people in New York." + infectionProb);
console.log("Are you infected?: " + isInfected);

document.getElementById("infectedProb").innerHTML = infectionProb;
document.getElementById("infected").innerHTML = isInfected;


/** If you already know how many sick people are in a given location, 
 * then you can use the sirModel.Infection_prob_local function to calculate the probability of infection at a given location. 
 * This function only needs three inputs:
 * the number of sick people in the location (e.g., 30)
 * probability of coming into contact with any person at that location (e.g., 0.8)
 * probability that contact with an infected person will spread infection (usually 0.05)
 */
var numSickPeople = 40;
var contactProb2 = 0.3;
var infectiousContactProb2 = 0.05;

var infectionProb2 = sirModel.Infection_prob_local(numSickPeople, contactProb2, infectiousContactProb2);
var isInfected2 = sirModel.IsInfected(infectionProb2);

console.log("Probability of being infected in a place with " + numSickPeople + " people in New York: " + infectionProb2);
console.log("Are you infected?: " + isInfected2);

document.getElementById("infectedProb2").innerHTML = infectionProb2;
document.getElementById("infected2").innerHTML = isInfected2;