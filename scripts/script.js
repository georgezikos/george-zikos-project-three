// Namespace

// const macroApp = {};
$(document).bind('keypress', function(e) {
    if (e.keyCode == 13) {
        $($getStarted).trigger('click');
    }
});

const $getStarted = $('#get-started');
$getStarted.on('click', function(){
    const $fullName = $('#full-name').val();
    const $emailAddress = $('#email-address').val();
    if ($fullName.length === 0 || $emailAddress.length === 0) {
        // Is there RegEx for validating emails, instead of just relying on string length?
        alert('Empty String!');
    } else {
        const firstName = $fullName.replace(/ .*/,'');
        $('.main-heading--results').html(`${firstName}, this is the best place to start:`)
        const $currentFormStage = $(this).parent();
        const $nextFormStage = $(this).parent().next();
        $('.form__progress .progress__stage').eq($('.form__stage').index($nextFormStage)).addClass('progress__stage--current');
        $nextFormStage.show();
        $currentFormStage.hide();    
        const $chooseMetric = $('input[id="metric"]');
        $($chooseMetric).on('click', function() {
            $('#body-weight').attr('placeholder', 'In Pounds');
        });
        const $chooseImperial = $('input[id="imperial"]');
        $($chooseImperial).on('click', function() {
            $('#body-weight').attr('placeholder', 'In Kilograms');
        });
        $('.choice-group--male').hide();
        $('.choice-group--female').hide();
        const $chooseMale = $('input[id="gender-male"]');
        $($chooseMale).on('click', function() {
            $('.choice-group--male').toggle();
            $('.choice-group--female').hide();
        });
        const $chooseFemale = $('input[id="gender-female"]');
        $($chooseFemale).on('click', function() {
            $('.choice-group--female').toggle();
            $('.choice-group--male').hide();
            $('input[id="lose-fat"]').removeAttr('value').attr('value', '10');
            $('input[id="recomp"]').removeAttr('value').attr('value', '12');
            $('input[id="lean-gain"]').removeAttr('value').attr('value', '14');
        });
        const $previousButton = $('.button--previous');
        $($previousButton).on('click', function() {
            const $currentFormStage = $(this).parents('.form__stage');
            const $previousFormStage = $(this).parents('.form__stage').prev();
            $('.form__progress .progress__stage').eq($('.form__stage').index($currentFormStage)).removeClass('progress__stage--current');
            $previousFormStage.show();
            $currentFormStage.hide();
        });
        const $nextButton = $('#next');
        $($nextButton).on('click', function() {
            const $currentFormStage = $(this).parents('.form__stage');
            const $nextFormStage = $(this).parents('.form__stage').next();
            $('.form__progress .progress__stage').eq($('.form__stage').index($nextFormStage)).addClass('progress__stage--current');
            $currentFormStage.hide();
            $nextFormStage.show();
        });
        const $submitButton = $('#submit');
        $($submitButton).on('click', function() {
            const $currentFormStage = $(this).parents('.form__stage');
            const $resultsStage = $(this).parents('.calculator-results__form').next();
            // console.log($resultsStage);
            $('.form__progress').hide();
            $currentFormStage.hide();
            $resultsStage.show().children().show();
            const bodyWeight = parseInt($('#body-weight').val(), 10);
            const unitMeasurement = parseFloat($('input[name="unit-measure"]:checked').val());
            if (unitMeasurement > 2) {
                const newBodyWeight = bodyWeight * unitMeasurement;
                const bodyFat = parseFloat($('input[name="bodyfat-choice"]:checked').val(), 10);
                const goal = parseInt($('input[name="goal-choice"]:checked').val(), 10);
                const minFatCals = (newBodyWeight * 0.3) * 9;
                const minCarbCals = (newBodyWeight * 0.5) * 4;
                const minEnergyCals = minFatCals + minCarbCals;
                const proteinCals = (newBodyWeight * bodyFat) * 4;
                const finalCals = Math.floor(goal * newBodyWeight);
                const finalEnergyCals = finalCals - proteinCals;
                const safeEnergyCals = finalEnergyCals - minEnergyCals;
                // console.log(finalCals);
                if (safeEnergyCals < 0) {
                    const finalProteinCals = Math.floor(proteinCals + safeEnergyCals);
                    const distroCals = Math.floor(proteinCals - finalProteinCals);
                    const finalFatCals = Math.floor(distroCals * 0.5 + minFatCals);
                    const finalCarbCals = Math.floor(distroCals * 0.5 + minCarbCals);
                    const proteinGrams = Math.floor(finalProteinCals / 4);
                    const fatGrams = Math.floor(finalFatCals / 9);
                    const carbGrams = Math.floor(finalCarbCals / 4);
                    const waterIntake = Math.floor(newBodyWeight / 50);
                    const fibreIntake = Math.floor((finalCals / 1000) * 10);
                    $('.results__protein').html(`${proteinGrams}g`);
                    $('.results__fats').html(`${fatGrams}g`);
                    $('.results__carbs').html(`${carbGrams}g`);
                    $('.results__fibre').html(`${fibreIntake}g`);
                    $('.results__water').html(`${waterIntake}g`);
                    $('.results__calories').html(`${finalCals.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}g`);
                    // console.log(proteinGrams);
                    // console.log(fatGrams);
                    // console.log(carbGrams);
                    // console.log(waterIntake);
                    // console.log(fibreIntake);
                } else {
                    const finalFatCals = Math.floor(safeEnergyCals * 0.5 + minFatCals);
                    const finalCarbCals = Math.floor(safeEnergyCals * 0.5 + minCarbCals);
                    const proteinGrams = Math.floor(proteinCals / 4);
                    const fatGrams = Math.floor(finalFatCals / 9);
                    const carbGrams = Math.floor(finalCarbCals / 4);
                    const waterIntake = Math.floor(bodyWeight / 50);
                    const fibreIntake = Math.floor((finalCals / 1000) * 10);
                    $('.results__protein').html(`${proteinGrams}g`);
                    $('.results__fats').html(`${fatGrams}g`);
                    $('.results__carbs').html(`${carbGrams}g`);
                    $('.results__fibre').html(`${fibreIntake}g`);
                    $('.results__water').html(`${waterIntake}L`);
                    $('.results__calories').html(`${finalCals.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`);
                    // console.log(proteinGrams);
                    // console.log(fatGrams);
                    // console.log(carbGrams);
                    // console.log(waterIntake);
                    // console.log(fibreIntake);
                };
            } else {
                const bodyWeight = parseInt($('#body-weight').val(), 10);
                const bodyFat = parseFloat($('input[name="bodyfat-choice"]:checked').val(), 10);
                const goal = parseInt($('input[name="goal-choice"]:checked').val(), 10);
                const minFatCals = (bodyWeight * 0.3) * 9;
                const minCarbCals = (bodyWeight * 0.5) * 4;
                const minEnergyCals = minFatCals + minCarbCals;
                const proteinCals = (bodyWeight * bodyFat) * 4;
                const finalCals = goal * bodyWeight;
                const finalEnergyCals = finalCals - proteinCals;
                const safeEnergyCals = finalEnergyCals - minEnergyCals;
                // console.log(finalCals);
                if (safeEnergyCals < 0) {
                    const finalProteinCals = Math.floor(proteinCals + safeEnergyCals);
                    const distroCals = Math.floor(proteinCals - finalProteinCals);
                    const finalFatCals = Math.floor(distroCals * 0.5 + minFatCals);
                    const finalCarbCals = Math.floor(distroCals * 0.5 + minCarbCals);
                    const proteinGrams = Math.floor(finalProteinCals / 4);
                    const fatGrams = Math.floor(finalFatCals / 9);
                    const carbGrams = Math.floor(finalCarbCals / 4);
                    const waterIntake = Math.floor(bodyWeight / 50);
                    const fibreIntake = Math.floor((finalCals / 1000) * 10);
                    $('.results__protein').html(`${proteinGrams}g`);
                    $('.results__fats').html(`${fatGrams}g`);
                    $('.results__carbs').html(`${carbGrams}g`);
                    $('.results__fibre').html(`${fibreIntake}g`);
                    $('.results__water').html(`${waterIntake}g`);
                    $('.results__calories').html(`${finalCals.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}g`);
                    // console.log(proteinGrams);
                    // console.log(fatGrams);
                    // console.log(carbGrams);
                    // console.log(waterIntake);
                    // console.log(fibreIntake);
                } else {
                    const finalFatCals = Math.floor(safeEnergyCals * 0.5 + minFatCals);
                    const finalCarbCals = Math.floor(safeEnergyCals * 0.5 + minCarbCals);
                    const proteinGrams = Math.floor(proteinCals / 4);
                    const fatGrams = Math.floor(finalFatCals / 9);
                    const carbGrams = Math.floor(finalCarbCals / 4);
                    const waterIntake = Math.floor(bodyWeight / 50);
                    const fibreIntake = Math.floor((finalCals / 1000) * 10);
                    $('.results__protein').html(`${proteinGrams}g`);
                    $('.results__fats').html(`${fatGrams}g`);
                    $('.results__carbs').html(`${carbGrams}g`);
                    $('.results__fibre').html(`${fibreIntake}g`);
                    $('.results__water').html(`${waterIntake}L`);
                    $('.results__calories').html(`${finalCals.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`);
                    // console.log(proteinGrams);
                    // console.log(fatGrams);
                    // console.log(carbGrams);
                    // console.log(waterIntake);
                    // console.log(fibreIntake);
                };
            }
        });
        $('#reset').on('click', function() {
            $('#calculator').trigger('reset');
            location.reload();
        });
    }
})


// Init
// macroApp.init = function() {
    //
// }

// Document Ready
// $(function() {
//     // init
// });
