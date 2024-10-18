const menu = document.querySelector("select.menu");
const unitSelect = document.querySelectorAll(".units");
const btn = document.querySelector(".convert-btn");
const input = document.querySelector(".input");
const fromOpt = document.querySelector(".from");
const toOpt = document.querySelector(".to");
const result = document.querySelector(".result");

const menuOpt = {
    Length: "len",
    Time: "time",
    Weight: "weight",
    Area: "area",
    Power: "power",
    Energy: "energy",
    Volume: "volume",
    Speed: "speed"
}

for (const key in menuOpt) {
    const menuElement = document.createElement("option");
    menuElement.text = key;
    menuElement.value = menuOpt[key];
    menu.appendChild(menuElement);
}

// initial values
let conversionVal = "len";
let conversionFactor = {  // A conversion factor is a value used to convert one unit to another.
    kilometer: 1000,     // each key represents a unit of measurement
    meter: 1,           // and the associated value is the conversion factor for that corresponding unit.
    centimeter: 0.01,
    millimeter: 0.001
};

// Change the select options function
menu.addEventListener("change", function () {
    conversionVal = this.value;
    //reset options
    unitSelect.forEach(list => list.innerHTML = "");
    //reset inputs
    result.value = "";
    input.value = "";
    let units;
    switch (conversionVal) {
        case "len":
            units = ["meter", "kilometer", "centimeter", "millimeter"];
            conversionFactor = {
                kilometer: 1000,
                meter: 1,
                centimeter: 0.01,
                millimeter: 0.001
            };
            break;
        case "time":
            units = ["second", "minute", "hour", "millisecond"];
            conversionFactor = {
                hour: 3600,
                minute: 60,
                second: 1,
                millisecond: 0.001
            };
            break;
        case "weight":
            units = ["gram", "kilogram", "milligram", "microgram", "metricTon", "pound"];
            conversionFactor = {
                gram: 1,
                kilogram: 1000,
                milligram: 0.001,
                microgram: 0.000001,
                metricTon: 1000000,
                pound: 453.592
            };
            break;
        case "power":
            units = ["watt", "kilowatt", "megawatt", "horsepower"];
            conversionFactor = {
                watt: 1,
                kilowatt: 1000,
                megawatt: 1000000,
                horsepower: 745.7
            };
            break;
        case "energy":
            units = ["joule", "kilojoule", "megajoule", "calorie", "kilocalorie", "wattHour", "kilowattHour"];
            conversionFactor = {
                joule: 1,
                kilojoule: 1000,
                megajoule: 1000000,
                calorie: 4.184,
                kilocalorie: 4184,
                wattHour: 3600,
                kilowattHour: 3600000
            };
            break;
        case "volume":
            units = ["cubicMeter", "liter", "milliliter", "cubicCentimeter", "cubicInch", "gallon", "quart", "pint"];
            conversionFactor = {
                cubicMeter: 1,
                liter: 0.001,
                milliliter: 0.000001,
                cubicCentimeter: 0.000001,
                cubicInch: 0.0000163871,
                gallon: 0.00378541,
                quart: 0.000946353,
                pint: 0.000473176
            };
            break;
        case "area":
            units = ["squareMeter", "squareKilometer", "squareCentimeter", "squareMillimeter"];
            conversionFactor = {
                squareMeter: 1,
                squareKilometer: 1000000,
                squareCentimeter: 0.0001,
                squareMillimeter: 0.000001
            };
            break;
        case "speed":
            units = ["meterPerSecond", "kilometerPerHour", "milePerHour", "footPerSecond", "knot"];
            conversionFactor = {
                meterPerSecond: 1,
                kilometerPerHour: 0.277778,
                milePerHour: 0.44704,
                footPerSecond: 0.3048,
                knot: 0.514444
            };
            break;
        default:
            units = ["..."];
    }
    unitSelect.forEach(list => {
        units.forEach(unit => {
            const optionElement = document.createElement("option");
            optionElement.text = unit;
            optionElement.value = unit;
            list.appendChild(optionElement);
        });
    });
});

// conversion function
function convertFunction(inputValue, fromOptVal, toOptVal) {
    // Calculate the initial conversion value by multiplying the input value with the conversion factor chose due to the "from" unit.
    const initialConversionVal = inputValue * conversionFactor[fromOptVal];
    // Calculate the final conversion value by dividing the initialConversionVal by the conversion factor chose due to the "to" unit.
    const finalConversionVal = initialConversionVal / conversionFactor[toOptVal];
    result.value = finalConversionVal;
}
btn.addEventListener("click", function () {
    let valAfterParse = Number(input.value);
    let fromOptVal = fromOpt.value;
    let toOptVal = toOpt.value;
    if (fromOptVal == "" || toOptVal == "") {
        Swal.fire({
            html: '<span style="font-size: 18px;">Please Choose Units..</span>',
            confirmButtonColor: '#01c847',
            showClass: {
                popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
                popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
        });
    } else if (isNaN(valAfterParse) || valAfterParse == 0) {
        // Alert
        result.value = "";
        Swal.fire({
            html: '<span style="font-size: 18px;">Please Enter a Numeric Value..</span>',
            confirmButtonColor: '#01c847',
            showClass: {
                popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
                popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
        });
    } else {
        convertFunction(valAfterParse, fromOptVal, toOptVal);
    }
})

// Clear the result whenever the user selects a different "to" unit
toOpt.addEventListener("change", function () {
    result.value = "";
})

