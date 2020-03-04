<template>
  <div id="app">
  <form>
    <label for="name">New activity:</label>
    <input type="text" id="name" name="name">
    <label for="dateStart">Date start:</label>
    <input type="date" id="dateStart" name="dateStart">
    <label for="dateEnd">Date end:</label>
    <input type="date" id="dateEnd" name="dateEnd">

    <label for="time">Select a starttime:</label>
    <input type="time" id="startTime" name="startTime">
    <label for="time">Select a endtime:</label>
    <input type="time" id="endTime" name="endTime">
    <label for="cars">Category:</label>

        <select id="cars">
          <option value="workout">Workout</option>
          <option value="work">Work</option>
          <option value="school">School</option>
          <option value="vaycay">Vaycay</option>
        </select>
    <input type="submit" value="Lägg till">
      
  </form>

  <ul>
      <li v-for="activity in activities" :key="activity.id">{{activity}}</li>
    </ul>
</div>

</template>

<script>
export default {
  name: "App",
  created() {
    fetch("http://localhost:3000/")
      .then(response => response.json())
      .then(result => {
        this.activities = result;
      });
  },
  data() {
    return {
      activities: null
    };
  },
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