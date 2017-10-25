let sol;

let x_pos = [];
let y_pos = [];
let z_pos = [];

function lorenz_eq(t, x) {
    return [10 * (x[1] - x[0]),
        x[0] * (28 - x[2]) - x[1],
        x[0] * x[1] - (8 / 3) * x[2]];
}

function setup() {
    createCanvas(800, 800, WEBGL);

    sol = numeric.dopri(0, 20, [-1, 3, 4], lorenz_eq, 1e-6, 1200);

    let y_transpose = numeric.transpose(sol.y);

    let scale_x = y_transpose[0].reduce(function (a, b) {
        return Math.max(Math.abs(a), Math.abs(b));
    });
    let scale_y = y_transpose[1].reduce(function (a, b) {
        return Math.max(Math.abs(a), Math.abs(b));
    });
    let scale_z = y_transpose[2].reduce(function (a, b) {
        return Math.max(Math.abs(a), Math.abs(b));
    });

    for (let i = 0; i < sol.y.length; i++) {
        let normalized_x = sol.y[i][0] / scale_x;
        let normalized_y = sol.y[i][1] / scale_y;
        let normalized_z = sol.y[i][2] / scale_z;

        x_pos[i] = lerp(0, width / 2, normalized_x);
        y_pos[i] = lerp(0, height / 2, normalized_y);
        z_pos[i] = lerp(10, -10, normalized_z);
    }
}

let t = 0; // 0 - 1
let dt = 0.04;

function draw() {
    background(220);
    t += dt;
    if (t >= 1) {
        t = 0;
    }

    for (let i = 1; i < sol.y.length; i++)
    {
        let x = lerp(x_pos[i - 1], x_pos[i], t);
        let y = lerp(y_pos[i - 1], y_pos[i], t);
        let z = lerp(z_pos[i - 1], z_pos[i], t);

        push();
        translate(x, y, z);
        noStroke();
        fill(0);
        sphere(2);
        pop();
    }
}



