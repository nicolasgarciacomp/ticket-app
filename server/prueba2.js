/*-- write your code in SQLite 3.11.0
SELECT a.dept_id, count(*), sum(a.salary)
  FROM employee a
GROUP BY a.dept_id;*/
/*function solution(A) {
    var ans = 0;
    for (i = 1; i < A.length; i++) {
        if (ans > A[i]) {
            ans = A[i];
        }
    }
    return ans;
}

let r = solution([-1, 1, -2, 2]);

console.log(r);*/

function solution(A) {
    var may = 0;
    var indices = new Array(A.length);
    indices.fill(0);
    for (var i = 0; i < indices.length; i++) {
        for (var j = 0; j < A.length; j++) {
            if (i == A[j]) {
                indices[i] = indices[i] + 1;
            }
        }
    }

    for (var k = 0; k < indices.length; k++) {
        if (indices[k] > may) {
            may = k;
        }
    }
    let res = A[may]

    if(res < 2) {
        return 0;
    }

    return res;
}

let resol = solution([2, 3, 4, 5, 1, 5]);

console.log(resol);
