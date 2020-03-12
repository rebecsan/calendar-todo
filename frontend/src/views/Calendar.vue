<template>
  <div id="app">
    <form>
      <label for="name">Ny aktivitet:</label>
      <input type="text" v-model="addedActivityName" id="name" name="name" />
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
      <v-btn
        class="add-new-activity"
        @click.prevent="onClick"
        outlined
        color="black"
      >Lägg till aktivitet</v-btn>
    </form>

    <h1>Aktivitetskalender</h1>

    <div class="flex-container">
      <v-card
        v-for="activity in activities"
        :key="activity.id"
        class="mx-auto"
        max-width="344"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content id="flexItem">
            <v-list-item-subtitle>{{ activity.dateStart }} - {{ activity.dateEnd }}</v-list-item-subtitle>
            <v-list-item-title class="headline mb-1">{{ activity.name }}</v-list-item-title>
            <v-list-item-subtitle>Tid: {{ activity.timeStart }} - {{ activity.timeEnd }}</v-list-item-subtitle>
            <v-list-item-subtitle id="flexItemNotes">Anteckning: {{ activity.note }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="yellow"></v-list-item-avatar>
        </v-list-item>
        <div id="buttons">
          <v-btn id="removeButton" @click="removeData(activity.id)" outlined icon small>x</v-btn>

          <v-checkbox label="Genomförd"></v-checkbox>
        </div>
      </v-card>
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
      checked: true
    };
  },
  methods: {
    onClick() {
      this.addData().then(() => {
        this.getData();
      });
    },

    //     editData(id) {
    //       console.log(id)
    //     fetch('http://localhost:3000/calendar/' + id, {
    //       body: JSON.stringify ({
    //           name: this.addedActivityName,
    //           dateStart: this.addedDateStart,
    //           dateEnd: this.addedDateEnd,
    //           timeStart: this.addedStartTime,
    //           timeEnd: this.addedEndTime
    //         }),
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       method: 'PUT'
    // })
    //   .then(response => response.json())
    //   .then(result => {
    //     console.log(result)
    //   })
    //     },
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
    this.addData();
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Bebas+Neue|Open+Sans&display=swap");
input [type="text"],
[type="date"],
[type="time"],
#name {
  width: 30%;
  padding: 12px 20px;
  margin: 8px 0;
  display: block;
  border: 1px solid #ccc;
  border-radius: 4px;
}
input[type="submit"] {
  width: 30%;
  padding: 14px 20px;
  margin: 8px 0px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
form {
  margin: 4em;
}
.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
  max-width: 80%;
}
.mx-auto {
  margin: 15px;
  font-family: "Open Sans", sans-serif;
  width: 60%;
}
#button {
  padding: 1em;
}
h1 {
  margin: auto;
  text-align: center;
  font-family: "Bebas Neue";
}
#textarea {
  width: 30%;
}
.v-input--selection-controls__input {
  color: #e4b445 !important;
  border-radius: 50% !important;
  border: solid 0.1em;
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
#buttons {
  margin-bottom: 0.1em;
  margin-left: 1em;
  width: auto;
}
#removeButton {
  position: absolute;
  margin-left: 23em;
  z-index: 1;
}
</style>