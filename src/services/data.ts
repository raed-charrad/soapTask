import { Continent } from "@/models/continents";
import { Country } from "@/models/country";
import { Language } from "@/models/Languages";
import axios from "axios";
import { ref } from "vue";

const continents = ref<Continent[]>([]);
const countryArray = ref<Country[]>([]);
const countries = ref<Country[]>([]);
const newCountry = ref<Country>(new Country('', ''));

const soapCall = async () => {
    continents.value = [];
    countryArray.value = [];
    const response = await axios.get('/websamples.countryinfo/CountryInfoService.wso/ListOfCountryNamesGroupedByContinent')
    const xmldoc = new DOMParser().parseFromString(response.data, 'text/xml');
    const cont = xmldoc.getElementsByTagName('tCountryCodeAndNameGroupedByContinent');
    for (const con of cont) {
        const continentName = con.getElementsByTagName('sName')[0].textContent?.trim();
        const continentCode = con.getElementsByTagName('sCode')[0].textContent;
        const countries = con.getElementsByTagName('tCountryCodeAndName');
        for (const cou of countries ) {
            const countryName = cou.getElementsByTagName('sName')[0].innerHTML?.trim();
            const countryCode = cou.getElementsByTagName('sISOCode')[0].innerHTML;
            if (countryName != null && countryCode != null) {
                countryArray.value.push(new Country(countryName, countryCode));
            }
        }
        if (continentName != null && continentCode != null && countries != null) {
            continents.value.push(new Continent(continentCode, continentName, countryArray.value));
        }
        countryArray.value = [];
    }
}
soapCall();


const getContinentCountries = async (continent: string) => {
    await soapCall();
    if (continent === '') {
        return [];
    }
    console.log( continents.value[continents.value.findIndex(c => {
        return c.sCode === continent
    })])
    countries.value = 
    continents.value.findIndex(c => {
        return c.sCode === continent
    }) != -1 ?
    continents.value[continents.value.findIndex(c => {
        return c.sCode === continent
    })]?.countries : [];
}
const loadContryDetails = async (country: string) => {
    const response = await axios.get('/websamples.countryinfo/CountryInfoService.wso/FullCountryInfo', {
        params: {
            sCountryISOCode: country
        }
    })
    const xmldoc = new DOMParser().parseFromString(response.data, 'text/xml');
    const countryInfo = xmldoc.getElementsByTagName('tCountryInfo')[0];
    const countryName = countryInfo.getElementsByTagName('sName')[0].innerHTML?.trim();
    const countryCode = countryInfo.getElementsByTagName('sISOCode')[0].innerHTML;
    const capitalCity = countryInfo.getElementsByTagName('sCapitalCity')[0].innerHTML?.trim();
    const phoneCode = countryInfo.getElementsByTagName('sPhoneCode')[0].innerHTML?.trim();
    const languages = countryInfo.getElementsByTagName('tLanguage');
    const languageArray: Language[] = [];
    for (const lang of languages) {
        const languageName = lang.getElementsByTagName('sName')[0].innerHTML?.trim();
        const languageCode = lang.getElementsByTagName('sISOCode')[0].innerHTML;
        if (languageName != null && languageCode != null) {
            languageArray.push(new Language(languageCode, languageName));
        }
    }
    if (countryName != null && countryCode != null) {
        countries.value[countries.value.findIndex(c => {
            return c.sISOCode === countryCode
        })] = new Country(countryName, countryCode, capitalCity, phoneCode, languageArray);
        newCountry.value=new Country(countryName, countryCode, capitalCity, phoneCode, languageArray);
    }
    return newCountry.value;
}

export default function useData() {
    return { continents, soapCall, getContinentCountries, countries,loadContryDetails ,newCountry};
}

