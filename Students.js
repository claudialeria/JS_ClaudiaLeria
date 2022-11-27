import readline from 'readline';
import { isInt16Array } from 'util/types';

const students = [{
    age: 32,
    examScores: [2, 3, 4, 10],
    gender: 'male',
    name: 'edu'
  },
  {
    age: 34,
    examScores: [],
    gender: 'female',
    name: 'silvia'
  },
  { 
    age: 29, 
    examScores: [6, 7, 10], 
    gender: 'male', 
    name: 'carlos' 
  },
  { 
    age: 45, 
    examScores: [2, 3, 1], 
    gender: 'male', 
    name: 'victor' 
  },
  { 
    age: 31, 
    examScores: [1, 1, 1], 
    gender: 'female', 
    name: 'isabel' 
  },
  { 
    age: 32, 
    examScores: [2, 3, 2], 
    gender: 'male', 
    name: 'carlos' 
  },
  { 
    age: 13, 
    examScores: [1, 2, 2], 
    gender: 'female', 
    name: 'silvia' 
  },
  { 
    age: 25, 
    examScores: [3, 2, 1], 
    gender: 'female', 
    name: 'isabel' 
  }
]
  
  // Utilidades de Apoyo
const availableMaleNames = ['pepe', 'juan', 'victor', 'Leo', 'francisco', 'carlos'];
const availableFemaleNames = ['cecilia', 'ana', 'luisa', 'silvia', 'isabel', 'virginia'];
const availableGenders = ['male', 'female'];

// Requisitos para imprimir
const toPrintRequirements = {
    1: 'Mostrar en formato de tabla todos los alumnos.',
    2: 'Mostrar por consola la cantidad de alumnos que hay en clase.',
    3: 'Mostrar por consola todos los nombres de los alumnos.',
    4: 'Eliminar el último alumno de la clase.',
    5: 'Eliminar un alumno aleatoriamente de la clase.',
    6: 'Mostrar por consola todos los datos de los alumnos que son chicas.',
    7: 'Mostrar por consola el número de chicos y chicas que hay en la clase.',
    8: 'Mostrar true o false por consola si todos los alumnos de la clase son chicas.',
    9: 'Mostrar por consola los nombres de los alumnos que tengan entre 20 y 25 años.',
    10: 'Añadir un alumno nuevo',
    11: 'Mostrar por consola el nombre de la persona más joven de la clase.',
    12: 'Mostrar por consola la edad media de todos los alumnos de la clase.',
    13: 'Mostrar por consola la edad media de las chicas de la clase.',
    14: 'Añadir nueva nota a los alumnos. Por cada alumno de la clase, tendremos que calcular una nota de forma aleatoria(número entre 0 y 10)',
    15: 'Ordenar el array de alumnos alfabéticamente según su nombre.',
    16: 'Mostrar por consola el alumno de la clase con las mejores notas.',
    17: 'Mostrar por consola la nota media más alta de la clase y el nombre del alumno al que pertenece.',
    18: 'Añadir un punto extra a cada nota existente de todos los alumnos. Recordad que la nota máxima posible es 10. Si los alumnos aún no tienen registrada ninguna nota, les pondremos un 10.'
  }

const actionRequirements = {
    '1': printTable,
    '2': fullStudentsLength,
    '3': allStudentsName,
    '4': deleteLastStudent,
    '5': deleteRandomStudent,
    '6': eachGirlData,
    '7': totalPerGender,
    '8': allGirlsBool,
    '9': allYoungAdults,
    '10': addRandomStudent,
    '11': youngerStudent,
    '12': averageAge,
    '13': averageGirlsAge,
    '14': addRandomScore,
    '15': sortAlphabetically,
    '16': bestStudent,
    '17': bestAverageScore,
    '18': addExtraPoint
  }

  //Pide Numero al usuario
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function selectAction() {
    const promise = new Promise((resolve, reject) => {
      rl.question('Introduce el número: ', (num) => {
        rl.pause();
        if (isInt(num)) {
          num = Number.parseInt(num);
          if (num >= 1 && num <= 16) {
            resolve(num)
          }
        } else {
          reject('Fin del proceso')
        }
      });
    });
    return promise
  };
  // consumidor
  async function fecthSelectedAction() {
    let action;
    do {
      try{
        printRequirements();
        action = await selectAction();
      } catch (error) {
        console.log(error);
        process.exit(0);
      }
      for (let key of Object.keys(actionRequirements)) {
        if ((action) == key) {
          actionRequirements[key]();
        }
      }
    } while (action !== 0);
  }
  
  fecthSelectedAction();

  // Validamos
function printRequirements() {
    for (const key of Object.keys(toPrintRequirements)) {
      console.table(key + " : " + toPrintRequirements[key])
    }
  }


function isInt(str){
   
    return /^[0-9]+$/.test(str)
  }


// 1: 'Mostrar en formato de tabla todos los alumnos.',
function printTable(){
    console.table(students)
  }

// 2: Mostrar por consola la cantidad de alumnos que hay en clase.
function fullStudentsLength() {
    console.log('The total number of students in your class is: ', students.length)
}

// 3: Mostrar por consola todos los nombres de los alumnos.
function allStudentsName() {
    students.forEach(function(student) {
    console.log(student.name);
    });
}
  
// 4: Eliminar el último alumno de la clase.
function deleteLastStudent() {
    students.pop()
    //console.log(students)
}

// 5: Eliminar un alumno aleatoriamente de la clase.
function deleteRandomStudent() {
    students.splice(Math.floor(Math.random() * students.length), 1);
    console.log(students);
      
}

// 6: Mostrar por consola todos los datos de los alumnos que son chicas.
function eachGirlData() {
    const girls = students.filter(student => student.gender === 'female')
    console.log(girls)
}

// 7: Mostrar por consola el número de chicos y chicas que hay en la clase.
function totalPerGender() {
    const totalGirls = students.filter(student => student.gender === 'female');
    const totalBoys = students.filter(student => student.gender === 'male');
    console.log('Total girls: ', totalGirls.length, ' Total boys: ', totalBoys.length);
}

// 8: Mostrar true o false por consola si todos los alumnos de la clase son chicas.
function allGirlsBool() {
    console.log(students.every(gender => gender === 'female'))
}

// 9: Mostrar por consola los nombres de los alumnos que tengan entre 20 y 25 años.
function allYoungAdults(){
    const totalYoungAdults = students.filter(student => student.age >= 20 && student.age <= 25)
    console.log(totalYoungAdults)
}

// 10: Añadir un alumno nuevo con los siguientes datos: nombre aleatorio, edad aleatoria entre 20 y 50 años, género aleatorio, listado de calificaciones vacío.
function addRandomStudent(){
    const selectGender = availableGenders[Math.floor(Math.random() * availableGenders.length)];
    let selectName = null;
    if (selectGender === 'female') {
        selectName = availableFemaleNames[Math.floor(Math.random() * availableFemaleNames.length)];
    } else {
        selectName = availableMaleNames[Math.floor(Math.random() * availableMaleNames.length)];
    }
    const min = 20
    const max = 50
    let selectAge = Math.floor(Math.random() * (max - min) + min);
    students.push({
        age: selectAge,
        examScores: [],
        gender: selectGender,
        name: selectName
    })
}

// 11: Mostrar por consola el nombre de la persona más joven de la clase.
function youngerStudent() {
    const younger = students.reduce(
        (acc, ageN) =>
          acc.age < ageN.age
            ? acc
            : ageN
      )
      console.log('The youngest student is: ', younger.name)
}

// 12: Mostrar por consola la edad media de todos los alumnos de la clase.
function averageAge() {
    const average = students.reduce((a, b) => a + b.age, 0) / students.length
    console.log(Math.round(average))
}

// 13: Mostrar por consola la edad media de las chicas de la clase.
function averageGirlsAge() {
    const totalGirls = students.filter(student => student.gender === 'female');
    const average = totalGirls.reduce((a, b) => a + b.age, 0) / totalGirls.length;
    console.log(Math.round(average))
}

// 14: Añadir nueva nota a los alumnos. Por cada alumno de la clase, tendremos que calcular una nota de forma aleatoria(número entre 0 y 10) y añadirla a su listado de notas.
function addRandomScore() {
    const min = 0
    const max = 10
    students.forEach(function(student) {
        let score = Math.floor(Math.random() * (max - min) + min)
        student.examScores.push([score])
        console.log(student)
    })
}

// 15: Ordenar el array de alumnos alfabéticamente según su nombre.

function sortAlphabetically() {
    console.log(students.sort((a, b) => a.name.localeCompare(b.name)))
}

// 16: Mostrar por consola el alumno de la clase con las mejores notas.
function bestStudent() {
    const listScores = []
    students.forEach(function(student) {
        let totalScore = student.examScores.reduce((a,b) => a + b, 0)
        listScores.push(totalScore)
    })
    const indexBest = listScores.indexOf(
        Math.max(...listScores));
    console.log('The best student is: ', students[indexBest].name)
}

// 17: Mostrar por consola la nota media más alta de la clase y el nombre del alumno al que pertenece.
function bestAverageScore() {
    const listScores = []
    students.forEach(function(student) {
        let averageScore = student.examScores.reduce((a,b) => a + b, 0) / student.examScores.length
        listScores.push(averageScore)
    })
    console.log(listScores)
    const indexBest = listScores.indexOf(
        Math.max(...listScores));
    console.log('The best student with the best average score is: ', students[indexBest].name, 'with an average scare of: ', listScores[indexBest])
}

// 18: Añadir un punto extra a cada nota existente de todos los alumnos. Recordad que la nota máxima posible es 10. Si los alumnos aún no tienen registrada ninguna nota, les pondremos un 10.
function addExtraPoint() {
    students.forEach(function(student) {
        if (student.examScores.length !== 0) {
            student.examScores = student.examScores.map(function(num) {
                if (num < 10) {
                    return num = num + 1
                    }
                else {
                    return num = num
                }
                 });
        } else if (student.examScores.length === 0){
            student.examScores.push(10)
        };
    });
}




