<template>
  <div id="app">
  <form>
    <label for="name">New activity:</label>
    <input type="text" v-model="addedActivityName" id="name" name="name">
    <label for="dateStart">Date start:</label>
    <input type="date" v-model="addedDateStart" id="dateStart" name="dateStart">
    <label for="dateEnd">Date end:</label>
    <input type="date" v-model="addedDateEnd" id="dateEnd" name="dateEnd">

    <label for="time">Select a starttime:</label>
    <input type="time" v-model="addedStartTime" id="startTime" name="startTime">
    <label for="time">Select a endtime:</label>
    <input type="time" v-model="addedEndTime" id="endTime" name="endTime">
    <label for="category">Category:</label>

      <select id="category">
        <option value="addedWorkout">Workout</option>
        <option value="addedWork">Work</option>
        <option value="addedSchool">School</option>
        <option value="addedVaycay">Vaycay</option>
      </select>
    <input type="submit" value="Lägg till i kalender" @click.prevent="onClick">
    
      
  </form>
  <ul>
    <li v-for="activity in activities" :key="activity.id">
        {{ activity.name }}  {{ activity.dateStart }} {{ activity.timeStart }} - {{ activity.timeEnd }} 
        <v-btn @click="removeData(activity.id)" outlined icon small>x</v-btn>
    </li>
  </ul>

  
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
      
    }
  },
  methods: {
    onClick() {
      this.addData().then(() => {this.getData()})
      
    },
    addData() {
     return fetch("http://localhost:3000/calendar", {
        body: JSON.stringify ({
          name: this.addedActivityName,
          dateStart: this.addedDateStart,
          dateEnd: this.addedDateEnd,
          timeStart: this.addedStartTime,
          timeEnd: this.addedEndTime
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      });
    },
    
    removeData(id) {
      fetch("http://localhost:3000/calendar/" + id, {
        method: 'DELETE'
        }).then(response => {
        this.getData();
      })
    },
    getData () {
      fetch("http://localhost:3000/calendar")
        .then(response => response.json())
        .then(result => {
          this.activities = result;
        });
    }
  },
    
  created() {
    this.addData();
  }

};

</script>

<style>
input [type=text], [type=date], [type=time], #name, #cars {
  width: 30%;
  padding: 12px 20px;
  margin: 8px 0;
  display: block;
  border: 1px solid #ccc;
  border-radius: 4px;
  
}
input[type=submit] {
  width: 30%;
  padding: 14px 20px;
  margin: 8px 0px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
form {
  margin:4em;
}
</style>