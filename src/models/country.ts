import { Language } from './Languages';
export class Country {
    sISOCode: string;
    sName: string;
    sCapitalCity!: string|null;
    sPhoneCode!: string|null;
    Languages!: Language[]|null;
    constructor( sName: string,sISOCode: string , sCapitalCity: string|null=null, sPhoneCode: string|null=null, Languages: Language[]|null=null) {
        this.sISOCode = sISOCode;
        this.sName = sName;
        this.sCapitalCity = sCapitalCity;
        this.sPhoneCode = sPhoneCode;
        this.Languages = Languages;
    }
}