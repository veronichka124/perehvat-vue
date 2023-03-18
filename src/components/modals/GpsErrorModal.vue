<template>
  <modal id="gpsError" v-if="geolocation_error">
      <h3 slot="header" class="gps_error">GPS ERROR</h3>
      <div slot="body" class="gps_error">
        <span>
          1) Включите GPS <br />
          2) Настройте GPS для браузера в настройках телефона. <br />
          3) Разрешите браузеру использовать геолокацию для этого сайта. <br />
          4) Обновите страницу
        </span>
      </div>
    </modal>
</template>

<script>
export default {
  name: "GpsErrorModal",
  props: {
    geolocation_error: Boolean,
  },
  data() {
    return {};
  },
};
</script>
