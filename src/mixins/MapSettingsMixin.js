import { server_url } from "../constants/server";

export const MapSettingsMixin = {
  data() {
    return {
      isMapVisible: false,
      server_url: server_url,
    };
  },
  methods: {
    getMapSettings: function () {
      this.axios
        .get(this.server_url + "settings.php")
        .then((res) => {
          const { map_visible } = res.data;
          this.isMapVisible = !!Number(map_visible);
        })
        .catch((err) => console.log(err));
    },
  },
};
