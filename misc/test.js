function toFraction(inputNumber, precision = MAX_PRECISION) {
    let [int, dec] = inputNumber
                        .toFixed(precision)
                        .split(".")
                        .map(n => +n)
                        
    const powerOf10 = 10 ** precision,
          gcd = getGCD(dec, powerOf10),
          fraction = `${dec/gcd}/${powerOf10/gcd}`;
    
    return int ? `${int} ${fraction}` : fraction
  };
  
  function getGCD(a, b) {
    if (!b) return a;
  
    return getGCD(b, a % b);
  }

console.log((toFraction(0.3, 3)));