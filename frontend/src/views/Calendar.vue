<template>
  <div id="app">
    <div id="headerCalendar">
      <h1>Aktivitetskalender</h1>
    </div>
    <img src="@/assets/pussel6.svg"/>
    
    <form>
      <label for="name">Ny aktivitet:</label>
      <v-text-field class="new-activity" v-model="addedActivityName" dense clearable>
      </v-text-field>
      <label for="dateStart">Börjar:</label>
      <input type="date" v-model="addedDateStart" id="dateStart" name="dateStart" />
      <label for="dateEnd">Slutar:</label>
      <input type="date" v-model="addedDateEnd" id="dateEnd" name="dateEnd" />
      <label for="time">Från klockan:</label>
      <input type="time" v-model="addedStartTime" id="startTime" name="startTime" />
      <label for="time">Till och med:</label>
      <input type="time" v-model="addedEndTime" id="endTime" name="endTime" />
      <div id="textarea">
        <v-textarea v-model="addedNote" solo name="input-7-4" label="Anteckning"></v-textarea>
      </div>
      <v-btn class="add-new-activity" @click.prevent="onClick" outlined color="black">Lägg till aktivitet</v-btn>
    </form>
    
    <div id="secondHeader">
      <h2>Din kalender</h2>
    </div>
    <div id="grid-container">
      <div v-for="activity in activities" :key="activity.id" class="grid-item" >
        
        <p id="pDate">{{ activity.dateStart }} - {{ activity.dateEnd }}</p>
    
        <h3 id="headerInGrid">{{ activity.name }}</h3>
    
        <p id="pTime">Tid: {{ activity.timeStart }} - {{ activity.timeEnd }}</p>
  
        <p id="pNote">Anteckning: {{ activity.note }}</p>
        <div id="buttons">
          <v-btn id="removeButton" @click="removeData(activity.id)" outlined icon small>x</v-btn>
          <v-checkbox label="Genomförd"></v-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  
  name: "Calendar",
  data() {
    return {
      addedActivityName: null,
      addedDateStart: null,
      addedDateEnd: null,
      activities: null,
      addedStartTime: null,
      addedEndTime: null,
      addedNote: null,
      checked: true,
      
    };
  },
  methods: {
    onClick() {
      this.addData().then(() => {
        this.getData();
      });
    },
    addData() {
      return fetch("http://localhost:3000/calendar", {
        body: JSON.stringify({
          name: this.addedActivityName,
          dateStart: this.addedDateStart,
          dateEnd: this.addedDateEnd,
          timeStart: this.addedStartTime,
          timeEnd: this.addedEndTime,
          note: this.addedNote
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
    },
    removeData(id) {
      fetch("http://localhost:3000/calendar/" + id, {
        method: "DELETE"
      }).then(response => {
        this.getData();
      });
    },
    getData() {
      fetch("http://localhost:3000/calendar")
        .then(response => response.json())
        .then(result => {
          this.activities = result;
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Bebas+Neue|Open+Sans&display=swap");
#app {
  position: relative;
}
h1 {
  font-family: "Bebas Neue";
  margin-top:1em;
  margin-left: 2.2em;
}
img {
  position: absolute;
  height: 950px;
  opacity: 0.5;
  margin-left: 68em;
  margin-top:2em;
  
}

/* FORM
---------------- */
input [type="text"],
[type="date"],
[type="time"],
#name {
  padding: 1em;
  margin: 1em 0;
  display: block;
  width: 100%;
  border-bottom:1px solid #ccc;
  font-family: "Open Sans", sans-serif;
}
input[type="submit"] {
  padding: 14px 20px;
  margin: 8px 0px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
form {
  margin-top:12em;
  position: relative;
  margin-left:-15.6em;
  width: 30%;
}
label {
  font-family: "Bebas Neue";
  font-size: 1.2em;
}
#textarea {
  margin-top:2em;
}
.add-new-activity{
  font-family: "Bebas Neue";
  font-size: 1em;
  margin-bottom:3em;
}
/* RENDER INPUT
------------------------ */
#grid-container {
  display: grid;
  grid-template-columns: auto auto ;
  grid-template-columns:repeat(2, 1fr);
  margin-left:-30.3em;
  margin-top: 75em;
  margin-bottom:10em;
  grid-column-gap: 50px;
  position: relative;
	grid-gap:4rem;
  width:100%;
}
.grid-item {
  padding:5em;
  border-right: 2px solid #e4b445;
  height: 38vw;
}
#pDate {
  font-family: "Open Sans", sans-serif;
  font-size:0.7em;
  position: absolute;
  margin-top: -5em;
}
#headerInGrid {
  position: absolute;
  font-family: "Bebas Neue";
  text-transform: uppercase;
  font-size: 3em;
  margin-top:-0.4em;
}
#pTime {
  position: absolute;
  font-family: "Open Sans", sans-serif;
  margin-top:12em;
  font-size:0.7em;
}
#pNote {
  position: relative;
  font-family: "Open Sans", sans-serif;
  margin-top:11em
}

#buttons {
  margin-top:12em;
}

#secondHeader {
  position: absolute;
  font-family: "Bebas Neue";
  text-transform: uppercase;
  font-size: 0.9em;
  margin-top:75em;
  margin-left:7.7em;
  
}
.mx-auto {
  margin: 15px;
  font-family: "Open Sans", sans-serif;
  width: 60%;
}
#button {
  padding: 1em;
}

.v-input--selection-controls__input {
  color: #e4b445 !important;
  border-radius: 50% !important;
  border: solid 0.1em;
  margin-right: -0.5em; 
}

.headline {
  font-family: "Bebas Neue";
  font-size: 2em !important;
}
#flexItemNotes {
  overflow: scroll;
  font-size: 1em;
  margin-top: 2em;
}
.v-icon {
  color: #e4b445 !important;
  border-radius: 50% !important;
  border: solid;
 
}
#removeButton {
  position: absolute;
  margin-left: 23em;
  z-index: 1;
}
#headerCalendar {
  margin:2em;
 
}
</style>