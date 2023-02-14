import { Country } from "./country";

export class Continent {
    sCode : string;
    sName : string;
    countries: Country[];
    constructor(sCode: string, sName: string, countries: Country[]) {
        this.sCode = sCode;
        this.sName = sName;
        this.countries = countries;
    }
}