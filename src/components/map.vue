<template>
  <div id="main-map">
    <!-- MODAL -->
    <!-- Start  screen -->
    <start-modal
      v-bind:showStartScreen="showStartScreen"
      v-bind:geolocation_error="geolocation_error"
      @handleShowCreateGameScreen="showCreateGameScreen = true"
      @handleShowJoinGameScreen="showJoinGameScreen = true"
      @handleClose="handleCloseStartDialog"
    />

    <!-- Create game  screen -->
    <modal
      id="createGameScreen"
      v-if="showCreateGameScreen"
      @close="dialog = showCreateGameScreen = false"
    >
      <h3 slot="header">Create New Game</h3>
      <div slot="body" class="text-xs-center">
        <v-flex xs12 sm6>
          <v-text-field
            v-model="newGame"
            id="newGameName"
            label="Game name"
            single-line
          ></v-text-field>
        </v-flex>
        <v-alert :value="gameExists" color="red" icon="warning" outline>
          Game already exists
        </v-alert>
        <!-- add options to select roles? -->
        <!-- on click create new game -->
        <v-btn round color="primary" dark @click="createGame"
          >Create game</v-btn
        >
      </div>
    </modal>
    <!-- Join game  screen -->
    <modal
      id="joinGameScreen"
      v-if="showJoinGameScreen"
      @close="
        dialog = showJoinGameScreen = false;
        gameExists = false;
      "
    >
      <h3 slot="header">Join Game</h3>
      <div slot="body" class="text-xs-center">
        <v-flex xs12 sm6>
          <v-text-field
            v-model="newGame"
            id="joinGameName"
            label="Game name"
            single-line
          ></v-text-field>
        </v-flex>
        <v-alert :value="gameExists" color="red" icon="warning" outline>
          Game does not exist
        </v-alert>
        <!-- on click change game to new game name -->
        <v-btn round color="primary" dark @click="joinGame(newGame)"
          >Join game</v-btn
        >
      </div>
    </modal>
    <!-- Change name screen -->
    <modal
      id="changeNameScreen"
      v-if="showChangeNameScreen"
      @close="dialog = showChangeNameScreen = false"
    >
      <h3 slot="header">Enter name</h3>
      <div slot="body" class="text-xs-center">
        <v-flex xs12 sm6>
          <v-text-field
            v-model="newName"
            id="changeName"
            label="Your name"
            single-line
          ></v-text-field>
        </v-flex>
        <!-- on click change name to new -->
        <v-btn round color="primary" dark @click="changeName">Save</v-btn>
      </div>
    </modal>
    <!-- GPS Error -->
    <modal id="gpsError" v-if="geolocation_error">
      <h3 slot="header" class="gps_error">GPS ERROR</h3>
      <div slot="body" class="gps_error">
        <span
          >1) Включите GPS <br />
          2) Настройте GPS для браузера в настройках телефона. <br />
          3) Разрешите браузеру использовать геолокацию для этого сайта. <br />
          4) Обновите страницу
        </span>
      </div>
    </modal>
    <!-- END MODAL -->
    <v-ons-page>
      <div class="hunter-is-close" v-show="ios_alarm"></div>
      <div
        v-bind:class="{
          yellow: prey_marker_age > 5 && prey_marker_age <= 15,
          red: prey_marker_age > 15,
        }"
        class="distance-to-prey"
        v-show="!am_i_prey && distance_to_prey"
      >
        <div>{{ distance_to_prey }}</div>
        <div v-if="am_i_admin">({{ prey_speed }})</div>
      </div>
      <!-- TIMER -->
      <div
        v-bind:class="{ game_on: game_inprogress, game_waiting: game_waiting }"
        id="timer"
      >
        <timer ref="game_timer"></timer>
      </div>

      <!-- MENU DRAWER -->
      <!-- Toggle button -->
      <v-container>
        <v-layout>
          <v-btn color="teal lighten-1" fab dark @click.stop="drawer = !drawer">
            <v-icon dark>list</v-icon>
          </v-btn>
        </v-layout>
      </v-container>
      <!-- Side menu -->
      <v-navigation-drawer
        class="grey lighten-3"
        v-model="drawer"
        value="false"
        :stateless="dialog"
        absolute
        temporary
      >
        <v-toolbar
          color="teal lighten-1"
          dark
          v-if="!mainMenuView"
          id="toolbar"
        >
          <v-btn icon fab @click="mainMenu(step_back)" class="back-btn">
            <v-icon>chevron_left</v-icon>
          </v-btn>
          <v-toolbar-title>{{ current_menu }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-ons-list v-if="mainMenuView">
          <v-ons-list-item tappable>
            <div class="left">
              <v-ons-icon
                v-if="am_i_admin"
                icon="fa-crown"
                class="list-item__icon icon-admin"
              ></v-ons-icon>
              <v-ons-icon
                v-else
                icon="fa-car"
                class="list-item__icon icon-width"
              ></v-ons-icon>
            </div>
            <div class="center" @click="mainMenu('Profile')">
              <span class="list-item__title">{{ name }}</span>
              <span v-if="am_i_prey" class="list-item__subtitle">Угонщик</span>
              <span v-else class="list-item__subtitle">Охотник</span>
            </div>
          </v-ons-list-item>
        </v-ons-list>

        <div v-if="mainMenuView" id="mainMenuView">
          <v-ons-list v-if="am_i_admin">
            <v-ons-list-item
              @click="mainMenu(item.title)"
              v-for="(item, index) in admin_menu"
              :key="index"
              modifier="longdivider"
              tappable
            >
              <div class="left">
                <v-ons-icon
                  :icon="item.icon"
                  class="list-item__icon icon-width"
                ></v-ons-icon>
              </div>
              <div class="center">
                {{ item.title }}
              </div>
            </v-ons-list-item>
          </v-ons-list>
          <v-ons-list v-else>
            <v-ons-list-item
              @click="mainMenu(item.title)"
              v-for="(item, index) in user_menu"
              :key="index"
              modifier="longdivider"
              tappable
            >
              <div class="left">
                <v-ons-icon
                  :icon="item.icon"
                  class="list-item__icon icon-width"
                ></v-ons-icon>
              </div>
              <div class="center">
                {{ item.title }}
              </div>
            </v-ons-list-item>
          </v-ons-list>
        </div>
        <!-- PROFILE MENU VIEW -->
        <div id="nameMenuView" v-if="nameMenuView">
          <v-ons-list>
            <v-ons-list-header>Game and team name</v-ons-list-header>
            <v-ons-list-item
              modifier="chevron longdivider"
              @click="dialog = showChangeNameScreen = true"
              tappable
            >
              <div class="left">Name</div>
              <div class="right">{{ newName }}</div>
            </v-ons-list-item>
            <v-ons-list-item
              @click="dialog = showStartScreen = true"
              modifier="chevron longdivider"
              tappable
            >
              <div class="left">Game</div>
              <div class="right">{{ game }}</div>
            </v-ons-list-item>
            <v-ons-list-header>Marker color</v-ons-list-header>
            <v-ons-list-item>
              <div class="center">
                <v-ons-select style="width: 100%" v-model="marker_color">
                  <option
                    v-bind:key="index"
                    v-for="(color, index) in colors"
                    :value="index"
                  >
                    {{ color.name }}
                  </option>
                </v-ons-select>
              </div>
            </v-ons-list-item>
          </v-ons-list>
        </div>

        <!-- USERS MENU VIEW -->
        <div id="usersMenuView" v-if="usersMenuView">
          <v-ons-list-header>
            Game users ({{ Object.keys(users).length }})
          </v-ons-list-header>
          <v-ons-list v-for="(marker, index) in users" :key="index">
            <v-ons-list-item
              v-bind:class="{ red_list_item: marker.is_prey == 1 }"
              tappable
              modifier="chevron longdivider"
              @click="userSettings(marker)"
            >
              <div class="left">
                {{ marker.user_name }} (id: {{ marker.id.substr(0, 4) }})
              </div>
            </v-ons-list-item>
          </v-ons-list>

          <div v-if="am_i_admin">
            <v-ons-list-header>
              Unconfirmed users in this game ({{
                Object.keys(blocked_users).length
              }})
            </v-ons-list-header>
            <v-ons-list>
              <v-ons-list-item
                tappable
                modifier="chevron"
                @click="mainMenu('Blocked users')"
              >
                <div class="left">Unconfirmed users</div>
              </v-ons-list-item>
            </v-ons-list>
          </div>
        </div>

        <!-- BLOCKED USERS MENU VIEW -->
        <div id="blockedUsersView" v-if="blockedUsersView">
          <v-ons-list-header>
            Unconfirmed users in this game ({{
              Object.keys(blocked_users).length
            }})</v-ons-list-header
          >
          <v-ons-list v-for="(user, index) in blocked_users" :key="index">
            <v-ons-list-item
              modifier="longdivider"
              tappable
              @click="
                (dialog = blockedActionSheet = true), (user_to_unblock = user)
              "
            >
              <div class="center">
                {{ user.user_name }} (id: {{ user.id.substr(0, 4) }})
              </div>

              <v-ons-alert-dialog
                modifier="rowfooter"
                :visible.sync="blockedActionSheet"
              >
                Unblock user {{ user_to_unblock.user_name }}?
                <template slot="footer">
                  <v-ons-alert-dialog-button
                    @click="dialog = blockedActionSheet = false"
                    @click.stop="dialog = false"
                    >Cancel</v-ons-alert-dialog-button
                  >
                  <v-ons-alert-dialog-button
                    @click="unblock_user(user_to_unblock)"
                    @click.stop="dialog = false"
                    >Ok</v-ons-alert-dialog-button
                  >
                </template>
              </v-ons-alert-dialog>
            </v-ons-list-item>
          </v-ons-list>
        </div>

        <!-- USER SETTINGS MENU VIEW -->
        <div id="userSettingsView" v-if="userSettingsView">
          <v-ons-list
            v-for="(marker, index) in users"
            :key="'role-' + index"
            v-if="selectedUserId == marker.id"
          >
            <v-ons-list-header>Role</v-ons-list-header>
            <v-ons-list-item modifier="longdivider">
              <div class="center">Угонщик</div>
              <div class="right">
                <v-ons-switch
                  v-model="prey_switch"
                  :value="marker.id"
                  @change="preyChange(marker)"
                >
                </v-ons-switch>
              </div>
            </v-ons-list-item>
            <v-ons-list-item>
              <div class="center">Администратор</div>
              <div class="right">
                <v-ons-switch
                  v-model="admin_switch"
                  :value="marker.id"
                  @change="set_admin(marker)"
                >
                </v-ons-switch>
              </div>
            </v-ons-list-item>
            <!-- Delete user -->
            <v-ons-list-header>Delete user from the game</v-ons-list-header>
            <v-ons-list-item
              tappable
              @click="dialog = deleteActionSheet = true"
            >
              <div class="left warning">Delete</div>
            </v-ons-list-item>
            <!-- Delete user alert -->
            <v-ons-alert-dialog
              modifier="rowfooter"
              :visible.sync="deleteActionSheet"
            >
              Delete user?
              <template slot="footer">
                <v-ons-alert-dialog-button
                  @click="dialog = deleteActionSheet = false"
                  >Cancel</v-ons-alert-dialog-button
                >
                <v-ons-alert-dialog-button @click="delete_user(marker)"
                  >Ok</v-ons-alert-dialog-button
                >
              </template>
            </v-ons-alert-dialog>
          </v-ons-list>
        </div>

        <!-- GAME SETTINGS MENU VIEW -->
        <div id="gameSettingsView" v-if="gameSettingsView">
          <!-- Start/stop game buttons-->
          <v-ons-button
            modifier="large"
            id="newGameBtn"
            class="btn-round"
            @click="startGame"
            >New game</v-ons-button
          >
          <v-ons-button
            modifier="large"
            id="stopGameBtn"
            class="btn-round"
            @click="stopGame"
            >Stop game</v-ons-button
          >
          <v-ons-list>
            <!-- Timer settings -->
            <v-ons-list-header>Game time</v-ons-list-header>
            <v-ons-list-item>
              <div class="center">
                <v-ons-select style="width: 100%" v-model="game_time">
                  <option v-for="n in 60" :value="n" v-bind:key="n">
                    {{ n }}
                  </option>
                </v-ons-select>
              </div>
            </v-ons-list-item>
            <v-ons-list-header>Waiting time</v-ons-list-header>
            <v-ons-list-item>
              <div class="center">
                <v-ons-select style="width: 100%" v-model="waiting_time">
                  <option v-for="(n, w) in 15" :value="w" v-bind:key="w">
                    {{ w }}
                  </option>
                </v-ons-select>
              </div>
            </v-ons-list-item>
            <!-- Closed districts -->
            <v-ons-list-header>Districts</v-ons-list-header>
            <v-ons-list-item
              tappable
              expandable
              :expanded.sync="districtsExpanded"
            >
              Closed districts
              <div class="expandable-content">
                <v-ons-list-item
                  v-for="(district, i) in district_names"
                  :key="district"
                  tappable
                >
                  <label class="left">
                    <v-ons-checkbox
                      :input-id="'checkbox-' + i"
                      :value="district"
                      v-model="checked_districts"
                      @change="update_districts(district)"
                    >
                    </v-ons-checkbox>
                  </label>
                  <label class="center">
                    {{ district }}
                  </label>
                </v-ons-list-item>
              </div>
            </v-ons-list-item>
            <v-ons-list-header>Visibility radius</v-ons-list-header>
            <v-ons-list-item>
              <div class="center">
                <v-ons-select
                  style="width: 100%"
                  v-model="game_settings.radius"
                  @change="update_game_setting()"
                >
                  <option
                    v-bind:key="w"
                    v-for="w in 25"
                    :value="parseInt((w * 0.1 + 0.4) * 1000)"
                  >
                    {{ (w * 0.1 + 0.4).toFixed(1) }} km
                  </option>
                  <option value="2000000">2000 km</option>
                </v-ons-select>
              </div>
            </v-ons-list-item>
            <v-ons-list-header>Game version</v-ons-list-header>
            <v-ons-list-item>
              <div class="center">
                <v-ons-select
                  style="width: 100%"
                  v-model="game_settings.game_type"
                  @change="update_game_setting()"
                >
                  <option value="0">Old game</option>
                  <option value="1">Standard</option>
                  <option value="2">New game</option>
                </v-ons-select>
              </div>
            </v-ons-list-item>
            <v-ons-list-header>Replay</v-ons-list-header>
            <v-ons-list-item>
              <div class="center">
                <v-ons-input
                  class="replay_input"
                  type="date"
                  placeholder="date"
                  v-model="replay_date"
                >
                </v-ons-input>
              </div>
            </v-ons-list-item>
            <v-ons-list-item>
              <div class="center">
                <v-ons-input
                  class="replay_input"
                  type="text"
                  placeholder="00:00"
                  v-model="replay_time"
                >
                </v-ons-input>
              </div>
            </v-ons-list-item>
            <v-ons-list-item>
              <div class="center">
                <v-ons-button
                  modifier="large"
                  id="replayBtn"
                  class="btn-round"
                  @click="startReplay"
                  >▶</v-ons-button
                >
                <v-ons-button
                  modifier="large"
                  id="stopReplayBtn"
                  class="btn-round"
                  @click="stopReplay"
                  >■</v-ons-button
                >
              </div>
            </v-ons-list-item>
          </v-ons-list>
        </div>
      </v-navigation-drawer>

      <GmapMap
        ref="mapRef"
        :center="map_center"
        :zoom="15"
        map-type-id="terrain"
        :options="{
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: true,
          fullscreenControl: false,
          disableDefaultUi: true,
        }"
        style="width: auto; position: static"
        @center_changed="new_center"
        @click="window_open = false"
      >
        <gmap-circle
          :center="prey_position"
          :radius="prey_accuracy"
          :options="{ editable: false, strokeOpacity: 0 }"
        >
        </gmap-circle>

        <GmapMarker
          v-for="marker in markers"
          :key="marker.id"
          :label="{
            text: marker.user_name,
            fontSize: '11px',
            fontWeight: 'bold',
            color: marker.text_color,
          }"
          :position="{
            lat: marker.geolocation_lat,
            lng: marker.geolocation_lng,
          }"
          :clickable="true"
          :draggable="false"
          :icon="marker.icon"
          @click="showInfo(marker)"
        />

        <GmapInfoWindow
          v-for="marker in markers"
          :key="marker.id + 'info'"
          :position="{
            lat: marker.geolocation_lat,
            lng: marker.geolocation_lng,
          }"
          :opened="window_open == marker.id"
          :options="{
            pixelOffset: {
              width: 0,
              height: -35,
              opacity: 0.2,
            },
          }"
        >
          <div class="info-box">
            <span class="info-box-title">{{ marker.user_name }}</span> <br />
            <span v-if="am_i_admin" class="info-box-suntitle"
              >(id: {{ marker.id.substr(0, 4) }})<br
            /></span>
            <span class="info-box-subtitle">{{ marker.speed }} km/h</span>
            <br />
            <span class="info-box-subtitle"
              >{{ marker.last_activity }} ago</span
            >
          </div>
        </GmapInfoWindow>

        <GmapPolygon
          v-for="(polygon, i) in polygons"
          :key="polygon.name"
          :paths="polygon.points"
          :options="{
            fillColor: '#FF0000',
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillOpacity: 0.2,
          }"
        >
        </GmapPolygon>

        <GmapPolygon
          :paths="jelgava"
          :options="{
            fillColor: '#FF0000',
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillOpacity: 0,
          }"
        >
        </GmapPolygon>
      </GmapMap>
    </v-ons-page>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import { colors } from "../constants/CarColors.js";
import { CarIcon } from "../constants/carIcon.js";
import {
  DistrictNames,
  Districts,
  jelgavaDistrict,
} from "../constants/districts.js";
import { server_url } from "../constants/server";

export default {
  name: "main-map",
  data() {
    return {
      axiosstop: false,
      car: CarIcon,
      colors: colors,
      marker_color: 0,
      polygons: [],
      checked_districts: [],
      district_names: DistrictNames,
      districts: Districts,
      jelgava: jelgavaDistrict,
      game_time: 50,
      waiting_time: 10,
      game_state: "nogame",
      game_settings: null,
      count: 0,
      map_center: { lat: 56.967122, lng: 24.162491 },
      prey_position: { lat: 56.967122, lng: 24.162491 },
      markers: [],
      blocked_users: [],
      users: [],
      drawer: null,
      newName: "",
      mainMenuView: true,
      current_menu: "",
      nameMenuView: false,
      usersMenuView: false,
      userSettingsView: false,
      gameSettingsView: false,
      blockedUsersView: false,
      blockedActionSheet: false,
      deleteActionSheet: false,
      districtsExpanded: false,
      dialog: false,
      demo: true,
      game: "base",
      newGame: "",
      step_back: "Main",
      gameExists: false,
      current: 1,
      showStartScreen: true,
      showCreateGameScreen: false,
      showJoinGameScreen: false,
      showChangeNameScreen: false,
      selectedUserId: "",
      toHide: false,
      hideNameInput: true,
      admin_menu: [
        { title: "Profile", icon: "user" },
        { title: "Users", icon: "users" },
        { title: "Game settings", icon: "cog" },
      ],
      user_menu: [
        { title: "Profile", icon: "user" },
        { title: "Users", icon: "users" },
      ],
      show: false,
      menu: false,
      admins: [],
      admin_switch: [],
      am_i_admin: false,
      am_i_prey: false,
      prey_switch: [],
      window_open: false,
      final_center: { lat: 56.970122, lng: 24.162585 },
      key: 0,
      name: "Me",
      speed: "",
      test: null,
      server_url: server_url,
      pos: "",
      start_time: "",
      geolocation_error: false,
      user_to_unblock: "",
      ios_alarm: false,
      bg_distance: "none",
      replay_date: 0,
      replay_time: "00:00",
    };
  },

  computed: {
    prey_speed: function () {
      if (typeof this.markers[localStorage.key_id] !== "undefined") {
        return (
          (this.markers[localStorage.key_id].prey_info.speed || 0).toFixed(0) +
          "km/h"
        );
      } else {
        return false;
      }
    },
    prey_accuracy: function () {
      if (typeof this.markers[localStorage.key_id] !== "undefined") {
        return this.markers[localStorage.key_id].prey_info.max_offset * 2;
      } else {
        return 0;
      }
    },
    distance_to_prey: function () {
      if (typeof this.markers[localStorage.key_id] !== "undefined") {
        return (
          (this.markers[localStorage.key_id].prey_info.distance / 1000).toFixed(
            1
          ) + "km"
        );
      } else {
        return false;
      }
    },
    prey_marker_age: function () {
      if (
        typeof this.markers[localStorage.key_id] !== "undefined" &&
        this.markers[localStorage.key_id].prey_info.last_activity !== null
      ) {
        return this.markers[
          localStorage.key_id
        ].prey_info.last_activity.toFixed(0);
      } else {
        return 0;
      }
    },
    my_id: function () {
      return localStorage.key_id;
    },
    google: gmapApi,
    game_inprogress: function () {
      return this.game_state == "inprogress";
    },
    game_waiting: function () {
      return this.game_state == "waiting";
    },
  },
  mounted: function () {
    // var noSleep = new NoSleep();

    // document.addEventListener('click', function enableNoSleep() {
    //   document.removeEventListener('click', enableNoSleep, false);
    //   noSleep.enable();
    // }, false);

    // hack for IOS 13
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
      var v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
      v = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
      if (v[0] >= 13) {
        document.addEventListener("pointerdown", (e) => {
          this.axiosstop = true;
          setTimeout(
            function () {
              this.axiosstop = false;
            }.bind(this),
            1000
          );
        });

        document.addEventListener("click", (e) => {
          this.axiosstop = false;
        });
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.final_center.lat = position.coords.latitude;
        this.final_center.lng = position.coords.longitude;
        this.map_center.lat = position.coords.latitude;
        this.map_center.lng = position.coords.longitude;
      });
    }
    if (localStorage.key_id) {
      this.key = localStorage.key_id;
      // console.log(localStorage.key_id);
    } else {
      localStorage.key_id = this.uuidv4();
      localStorage.password = this.uuidv4();
      // console.log('id: '+localStorage.key_id);
      // console.log('password: '+localStorage.key_id);
      this.key = localStorage.key_id;
    }

    this.markers_update_interval();
    this.game_timer_update();

    if (localStorage.name) {
      this.name = localStorage.name;
      this.newName = localStorage.name;
    } else {
      localStorage.name = "new player";
      this.name = localStorage.name;
    }

    if (localStorage.game) {
      this.game = localStorage.game;
      this.newGame = localStorage.game;
    }

    if (!isNaN(localStorage.color)) {
      this.marker_color = localStorage.color;
    }

    this.distance_interval();
    this.get_admins();
    this.get_districts();
    this.alarm_audio = new Audio("alarm1.mp3"); // path to file

    //WATCH position
    var id, options;
    options = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    };
    id = navigator.geolocation.watchPosition(
      this.geo_update,
      this.geo_error,
      options
    );

    // pre render
    document.dispatchEvent(new Event("render-event"));
  },
  methods: {
    createGame: function () {
      var bodyFormData = new FormData();
      bodyFormData.set("creator", this.key);
      bodyFormData.set("name", this.newGame);
      bodyFormData.set("id", localStorage.key_id);
      bodyFormData.set("password", localStorage.password);
      this.axios
        .post(this.server_url + "new_game.php", bodyFormData)
        .then(
          function (response) {
            // console.log(response);
            if (response.data == true) {
              //join game
              this.joinGame(this.newGame);
              this.showCreateGameScreen = false;
              this.dialog = false;
              this.showStartScreen = false;
              this.gameExists = false;
            } else {
              this.gameExists = true;
            }
          }.bind(this)
        )
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    joinGame: function (game) {
      //check if game exists
      if (game != localStorage.game) {
        this.axios
          .get(this.server_url + "join_game.php", {
            params: {
              name: game,
              password: localStorage.password,
              id: localStorage.key_id,
            },
          })
          .then(
            function (response) {
              // console.log(response.data);
              if (response.data == false) {
                //game does not exist
                this.gameExists = true;
              } else {
                //game exists
                this.gameExists = false;
                this.game = game;
                localStorage.game = this.game;
                this.showStartScreen = false;
                this.showJoinGameScreen = false;
                this.dialog = false;
                if (this.pos) {
                  this.geo_update(this.pos);
                }
              }
            }.bind(this)
          )
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
      } else {
        this.showStartScreen = false;
        this.showJoinGameScreen = false;
        this.dialog = false;
      }
    },
    mainMenu: function (current) {
      // console.log('current: '+current);
      // console.log('back: '+this.step_back);
      //toolbar header
      this.current_menu = current;
      //close all views
      this.mainMenuView = false;
      this.nameMenuView = false;
      this.usersMenuView = false;
      this.userSettingsView = false;
      this.gameSettingsView = false;
      this.blockedUsersView = false;
      //show current view
      if (current == "Main") {
        this.mainMenuView = true;
        this.step_back = "Main";
      } else if (current == "Profile") {
        this.nameMenuView = true;
        this.step_back = "Main";
      } else if (current == "Users") {
        this.usersMenuView = true;
        this.step_back = "Main";
        // update users
        this.fetch_users();
        this.fetch_blocked_users();
      } else if (current == "Blocked users") {
        this.blockedUsersView = true;
        this.step_back = "Users";
      } else if (current == "Game settings") {
        this.gameSettingsView = true;
        this.step_back = "Main";
      }
    },
    fetch_blocked_users: function () {
      this.axios
        .get(this.server_url + "blocked_users.php", {
          params: {
            game: this.game,
            password: localStorage.password,
            id: localStorage.key_id,
          },
        })
        .then(this.users_in_block)
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    fetch_users: function () {
      this.axios
        .get(this.server_url + "users.php", {
          params: {
            game: this.game,
            password: localStorage.password,
            id: localStorage.key_id,
          },
        })
        .then(
          function (response) {
            this.users = response.data;
            this.prey_switch = [];
            for (var key in response.data) {
              var value = response.data[key];
              if (value.is_prey == "1") {
                //all preys in the game
                this.prey_switch.push(value.id);
              }
            }
          }.bind(this)
        )
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    users_in_block: function (response) {
      this.blocked_users = [];
      response.data.forEach(
        function (value, key) {
          this.blocked_users.push(value);
        }.bind(this)
      );
      // console.log(this.blocked_users);
    },
    unblock_user: function (user) {
      // console.log(user);
      // this.blockedActionSheet = true;
      var bodyFormData = new FormData();
      bodyFormData.set("user_id", user.id);
      bodyFormData.set("game", this.game);
      bodyFormData.set("id", localStorage.key_id);
      bodyFormData.set("password", localStorage.password);
      this.axios
        .post(this.server_url + "unblock_user.php", bodyFormData)
        .then(
          function (response) {
            this.mainMenu("Users");
          }.bind(this)
        )
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      this.blockedActionSheet = false;
      this.dialog = false;
      this.blockedUsersView = false;
      this.usersMenuView = true;
    },
    userSettings: function (user) {
      if (this.am_i_admin == true) {
        this.mainMenu(user.user_name);
        this.userSettingsView = true;
        this.step_back = "Users";
        this.selectedUserId = user.id;
      }
    },
    preyChange: function (marker) {
      var is_prey = false;
      if (this.prey_switch.includes(marker.id)) {
        is_prey = false;
      } else {
        is_prey = true;
      }
      var bodyFormData = new FormData();
      bodyFormData.set("prey_id", marker.id);
      bodyFormData.set("game", this.game);
      bodyFormData.set("is_prey", is_prey);
      bodyFormData.set("password", localStorage.password);
      bodyFormData.set("id", localStorage.key_id);
      //post prey info
      this.axios
        .post(this.server_url + "set_prey.php", bodyFormData)
        .then(function (response) {
          // console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      //get prey info
    },
    set_admin: function (marker) {
      // console.log(this.admin_switch);
      var admin_checked = false;
      if (this.admin_switch.includes(marker.id)) {
        admin_checked = false;
      } else {
        admin_checked = true;
      }
      var bodyFormData = new FormData();
      bodyFormData.set("user_id", marker.id);
      bodyFormData.set("game", this.game);
      bodyFormData.set("admin", admin_checked);
      bodyFormData.set("password", localStorage.password);
      bodyFormData.set("id", localStorage.key_id);
      //post prey info
      this.axios
        .post(this.server_url + "set_admin.php", bodyFormData)
        .then(function (response) {
          // console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      //get prey info
    },
    game_admins: function (response) {
      if (this.axiosstop) return; //FIXME: hack for ios13
      //all admins
      this.admins = response.data;
      //am I admin?
      var role = false;
      this.admin_switch = [];
      this.admins.forEach(
        function (value, key) {
          if (value.user_id == localStorage.key_id) {
            role = true;
          }
          this.admin_switch.push(value.user_id);
        }.bind(this)
      );
      this.am_i_admin = role;
    },
    get_admins: function () {
      this.intervalid1 = setInterval(
        function () {
          if (this.am_i_admin) {
            // update users
            this.fetch_users();
            this.fetch_blocked_users();
          }

          this.axios
            .get(this.server_url + "get_admins.php", {
              params: {
                game: this.game,
                id: localStorage.key_id,
                password: localStorage.password,
              },
            })
            .then(this.game_admins)
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .then(function () {
              // always executed
            });
        }.bind(this),
        5000
      );
    },
    new_center: function (pos) {
      // save new map center
      this.final_center.lat = pos.lat;
      this.final_center.lng = pos.lng;
    },
    showInfo: function (marker) {
      // move map center
      this.final_center.lat = marker.geolocation_lat;
      this.final_center.lng = marker.geolocation_lat;
      this.map_center = {
        lat: marker.geolocation_lat + Math.random() * 0.000001,
        lng: marker.geolocation_lng,
      };
      if (this.window_open == marker.id) {
        this.window_open = false;
      } else {
        this.window_open = marker.id;
      }
      this.speed = marker.speed;
    },
    uuidv4: function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    geo_update: function (pos) {
      this.geolocation_error = false;
      localStorage.color = this.marker_color;
      this.pos = pos;
      var crd = pos.coords;
      // console.log(crd);
      var speed = crd.speed * 3.6;
      var bodyFormData = new FormData();
      bodyFormData.set("id", this.key);
      bodyFormData.set("user_name", localStorage.name);
      bodyFormData.set("geolocation_lat", crd.latitude);
      bodyFormData.set("geolocation_lng", crd.longitude);
      bodyFormData.set("speed", speed);
      bodyFormData.set("accuracy", crd.accuracy);
      bodyFormData.set("game", this.game);
      bodyFormData.set("color", this.marker_color);
      bodyFormData.set("password", localStorage.password);
      this.axios
        .post(this.server_url + "update_location.php", bodyFormData)
        .then(function (response) {
          // console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    changeName: function () {
      localStorage.name = this.newName;
      // console.log(localStorage.name);
      this.name = localStorage.name;
      var bodyFormData = new FormData();
      bodyFormData.set("id", this.key);
      bodyFormData.set("user_name", localStorage.name);
      bodyFormData.set("password", localStorage.password);
      this.axios
        .post(this.server_url + "update_name.php", bodyFormData)
        .then(function (response) {
          // console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      this.showChangeNameScreen = false;
      this.dialog = false;
    },
    geo_error: function (err) {
      this.geolocation_error = true;
    },
    get_markers: function (response) {
      if (this.axiosstop) return; //FIXME: hack for ios13
      var now_time = new Date().getTime() / 1000;
      var default_color = 0;
      var role = false;
      for (var key in response.data) {
        var value = response.data[key]; //NEW DATA
        //Accuracy
        var minDifference = 0.1 / 2;
        if (value.accuracy < 5) {
          minDifference = 0.00005;
        } else if (value.accuracy < 10) {
          minDifference = 0.0001 / 2;
        } else if (value.accuracy < 100) {
          minDifference = 0.001 / 2;
        } else if (value.accuracy < 1000) {
          minDifference = 0.01 / 2;
        }

        //Heading
        var heading = 0;
        if (typeof this.markers[key] !== "undefined") {
          var location_change = true;
          //ACCURACY
          if (
            Math.abs(
              this.markers[key].geolocation_lat - value.geolocation_lat
            ) < minDifference &&
            Math.abs(
              this.markers[key].geolocation_lng - value.geolocation_lng
            ) < minDifference
          ) {
            value.geolocation_lat = this.markers[key].geolocation_lat;
            value.geolocation_lng = this.markers[key].geolocation_lng;
            location_change = false;
          }
          //HEADING
          heading = this.markers[key].icon.rotation;
          if (
            typeof this.google.maps.geometry !== "undefined" &&
            location_change == true
          ) {
            heading = this.google.maps.geometry.spherical.computeHeading(
              new this.google.maps.LatLng(
                this.markers[key].geolocation_lat,
                this.markers[key].geolocation_lng
              ),
              new this.google.maps.LatLng(
                value.geolocation_lat,
                value.geolocation_lng
              )
            );
          }
        }
        value.color = parseInt(value.color);
        if (isNaN(value.color)) {
          value.color = default_color;
        }
        if (value.is_prey == "1") {
          var color = "#dd0000";
          value.text_color = "#404040";
        } else {
          var color = this.colors[value.color]["value"];
          value.text_color = this.colors[value.color]["text"];
        }

        //icon
        value.icon = {
          path: this.car,
          scale: 0.7,
          anchor: new this.google.maps.Point(10, 25),
          labelOrigin: new this.google.maps.Point(10, 25),
          strokeColor: "white",
          strokeWeight: 0.1,
          fillOpacity: 1,
          fillColor: color,
          rotation: heading,
        };
        // last marker update
        if (parseInt(value.last_activity) < 60) {
          value.last_activity = value.last_activity.toFixed(0) + " sec";
        } else {
          value.last_activity = (value.last_activity / 60).toFixed(0) + " min";
        }

        if (value.is_prey == "1") {
          if (value.id == localStorage.key_id) {
            role = true;
          }
          this.prey_position = {
            lat: value.geolocation_lat,
            lng: value.geolocation_lng,
          };
        }
      }
      this.am_i_prey = role;

      this.markers = response.data;
    },
    markers_update_interval: function () {
      let interval = 1000;
      let marker_url = "";

      this.intervalid1 = setInterval(
        function () {
          if (this.real_replay_time > 0) {
            marker_url =
              this.server_url +
              "history_markers.php?time=" +
              this.real_replay_time;
            this.real_replay_time += 2; // increase current history timestamp
          } else {
            marker_url = this.server_url;
          }
          this.axios
            .get(marker_url, {
              params: {
                game: this.game,
                id: localStorage.key_id,
                password: localStorage.password,
              },
            })
            .then(this.get_markers)
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .then(function () {
              // always executed
            });
        }.bind(this),
        interval
      );
    },
    alarm: function (response) {
      if (response.data == true) {
        this.alarm_audio.play();
        this.ios_alarm = true;
      } else {
        this.alarm_audio.pause();
        this.ios_alarm = false;
      }
    },
    distance_interval: function () {
      this.intervalid1 = setInterval(
        function () {
          if (this.am_i_prey && this.game_state == "inprogress") {
            this.axios
              .get(this.server_url + "distance.php", {
                params: {
                  game: this.game,
                  id: localStorage.key_id,
                  password: localStorage.password,
                },
              })
              .then(this.alarm)
              .catch(function (error) {
                // handle error
                console.log(error);
              })
              .then(function () {
                // always executed
              });
          } else {
            this.alarm_audio.pause();
            this.ios_alarm = false;
          }
        }.bind(this),
        2000
      );
    },
    startReplay: function () {
      this.real_replay_time = parseInt(
        (
          new Date(this.replay_date + "T" + this.replay_time).getTime() / 1000
        ).toFixed(0)
      );
    },
    stopReplay: function () {
      this.real_replay_time = 0;
    },
    startGame: function () {
      var bodyFormData = new FormData();
      bodyFormData.set("game_time", this.game_time);
      bodyFormData.set("waiting_time", this.waiting_time);
      bodyFormData.set("end_game", 0);
      bodyFormData.set("game", localStorage.game);
      bodyFormData.set("password", localStorage.password);
      bodyFormData.set("id", localStorage.key_id);
      this.axios
        .post(this.server_url + "send_time.php", bodyFormData)
        .then(
          function (response) {
            // console.log(response);
          }.bind(this)
        )
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    stopGame: function () {
      var bodyFormData = new FormData();
      bodyFormData.set("game", localStorage.game);
      bodyFormData.set("password", localStorage.password);
      bodyFormData.set("id", localStorage.key_id);
      this.axios
        .post(this.server_url + "stop_game.php", bodyFormData)
        .then(
          function (response) {
            // console.log(response);
          }.bind(this)
        )
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    get_game_settings: function (response) {
      if (this.axiosstop) return; //FIXME: hack for ios13
      this.game_settings = response.data;
      var remaining_time = 0;
      var new_game_state = "";
      if (
        this.start_time != this.game_settings.start_time &&
        this.$refs.game_timer
      ) {
        this.start_time = this.game_settings.start_time;
      }
      var time_diff = 0;

      if (response.data.end_game == "0") {
        //if not end of the game
        time_diff = this.game_settings.now_time - this.game_settings.start_time; //time from game start
        if (this.game_settings.waiting_time * 60 >= time_diff) {
          //if still is waiting time
          remaining_time = this.game_settings.waiting_time * 60 - time_diff; //how long to wait
          new_game_state = "waiting";
        } else {
          //game is on
          remaining_time =
            this.game_settings.game_time * 60 -
            (time_diff - this.game_settings.waiting_time * 60);
          new_game_state = "inprogress";
        }
        if (remaining_time < 0) {
          remaining_time = 0;
          new_game_state = "stopped";
        }

        if (this.game_state != new_game_state) {
          this.game_state = new_game_state;
        }
        if (this.$refs.game_timer) {
          this.$refs.game_timer.resetTimer(remaining_time.toFixed(0));
          this.$refs.game_timer.startTimer();
        }
      } else if (this.game_state != "nogame" && this.$refs.game_timer) {
        this.game_state = "nogame";
        this.$refs.game_timer.stopTimer();
      }
    },
    game_timer_update: function () {
      this.intervalid1 = setInterval(
        function () {
          this.axios
            .get(this.server_url + "game_timer_update.php", {
              params: {
                name: this.game,
                id: localStorage.key_id,
                password: localStorage.password,
              },
            })
            .then(this.get_game_settings)
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .then(function () {
              // always executed
            });
        }.bind(this),
        1000
      );
    },
    closed_districts: function (response) {
      if (this.axiosstop) return; //FIXME: hack for ios13
      //Update districts checkboxes in menu
      this.checked_districts = [];
      response.data.forEach(
        function (value, key) {
          this.checked_districts.push(value.district);
        }.bind(this)
      );

      this.polygons = [];
      //Draw polygon
      this.districts.forEach(
        function (value, key) {
          if (this.checked_districts.includes(value.name)) {
            this.polygons.push(value);
          }
        }.bind(this)
      );
    },
    get_districts: function () {
      this.intervalid1 = setInterval(
        function () {
          this.axios
            .get(this.server_url + "get_districts.php", {
              params: {
                game: this.game,
                id: localStorage.key_id,
                password: localStorage.password,
              },
            })
            .then(this.closed_districts)
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .then(function () {
              // always executed
            });
        }.bind(this),
        2000
      );
    },
    update_districts: function (district) {
      var checked = false;
      if (this.checked_districts.includes(district)) {
        checked = false;
      } else {
        checked = true;
      }
      var bodyFormData = new FormData();
      bodyFormData.set("district", district);
      bodyFormData.set("close", checked);
      bodyFormData.set("game", this.game);
      bodyFormData.set("password", localStorage.password);
      bodyFormData.set("id", localStorage.key_id);
      //post prey info
      this.axios
        .post(this.server_url + "update_districts.php", bodyFormData)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    update_game_setting: function () {
      var bodyFormData = new FormData();
      bodyFormData.set("game_type", this.game_settings.game_type);
      bodyFormData.set("radius", this.game_settings.radius);
      bodyFormData.set("game", this.game);
      bodyFormData.set("password", localStorage.password);
      bodyFormData.set("id", localStorage.key_id);
      //post new visibility radius
      this.axios
        .post(this.server_url + "game_setup.php", bodyFormData)
        .then(function (response) {})
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    delete_user: function (marker) {
      var bodyFormData = new FormData();
      bodyFormData.set("user_id", marker.id);
      bodyFormData.set("game", this.game);
      bodyFormData.set("password", localStorage.password);
      bodyFormData.set("id", localStorage.key_id);
      //post prey info
      this.axios
        .post(this.server_url + "delete_user.php", bodyFormData)
        .then(
          function (response) {
            this.mainMenu("Users");
          }.bind(this)
        )
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      this.deleteActionSheet = false;
      this.dialog = false;
      this.userSettingsView = false;
      this.usersMenuView = true;
    },
    screenLock: function () {},
    testAlert: function () {
      alert("Hola");
      console.log(1111);
    },

    handleCloseStartDialog: function () {
      this.dialog = this.showStartScreen = false;
      this.screenLock();
    },
  },
};
</script>
