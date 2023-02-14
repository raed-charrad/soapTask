<template>
     <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Countries list</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list >
                    <ion-item v-for="Country in countries " :key="Country.sISOCode" :router-link="{
                        name: 'Country',
                        params: {
                            country: Country.sISOCode
                        }
                     }"
                    >
                            <ion-avatar slot="start">
                                <img alt="Silhouette of a person's head" 
                                :src="`${imgUrl+Country.sISOCode.toLowerCase()}.svg`"
                                />
                            </ion-avatar>
                            <ion-label>{{Country.sName}}</ion-label>
                        </ion-item>
                <!-- <ion-item v-for="Country in Continent.countries" :key=Country>
                    <ion-label>{{Country.name}}</ion-label>
                </ion-item> -->
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script  lang="ts">
    import { useRoute } from 'vue-router';
    import { Continent } from '../models/continents'
    import {  IonAvatar, IonLabel,IonItem,IonList , IonContent, IonPage, IonHeader, IonTitle, IonToolbar,IonButtons,IonBackButton} from '@ionic/vue';

    import useData from '@/services/data';
    export default {
        components: {
            IonContent,
            IonPage,
            IonAvatar,
            IonLabel,
            IonItem,
            IonList,
            IonHeader,
            IonTitle,
            IonToolbar,
            IonButtons,
            IonBackButton

        },
        setup() {
            const route = useRoute();
            const { countries,continents, soapCall, getContinentCountries} = useData();
            const imgUrl = "https://flagcdn.com/";
            getContinentCountries((route.params.continent??"") as string);
            return {
                countries,
                continents,
                imgUrl
            }
        }
    }
</script>

<style scoped>

</style>