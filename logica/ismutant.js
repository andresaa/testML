//valida que las columnas sean del mismo tamaño de las filas
function validateGrid(data) { 
    let sizeCol = data.length;
    return data.filter(line => line.length !== sizeCol);
}
//convierte el objeto entrante en el event en una matriz
function convertToGrid(data) {
    let insert = [];
    data.map(sequence => insert.push(sequence.split('')));
    return (insert);
};
//funcion que permite obtener matrices de 4x4 partiendo de la matriz inicial que llega en el evento
function snapshot(grid, x, y, w, h) {
    return grid.slice(y, y + h).map(a => a.slice(x, x + w));
}
//transpones las filas y las columnas y llama la funcion "validateRows"
function validateColumns(grid) {
    let result = [];
    for (let index = 0; index < 4; index++) {
        result.push(grid.map(x => x[index]));
    }
    return(validateRows(result));
}
//Valida el numero de filas en las cuales todos sus elementos son iguales
function validateRows(grid) {
    const initialValue = 0;
    let result = grid.map(x => { 
        return isEqual(x)
    })
    let  summation = result.reduce((previousValue, currentValue) =>
        previousValue + currentValue, initialValue);
    return (summation >= 2? true:summation)
}
//Valida si los elementos del array son iguales
function isEqual(element, index, array) {
    return element.every((val, i, arr) => val === arr[0]) === true ? 1 : 0
}

//obtiene la diagonal principal y llama la funcion "isEqual"
function mainDiagonal(grid, n) {
    let result = [];
    for (let index = 0; index < n; index++) {
        result.push(grid[index][index]);
    }
    return(isEqual(result))
}
//obtiene la diagonal segundaria y llama la funcion "isEqual"
function secondaryDiagonal(grid, n) {
    let result = [];
    let k = n-1;
    for (let index = 0; index < n; index++) {
        result.push(grid[index][k--]);
    }
    return(isEqual(result))
}
//principal
function principal(matriz, n) {
    let count = 0;
    let verticalsMatches = validateColumns(matriz);
    console.log(!!verticalsMatches, "33333333333")
    if (!verticalsMatches) {
        count = verticalsMatches;
        let horizontalMatches = validateRows(matriz);
        if (!!horizontalMatches) {
            count = count + horizontalMatches;
        } else if (count === 2) {
            return true;
        } else { 
            let numberVerticalleft = mainDiagonal(matriz, n);
            count = count + numberVerticalleft
            if (count < 2) {
                let numberVerticalRigth = secondaryDiagonal(matriz, n);
                count = count + numberVerticalRigth
                if (count < 2) {
                    return count;
                }
            } else { 
                return true;
            }

        }
    } else { 
        return true;
    }
}
let n = 4;
let matchingStrings = 0;
let data = ["AAAAGA", "AAAAGC", "AAAAGT", "AAAAGG", "ACCCTA", "ACACTG"];
let dataOk = validateGrid(data)
if (dataOk.length > 0) {
    console.log("data inconsistente")
} else { 
    try {
        let grid = convertToGrid(data);
        let matriz = snapshot(grid, 0, 0, 4, 4);
        let validateTotal = principal(matriz, n);
        console.log(validateTotal)
        if (validateTotal) {
            console.log("200, es mutante")
            
        } else {
            //
            console.log("ejecute funcion para revisar la siguiente Matriz")
        }

    } catch(error) { 
        console.log(error)
    }
    
}





/*function lineValid(data) { 
    return data.map(line => line.match(/[ATCG]/));
}*/






