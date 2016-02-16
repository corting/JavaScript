'use strict';

/*
  Crear un bucle for que imprima los mensajes:
  Valor de i: 0
  Valor de i: 2
  ... hasta ...
  Valor de i: 9
*/
var i;

for (i=0;i<=9;i++){
  console.log(i);
}


/*
  Crear un bucle for que imprima los mensajes: con números pares
  Valor de i: 0
  Valor de i: 2
  Valor de i: 4
  ... hasta ...
  Valor de i: 8
*/
var x = 0

for ( x = 0; x < 9; x+=2 ){
  console.log(x);
}


/*
  Crear un bucle dentro de otro (anidados) que imprima
  Valor de i: 0
  Valor de j: 0
  
  Valor de i: 0
  Valor de j: 1
  
  Valor de i: 0
  Valor de j: 2
  
  ... hasta ...
  
  Valor de i: 9
  Valor de j: 9
*/

var j 
for (j = 0; j <10; j++){  
  for (i = 0; i <10; i++){
    console.log('valor i '+ i)
    console.log('valor j '+ j)
    }
  }
