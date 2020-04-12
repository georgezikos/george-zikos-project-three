/**
 *  Basic Macronutrient Calculator
 *  Ideally the finished product will be a multi-step form that is ultimately functioning as a calculator
 *  I'll achieve the multi-step functionality with a slider javascript library or jquery/vanilla js
 *  If this isn't practical, I'll instead go with a vertical form that builds out in the DOM with each step
 *  The end calculation will be the users ideal macronutrient and calorie allotment for their specified goal of fat loss, recomposition or lean gains
 *  
 *  First step of the form is going looking for the users bodyweight returned as a number that will be stored in a bodyWeight variable
 *  Second step of the form is a conditional choice between male and female; I don't need this answer stored, it's just to direct the next steps
 *  In the third step male's and female's each have 8 choices, each choice correlates with a number value to be stored in a bodyFat variable on the back end
 *  In the fourth step all user's have to choose their specific goal, each goal also correlates with a number value to be stored in a goal variable on the back end
 *  A look into the logic that's being run on the values given to us by the user:
 *  
 *  minFatCals = (bodyWeight * 0.3) * 9;
 *  minCarbCals = (bodyWeight * 0.5) * 4;
 *  minEnergyCals = minFatCals + minCarbCals;
 *  proteinCals = (bodyWeight * bodyFat) * 4;
 *  finalCals = goal * bodyWeight;
 *  finalEneryCals = finalCals - proteinCals;
 *  safeEnergyCals = finalEnergyCals - minEnergyCals;
 *  
 *  if safeEnergyCals < 0
 *      finalProteinCals = proteinCals + safeEnergyCals;
 *      distroCals = proteinCals - finalProteinCals;
 *      finalFatCals = distroCals * 0.5 + minFatCals;
 *      finalCarbCals = distroCals * 0.5 + minCarbCals;
 *      proteinGrams = finalProteinCals / 4;
 *      fatGrams = finalFatCals / 9;
 *      carbGrams = finalCarbCals / 4;
 *  else if safeEnergyCals > 0
 *      finalFatCals = safeEnergyCals * 0.5 + minFatCals
 *      finalCarbCals = safeEnergyCals * 0.5 + minCarbCals
 *      proteinGrams = proteinCals / 4
 *      fatGrams = finalCatCals / 9
 *      carbGrams = finalCarbCals / 4
 *  
 *  waterIntake = bodyWeight / 50;
 *  fibreIntake = (finalCals / 100) * 10;
 *  
 *  Finally, I'll display the results held in these variables to the user in the DOM on the results page:
 *  finalCals, proteinGrams, fatGrams, carbGrams, waterIntake, fibreIntake
 */