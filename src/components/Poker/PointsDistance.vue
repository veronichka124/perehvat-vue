<template>
  <div>
    <div
      v-for="({ id, distance }, index) in getPointsDistance(points)"
      v-bind:class="{
        'distance-box': true,
        disabled: visited_points.includes(id)
      }"
      :key="`distance-box-${index}`"
    >
      <div class="inline">
        <div class="id">#{{ id }}</div>
        <div class="distance">{{ parseDistance(distance) }}</div>
        <div>
          <v-checkbox
            class="checkbox"
            v-model="visited_points"
            :value="id"
            @change="$emit('handleVisitedPoint', Number(id))"
          ></v-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PokerPoints } from "../../constants/PokerPoints";
import { getDistanceBetweenCoords } from "../../utils/distance";
import "./styles.css";

export default {
  name: "PointsDistance",
  props: {
    position: {},
    handleVisitedPoint: Function
  },
  data() {
    return {
      points: PokerPoints,
      visited_points: JSON.parse(localStorage.visited_points)
    };
  },
  methods: {
    getPointsDistance: function(points) {
      if (this.position !== undefined && this.position.coords !== undefined) {
        const pointsDistance = points.map(point => {
          const { latitude, longitude } = this.position.coords;
          const distance = getDistanceBetweenCoords(
            point.lat,
            point.lng,
            latitude,
            longitude
          );
          return { id: point.id, distance: distance };
        });
        const unvisited = this.sortByDistance(
          pointsDistance.filter(
            point => !this.visited_points.includes(point.id)
          )
        );
        const visited = this.sortByDistance(
          pointsDistance.filter(
            point => this.visited_points.includes(point.id)
          )
        );

        return [...unvisited, ...visited];
      }
      return [];
    },
    parseDistance: function(distance) {
      const parsedDistance = Number(distance).toFixed(2);
      return parsedDistance < 1
        ? `${parsedDistance * 1000} m`
        : `${parsedDistance} km`;
    },
    sortByDistance: function(arr) {
      return arr.sort(function(a, b) {
        return a.distance - b.distance;
      });
    }
  }
};
</script>
