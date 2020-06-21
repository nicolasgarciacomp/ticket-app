function solution(A) {
    let mayN = -1000001;
    let may = 0;
    let men = 1000001;

    /* Averiguo el mayor y menor */
    for(let i = 0; i < A.length; i++) {
        if(A[i] > may) {
            may = A[i];
        }
        if(A[i] < men) {
            men = A[i];
        }
        if(A[i] < 0 & A[i] > mayN) {
            mayN = A[i];
        }
    }

    /* Si tengo negativos */
    if(mayN != -1000001) {

        return mayN * (-1);
    }

    /* Busco en el array */
    for(men; men <= may; men++) {
        let nuevo = A.find(elem => elem == men);
        if(nuevo === undefined) {

            return men;
        }
    }

    return may + 1;
}

let resultado = solution([-2, 3]);
console.log(resultado);
