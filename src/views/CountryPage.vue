<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Country details</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-card>
                <img :src="`${imgUrl+newCountry.sISOCode.toLowerCase()}.svg`" alt="flag" />
                <ion-card-header class="header">
                    <div>
                        <ion-card-title>{{newCountry.sName}}</ion-card-title>
                        <ion-card-subtitle>{{ newCountry.sISOCode }}</ion-card-subtitle>
                    </div>
                </ion-card-header>

                <ion-card-content>
                    <p>Capital: {{ newCountry.sCapitalCity }}</p>
                    <p>Phone: {{ newCountry.sPhoneCode }}</p>
                    <p>Languages: </p>
                    <ul>
                        <li v-for="language in newCountry.Languages" :key="language.sName">
                            {{ language.sName }}
                        </li>
                    </ul>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonHeader, IonTitle, IonToolbar,IonButtons,IonBackButton } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { IonContent, IonPage} from '@ionic/vue';
// import {Contry } 
import useData from '@/services/data';

export default defineComponent({
    components: {
        IonContent,
        IonPage,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonButtons,
        IonBackButton
    },
    setup () {
        const route = useRoute();
        const { newCountry,loadContryDetails} = useData();
        const imgUrl = "https://flagcdn.com/";
        loadContryDetails((route.params.country??"") as string);

        return {
            imgUrl,
            newCountry
        }
    }
})
</script>

<style scoped>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    img {
        box-shadow: 0px 0px 8px rgba(2, 2, 2, 0.243);
    }
</style>