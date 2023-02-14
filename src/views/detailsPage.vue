<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Continents list</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list >
                    <ion-item v-for="Continent in continents " :key="Continent.sCode" :router-link="{
                        name: 'Countries',
                        params: {
                            continent: Continent.sCode
                        }
                     }"
                    >
                        <ion-avatar slot="start">
                            <img :src="`${imgUrl+Continent.sCode.toLowerCase()}.svg`" alt="flag"  />
                        </ion-avatar>
                        <ion-label>{{Continent.sName}}</ion-label>
                        
                    </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { IonNav , IonAvatar, IonLabel,IonItem,IonList , IonContent, IonPage, IonHeader, IonTitle, IonToolbar} from '@ionic/vue';
    import useData from '@/services/data';

    const { continents, soapCall} = useData();
    const imgUrl = "https://flagcdn.com/";
    
    console.log(continents);
</script>

<style scoped>

</style>