<script>
import MainMap from "./components/map.vue";
import PokerMap from "./components/Poker/PokerMap.vue";
import NotFound from "./components/NotFound.vue";

const routes = {
  "/": MainMap,
  "/poker": PokerMap,
};

export default {
  name: "Routes",
  data() {
    return {
      currentPath: window.location.pathname
    };
  },
  computed: {
    currentView() {
      return routes[this.currentPath || "/"] || NotFound;
    }
  },
  render (h) { return h(this.currentView) }

};
</script>
