const calNormDist = (value: number, ifCDF = true) => {

    const b1 = 0.319381530;
    const b2 = -0.356563782;
    const b3 = 1.781477937;
    const b4 = -1.821255978;
    const b5 = 1.330274429;
    const p = 0.2316419;
    const c = 0.39894228;

    if (ifCDF) {
        if (value >= 0.0) {
            const t = 1.0 / (1.0 + p * value);
            return (1.0 - c * Math.exp(-value * value / 2.0) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1));
        }
        else {
            const t = 1.0 / (1.0 - p * value);
            return (c * Math.exp(-value * value / 2.0) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1));
        }
    }
    else {
        const z = -((value * value) / 2);
        const normDist = (1 / ((Math.sqrt(2 * Math.PI)))) * (Math.exp(z));

        return normDist;
    }
}

const riskFree = (value) => {
    return value / 100;
}

const volatility = (value) => {
    return value / 100;
}


const timeToExpiration = (value) => {
    return value / 365;
}

const d1 = (price, strikePrice, riskFree, volatility, timeToExpirationValue) => {

    const value = (Math.log(price / strikePrice)
        + (((riskFree) + (Math.pow(volatility, 2) / 2)) * timeToExpirationValue))
        / (volatility * Math.sqrt(timeToExpirationValue));

    return value;
}

const d2 = (price, strikePrice, riskFree, volatility, timeToExpirationValue) => {

    const value = (Math.log(price / strikePrice)
        + (((riskFree) - (Math.pow(volatility, 2) / 2)) * timeToExpirationValue))
        / (volatility * Math.sqrt(timeToExpirationValue));

    return value;
}

const gamma = (price, d1, volatility, timeToExpirationValue) => {
    const value = ((((1 / Math.sqrt((2 * Math.PI))) * Math.exp(((-1 * Math.pow(d1, 2)) / 2))))
        / ((price * volatility) * Math.sqrt(timeToExpirationValue)));
    return value;
}

const vega = (price, d1, timeToExpirationValue) => {
    const value = ((((((1 / Math.sqrt((2 * Math.PI))) * Math.exp(((-1 * Math.pow(d1, 2)) / 2))))
        * price) * Math.sqrt(timeToExpirationValue))) / 100;

    return value;
}

const optionsPremiumBuy = (price, strikePrice, d1, d2, riskFree, timeToExpirationValue) => {
    const value = ((price) * calNormDist(d1))
        - ((strikePrice * Math.exp(((-1 * riskFree) * timeToExpirationValue))) * calNormDist(d2));

    return value;
}

const optionsPremiumCell = (price, strikePrice, d1, d2, riskFree, timeToExpirationValue) => {
    const value = ((strikePrice * Math.exp(((-1 * riskFree) * timeToExpirationValue))) * calNormDist((-1 * d2)))
        - ((price) * calNormDist((-1 * d1)));
    return value;
}

const thetaBuy = (price, strikePrice, d1, d2, riskFree, volatility, timeToExpirationValue) => {

    const value = ((((-1 * ((((price * ((1 / Math.sqrt((2 * Math.PI)))
        * Math.exp(((-1 * Math.pow(d1, 2)) / 2))))
        * volatility))
        / (2 * Math.sqrt(timeToExpirationValue))))
        - (((riskFree * strikePrice)
            * Math.exp(((-1 * riskFree) * timeToExpirationValue)))
            * calNormDist(d2)))) / 365);
    return value;
}

const thetaCell = (price, strikePrice, d1, d2, volatility, riskFree, timeToExpirationValue) => {

    // const value = (((((-1 * ((((price * ((1 / Math.sqrt((2 * Math.PI)))
    //   * Math.exp(((-1 * Math.pow(d1, 2)) / 2))))
    //   * volatility)))) / (2 * Math.sqrt(timeToExpirationValue)))
    //   + (((riskFree * strikePrice) * Math.exp(((-1 * riskFree) * timeToExpirationValue)))
    //     * calNormDist((-1 * d2))))) * 365);

    const value = ((((-1 * ((((price * ((1 / Math.sqrt((2 * Math.PI)))
        * Math.exp(((-1 * Math.pow(d1, 2)) / 2))))
        * volatility))
        / (2 * Math.sqrt(timeToExpirationValue))))
        + (((riskFree * strikePrice)
            * Math.exp(((-1 * riskFree) * timeToExpirationValue)))
            * calNormDist(-d2)))) / 365);

    // const value = 
    //   (-1*riskFree*strikePrice*Math.exp((-1 * riskFree) * timeToExpirationValue))
    //   + thetaBuy(price, strikePrice, d1, d2, volatility, riskFree, timeToExpirationValue);

    return value;
}

const rhoBuy = (strikePrice, d2, riskFree, timeToExpirationValue) => {
    const value = (((strikePrice * timeToExpirationValue)
        * Math.exp(((-1 * riskFree) * timeToExpirationValue)))
        * calNormDist(d2)) / 100;
    return value;
}

const rhoCell = (strikePrice, d2, riskFree, timeToExpirationValue) => {
    const value = ((((-1 * strikePrice) * timeToExpirationValue)
        * Math.exp(((-1 * riskFree) * timeToExpirationValue))) * calNormDist((-1 * d2))) / 100;
    return value;
}

export default {
    calNormDist,
    riskFree,
    volatility,
    timeToExpiration,
    d1,
    d2,

    gamma,
    vega,
    optionsPremiumBuy,
    optionsPremiumCell,
    thetaBuy,
    thetaCell,
    rhoBuy,
    rhoCell
};
