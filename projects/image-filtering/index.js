// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here

    applyFilterNoBackground(reddify);
    applyFilterNoBackground(decreaseBlue);
    applyFilterNoBackground(increaseGreenByBlue);

    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1 & 3: Create the applyFilter function here
    function applyFilter(filterFunction){
        for (var r = 0; r < image.length; r++) {
            for (var c = 0; c < image[r].length; c++) {
                var rgbString = image[r][c];
                var rgbNumbers = rgbStringToArray(rgbString);
                filterFunction(rgbNumbers);
                rgbString = rgbArrayToString(rgbNumbers);
                image[r][c] = rgbString;
            }
        }
    }

// TODO 5: Create the applyFilterNoBackground function
    function applyFilterNoBackground(filterFunction){

    var whiteBackgroundRgbCode = 150;
        for (var r = 0; r < image.length; r++) {
            for (var c = 0; c < image[r].length; c++) {
                var rgbString = image[r][c]; //pulls out the color string
                var rgbNumbers = rgbStringToArray(rgbString);
                if (rgbNumbers[RED] === whiteBackgroundRgbCode && //removes filter on the background
                    rgbNumbers[BLUE] === whiteBackgroundRgbCode &&
                    rgbNumbers[GREEN] === whiteBackgroundRgbCode){
                       rgbString = rgbArrayToString(rgbNumbers);  
                       image[r][c] = rgbString;                       
                }
                else{
                        filterFunction(rgbNumbers);
                        rgbString = rgbArrayToString(rgbNumbers);
                        image[r][c] = rgbString;
                }
            }
        }
    }

// TODO 2 & 4: Create filter functions

    function reddify(array){
        array[RED] = 225; //makes the entire picture really red
    }

    function decreaseBlue(array){
        array[BLUE] = array[BLUE] - 30; //makes the pixel less blue
        Math.max(array[BLUE], 0); //makes sure array[BLUE] doesn't dip under 0
    }

    function increaseGreenByBlue(array){
        array[GREEN] =  array[GREEN] + array[BLUE]; //makes the pixel an ungodly amount of green
        Math.min(array[GREEN], 255); //makes sure array[GREEN] doesn't go over 255
    }
// CHALLENGE code goes below here
