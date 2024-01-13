const Utility = {
  abs: (x) => (x < 0 ? -x : x),
  gcd: (m, n) => {
    if(!Number.isInteger(m) && !Number.isInteger(n)) throw new Error("m,n must be Integer")
    return n === 0 ? m : Utility.gcd(n, m % n)},
  lcm: (m, n) => Utility.abs(m * n) / Utility.gcd(m, n),
  sgn: (y) => (y === 0 ? 0 : y > 0 ? "+" : "-"),
  isFraction: (x) => x instanceof Fraction
};



class Point {
  constructor(x, y, z = 0, r, φ, mode="kartézské") {
    if(mode === "kartézské"){
      this.x = x;
      this.y = y;
      this.z = z;

      this.r = Math.hypot(x,y);
      this.φ = Math.atan2(y,x);  
    }

    if(mode === "polární") {
      this.r = r;
      this.φ = φ;
      
      this.x = r * Math.cos(φ);
      this.y = r * Math.sin(φ);
    }
     
    this.mode = mode
  }

  display() {
    let x = Utility.isFraction(this.x) ? this.x.display("text") : this.x
    let y = Utility.isFraction(this.y) ? this.y.display("text") : this.y
    let r = Utility.isFraction(this.r) ? this.r.display("text") : this.r
    let φ = this.φ
    if(this.mode === "kartézské") return `(${x}, ${y})`;
    if(this.mode === "polární") return  `(${r}, ${φ})`;
    return {cart: `(${x}, ${y})`, polar : `(${r}, ${φ})` }  
  }


}


class Vector {
  constructor(x, y, z = 0) {
    if ((x, y instanceof Point)) {
      this.x = x.x - y.x;
      this.y = x.y - y.y;
    } else if (
      typeof x === "number" &&
      typeof y === "number" &&
      typeof z === "number"
    ) {
      this.x = x;
      this.y = y;
      this.z = z;
    } else {
      throw new Error("All parameter must be number");
    }

    this.length = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  }

  display() {
    let x = Utility.isFraction(this.x) ? this.x.display("text") : this.x
    let y = Utility.isFraction(this.y) ? this.y.display("text") : this.y
    
    return `(${x}, ${y})`   
  }

  normal() {
    return new Vector(-this.y, this.x);
  }

  opposite() {
    return new Vector(-this.x, -this.y);
  }

  add(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  minus(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  multiply(k) {
    return new Vector(k * this.x, k * this.y);
  }

  /**@param {Vector} vector*/
  // skalarní součin
  dotProduct(vector) {
    return this.x * vector.x + this.y * vector.y;
  }
  /**@param {Vector} vector*/
  // vektorový součin
  crossProduct(vector) {
    return new Vector(
      this.y * vector.z - this.z * vector.y,
      this.z * vector.x - this.x * vector.z,
      this.x * vector.y - this.y * vector.x
    );
  }

  /**@param {Vector} vector*/
  angle(vector) {
    return Math.acos(this.dotProduct(vector) / (this.length * vector.length));
  }
}

class Fraction {
  constructor(x, y) {
    if (y === 0) {
      throw new Error("y != 0 !");
    }
    if(isNaN(x) || isNaN(y)) {
      throw new Error ("NaN")
    }
    (this.x = x), 
    (this.y = y), 
    (this.num = x/y),
    (this.sign = Utility.sgn(x * y));
  }

  reduce() {
    let a = this.x;
    let b = this.y;
    let reducer = Utility.gcd(a, b);
    return new Fraction(a / reducer, b / reducer);
  }

  /** @param {Fraction} frac */
  operation(operator, frac) {
    switch (operator) {
      case "+":
        return new Fraction(
          this.x * frac.y + frac.x * this.y,
          this.y * frac.y
        ).reduce();
      case "-":
        return new Fraction(
          this.x * frac.y - frac.x * this.y,
          this.y * frac.y
        ).reduce();
      case "*":
        return new Fraction(this.x * frac.x, this.y * frac.y).reduce();
      case "/":
        return new Fraction(this.x * frac.y, this.y * frac.x).reduce();
    }
  }

  display(option) {
    let result = this.reduce();
    let x = Utility.abs(result.x);
    let y = Utility.abs(result.y);
    let sgn = this.sign === "+" ? "" : "-";
    let final = {
      js : sgn ? [-x,y] : [x,y],
      latex: ` ${sgn}\\frac{${x}}{${y}}`,
      text: `${sgn} ${x} / ${y}`,
    }
    if(x%y === 0) return this.num
    return final[option]
  }
}


class Line {
  // Obecná rovnice
  constructor(a, b, c) {
    if(b === 0) {
      this.k = 0;
    }
    else {
      this.k = new Fraction(-a,b);
    }

    this.line = `${a}x + ${b}y + ${c} = 0`;
    this.a = a;
    this.b = b;
    this.c = c;



    if(a === 0) {
      this.normalVector = new Vector(0,1);
      this.directionVector = this.normalVector.normal();

      this.pointA = new Point(1, new Fraction(-c, b)); //[1, -(c+0)/b]
      this.pointB = new Point(-1, new Fraction(-c, b)); // [-(c+b)/a, 1]

      this.pointY = new Point(0, new Fraction(-c,b));

    }
    else if(b === 0) {
      this.normalVector = new Vector(1,0);
      this.directionVector = this.normalVector.normal();

      this.pointA = new Point(new Fraction(-c, a), 1); //[1, -(c+0)/b]
      this.pointB = new Point(new Fraction(-c, a), -1); // [-(c+b)/a, 1]
      this.pointX = new Point(new Fraction(-c,a),0); // [null || infinity]

    }
    else{
      this.normalVector = new Vector(a, b);
      this.directionVector = this.normalVector.normal();
      this.pointA = new Point(1, new Fraction(-(c+a), b)); //[1, -(c+a)/b]
      this.pointB = new Point(new Fraction(-(c+b),a), 1); // [-(c+b)/a, 1]
      this.pointX = new Point(new Fraction(-c,a),0)
      this.pointY = new Point(0, new Fraction(-c,b))
    }

    if(a === 0 && b === 0) 
    {
      alert("Line does not exist");
      throw new Error("Line does not exist");
    }



  }

  // Parametrická rovnice
  parameter(mode = false) {
    let [a1, a2, b1, b2, v1, v2] = [
      this.pointA.x,
      this.pointA.y,
      this.pointB.x,
      this.pointB.y,
      this.directionVector.x,
      this.directionVector.y,
    ];

    if (mode) {
      return {
        pointA: `$p: X = A + ts \\quad \\Leftrightarrow \\quad p: 
        \\left\\{\\begin{matrix} x = ${a1}${v1 < 0?"":"+"}${v1}t
        \\\\ y = ${a2.display("latex")}${v2 < 0?"":"+"}${v2}t
        \\end{matrix}\\right.$`,

        pointB: `$p: X = B + ts \\quad \\Leftrightarrow \\quad p: 
        \\left\\{\\begin{matrix} x = ${b1.display("latex")}${v1 < 0?"":"+"}${v1}t
        \\\\ y = ${b2}${v2 < 0?"":"+"}${v2}t
        \\end{matrix}\\right.$`,
      };
    }
    return {
      pointA: `p: x = ${a1}${v1 < 0?"":"+"}${v1}k; y = ${a2.display("text")}${v2 < 0?"":"+"}${v2}k`,
      pointB: `p: x = ${b1.display("text")}${v1 < 0?"":"+"}${v1}k, y = ${b2}${v2 < 0?"":"+"}${v2}k`,
    };
  }
  slope(main=true) {
    let y = this.pointY.y;
    let a = this.pointA.y;

    if(this.b === 0) return "p: neexistuje";
    if(this.a === 0) return `y = ${y.display("latex")}`

    if(main) {
      return `y = ${this.k.display("latex")}x ${y.display("latex")}`
    }
    return ` \\frac{y-(${a.display("latex")})}{x-1} = ${this.k.display("latex")}`
  }

  intercept() {
    if(this.a*this.b*this.c === 0) return "p: neexistuje"
    return `p:\\quad \\frac{x}{${this.pointX.x.display("latex")}} \\; + \\; \\frac{y}{${this.pointY.y.display("latex")}} \\; = \\; 1`
  }

}



/*
    this.vektor.direction = `(${-b}, ${a})` 
    this.vektor.normal = `(${a}, ${b})`


    class Integer {
  constructor(x) {
    this.x = x
  }
  gcd(y) {
    return y ===  0
  }
}
    */
