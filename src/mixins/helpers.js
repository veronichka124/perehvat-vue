export const helpers = {
  methods: {
    parseMarkerAge: function (lastActivity) {
      if (parseInt(lastActivity) < 60) {
        return lastActivity.toFixed(0) + " sec";
      } else {
        return (lastActivity / 60).toFixed(0) + " min";
      }
    },
  },
};
