function findObjectByKey(dataArray, property, matchValue) { //Accepts objects [dataArray], property [text string], and property matchValue [text string]. If any object in the [dataArray] contains [property] name AND its value matches the [matchValue], return current object. 
    for (var i = 0; i < dataArray.length; i++) {
        if (matchValue === dataArray[i][property]) {
            return dataArray[i];
        }
    }
}

function doesObjectExist(dataArray, property, matchValue) { //Accepts objects [dataArray], property [text string], and property matchValue [text string]. If any object in the [dataArray] contains [property] name AND its value matches the [matchValue], return true.
    var ret = false;
    if (dataArray) {
        for (var i = 0; i < dataArray.length; i++) {
            if (matchValue === dataArray[i][property]) {
                ret = true;
                break;
            }
        }
    }
    return ret;
}

function doesValueExist(stringArray, matchValue) { //Accepts string Array object[stringArray], and matchValue [text string]. If any item [dataArray] equals the [matchValue] return a true value else return false for no match.
    var ret = false;
    if (stringArray) {
        for (var i = 0; i < stringArray.length; i++) {
            if (matchValue === stringArray[i]) {
                ret = true;
                break;
            }
        }
    }
    return ret;
}

function doesValueExistPosition(stringArray, matchValue) { //Accepts string Array object[stringArray], and matchValue [text string]. If any item [dataArray] equals the [matchValue] return a true value and the position in the array of the matched item.
    var ret = false;
    var position;
    if (stringArray) {
        for (var i = 0; i < stringArray.length; i++) {
            if (matchValue === stringArray[i]) {
                ret = true;
                position = i;
                break;
            }
        }
    }
    return [ret, position];
}

function join(mainTable, mergeTables, mainKeys, matchKeys, ignoreProperties) { //[object], [object array], [object array], [object array], [object array]

    for (h = 0; h < mergeTables.length; h++) { // Count number of tables in [mergeTables] object array. This value is also used as a reference to match [mainKey] value of the mainTable to [matchKey] in current mergeTable.

        for (i = 0; i < mainTable.length; i++) { // For however number of items in the [mainTable]
            var lookupValue = mainTable[i][mainKeys[h]];
            var matchedObject;

            for (j = 0; j < mergeTables[h].length; j++) {
                if ((mergeTables[h])[j][matchKeys[h]] == mainTable[i][mainKeys[h]]) { // Test if the current item in the [mainTable]' [mainKeys] matches with the current [mergeTable]' current item by the current [matchKeys] as indexed by [h]
                    matchedObject = (mergeTables[h])[j]; // If match, use current item as reference to add all of its properties to the [mainTable]
                    break; // If match found, stop current loop.
                }
            }

            if (matchedObject) {
                for (k = 0; k < Object.keys(matchedObject).length; k++) {
                    var currentKey = Object.keys(matchedObject)[k]; // Retrieve current key from matched item to be used to determine if it is found in the ingoreProperties array to skip.
                    if (ignoreProperties && ignoreProperties.indexOf(currentKey) == -1) {
                        mainTable[i][currentKey] = matchedObject[currentKey]; // if any properties ignore, skip them and continue adding current property to main table
                    } else if (!ignoreProperties) {
                        mainTable[i][currentKey] = matchedObject[currentKey]; // if no properties to ignore, add every possible property from current table to main table
                    }
                }
            }
        }
    }
    return mainTable;
};