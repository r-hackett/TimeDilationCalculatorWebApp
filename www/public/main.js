const t0Input = document.getElementById("t0-input");
const t0UnitButton = document.getElementById("t0-unit-button");
const t0SecsUnit = document.getElementById("t0-secs-unit");
const t0YearsUnit = document.getElementById("t0-years-unit");

const vInput = document.getElementById("v-input");
const vUnitButton = document.getElementById("v-unit-button");
const vMsUnit = document.getElementById("v-ms-unit");
const vKmsUnit = document.getElementById("v-kms-unit");
const vMphUnit = document.getElementById("v-mph-unit");
const vCUnit = document.getElementById("v-c-unit");

const tInput = document.getElementById("t-input");
const tUnitButton = document.getElementById("t-unit-button");
const tSecsUnit = document.getElementById("t-secs-unit");
const tYearsUnit = document.getElementById("t-years-unit");

const calculateButton = document.getElementById("calculate-button");

initialise();

t0SecsUnit.addEventListener('click', function (event) {
    t0UnitButton.innerText = "secs";
    console.log("t0-secs-unit clicked");
});

t0YearsUnit.addEventListener('click', function (event) {
    t0UnitButton.innerText = "years";
    console.log("t0-years-unit clicked");
});

////////////////////////////////////////

vMsUnit.addEventListener('click', function (event) {
    vUnitButton.innerText = "m/s";
    console.log("v-ms-unit clicked");
});

vKmsUnit.addEventListener('click', function (event) {
    vUnitButton.innerText = "km/s";
    console.log("v-kms-unit clicked");
});

vMphUnit.addEventListener('click', function (event) {
    vUnitButton.innerText = "mph";
    console.log("v-mph-unit clicked");
});

vCUnit.addEventListener('click', function (event) {
    vUnitButton.innerText = "%c";
    console.log("v-c-unit clicked");
});

////////////////////////////////////////

tSecsUnit.addEventListener('click', function (event) {
    tUnitButton.innerText = "secs";
    console.log("t-secs-unit clicked");
});

tYearsUnit.addEventListener('click', function (event) {
    tUnitButton.innerText = "years";
    console.log("t-years-unit clicked");
});

////////////////////////////////////////

cms = BigNumber("299792458");
ckms = BigNumber("299792.458");
cmph = BigNumber("670616629.38444444444444444");

calculateButton.addEventListener('click', function (event) {
    console.log("calculate-button clicked")

    t0 = NaN;
    v = NaN;

    if (validate()) {
        switch(t0UnitButton.innerText) {
            case "secs":
                t0 = BigNumber(t0Input.value).dividedBy("31556952"); // One Gregorian calendar year has 365.2425 days
                break;

            case "years":
                t0 = BigNumber(t0Input.value);
                break;
        }

        switch(vUnitButton.innerText) {
            case "m/s":
                v = BigNumber(vInput.value).dividedBy(cms);                     
                break;

            case "km/s":
                v = BigNumber(vInput.value).dividedBy(ckms);                
                break;

            case "mph":
                v = BigNumber(vInput.value).dividedBy(cmph);                
                break;

            case "%c":
                v = BigNumber(vInput.value).dividedBy(100);
                break;                
        }

        r = timeDilation(t0, v);

        console.log(t0.toFormat(t0.decimalPlaces()));
        console.log(v.toFormat(v.decimalPlaces()));
        console.log(r.toFormat(r.decimalPlaces()));

        switch(tUnitButton.innerText) {
            case "secs":
                r = r.multipliedBy("31556952");           
                break;

            case "years":
                // timeDilation returns the time in years. No conversion necessary           
                break;             
        }

        tInput.value = r.toFormat(r.decimalPlaces());
    }
});

// calculates t0 / sqrt(1 - (v / c)^2)
// c is normalised to 1 so it's ignored in the calculation
function timeDilation(t0, v) {
	return t0.dividedBy(BigNumber(1 - v.multipliedBy(v)).squareRoot());
}

function validate() {
    t0 = BigNumber(t0Input.value);

    if (t0.isNaN()) {
        window.alert("t0 is invalid");
        return false;
    }

    v = BigNumber(vInput.value);

    if (v.isNaN()) {
        window.alert("v is invalid");
        return false;
    }

    if ((vUnitButton.innerText == "m/s" && !v.isLessThanOrEqualTo(cms)) ||
        (vUnitButton.innerText == "km/s" && !v.isLessThanOrEqualTo(ckms)) ||
        (vUnitButton.innerText == "mph" && !v.isLessThanOrEqualTo(cmph))) {
        window.alert("v must must be less than or equal to the speed of light");
        return false;
    }

    if (vUnitButton.innerText == "%c" && !v.isLessThanOrEqualTo(100)) {
        window.alert("v must must be a value between 0 and 100");
        return false;
    }

    return true;
}

function initialise() {

}
