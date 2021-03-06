let app = new Vue({

    el: '#root',
    data: {

        name: 'Gianmarco',

        contacts: [

            {name: 'Michele', avatar: '_1', visible: true,
            messages: [
                { date: '10/01/2020 15:30:55', text: 'Hai portato a spasso il cane?', status: 'sent' },
                    { date: '10/01/2020 15:50:00', text: 'Ricordati di dargli da mangiare', status: 'sent' },
                    { date: '10/01/2020 16:15:22', text: 'Tutto fatto!', status: 'received' }
                ],
            },

            {name: 'Fabio', avatar: '_2', visible: true,
            messages: [
                    { date: '20/03/2020 16:30:00', text: 'Ciao come stai?', status: 'sent' },
                    { date: '20/03/2020 16:30:55', text: 'Bene grazie! Stasera ci vediamo?', status: 'received' },
                    { date: '20/03/2020 16:35:00', text: 'Mi piacerebbe ma devo andare a fare la spesa.', status: 'sent' }
                ],
            },

            {name: 'Samuele', avatar: '_3', visible: true, 
            messages: [
                    { date: '28/03/2020 10:10:40', text: 'La Marianna va in campagna', status: 'received' },
                    { date: '28/03/2020 10:20:10', text: 'Sicuro di non aver sbagliato chat?', status: 'sent' },
                    { date: '28/03/2020 16:15:22', text: 'Ah scusa!', status: 'received' }
                ],
            },

            {name: 'Luisa', avatar: '_4', visible: true,
            messages: [
                    { date: '10/01/2020 15:30:55', text: 'Lo sai che ha aperto una nuova pizzeria?', status: 'sent' },
                    { date: '10/01/2020 15:50:00', text: 'Si, ma preferirei andare al cinema', status: 'received' }
                ],
            },
        ],

        click: false,
        msg: '',
        count: 0,
        toFilter: '',
        chatCounter: 0,
        modify: false,
        modifyIndex: 0,

    },

    methods:{
            // DOPO AVER CREATO UNA VARIABILE INIZIALIZZATA A 0 (count) LA FUNZIONE PRENDE L'INDICE CHE GLI VIENE PASSATO E FA SI CHE COUNT SIA UGALE A TALE INDICE
        goTo: function(index){
            this.count = index
        },
            // AL CLICK FA USCIRE UN DROPDOWN MEN??
        chatClick: function(x){
            this.chatCounter = x
            this.click = !this.click
        },
            // INVIA IL DATO INSERITO NELL'INPUT PER POTER ESSERE VISUALIZZATO IN PAGINA
        submit: function(thatCount){
            let d = new Date()
            if(this.msg.length > 0 && this.modify == false){
                newMessage = {
                    date: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getUTCSeconds()}`,
                    text: this.msg,
                    status: 'sent'
                },
                this.contacts[this.count].messages.push(newMessage)
                this.msg = ''
                setTimeout(()=> {
                    newMessage = {
                        date: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
                        text: 'Ok',
                        status: 'received'
                    },
                    this.contacts[thatCount].messages.push(newMessage)
                },5000)           
            }
        },
            // VERIFICA SE NELL'INPUT SONO INCLUSI CARATTERI DELL'ARRAY CONTACTS.NAME
        filter: function(el){
            return el.name.toLowerCase().includes(this.toFilter.toLowerCase())
        },
            // FILTRO CHE RICERCA PAROLE NELLA CHAT UGUALI A QUELLE INSERITE NELL'INPUT
        chatFilter: function(el){
            let check = false
            el.messages.forEach(el => {
                if(el.text.toLowerCase().includes(this.toFilter.toLowerCase())){
                    check = true
                    return check                    
                }
            }) 
            return check
        },
            // CANCELLA UN DETERMINATO MESSAGGIO E RISETTA IL VALORE DI CLICK A FALSE 
        cancel: function(x){
            this.contacts[this.count].messages.splice(x, 1);
            if(this.contacts[this.count].messages == 0) {
                newMessage = {status: 'd-none'}
                this.contacts[this.count].messages.push(newMessage)
            }
            this.click = false       
        },
            // AGGIUNGE L'OPZIONE DI MODICA DEI MESSAGGI
        modifing: function(message, index){
            this.msg = message;
            this.click = false 
            this.modify = true;
            this.modifyIndex = index
        },
            // FUNZIONE DI MODIFICA DEL TESTO E DATA DEL MESSAGGIO
        sentModify: function (){
            if( this.modify == true) {
                let d = new Date
                this.contacts[this.count].messages[this.modifyIndex].text = this.msg
                this.contacts[this.count].messages[this.modifyIndex].date = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
                this.modify = false
                this.msg = ''
            }
        },
    },
})