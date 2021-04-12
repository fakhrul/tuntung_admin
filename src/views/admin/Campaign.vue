<template>
  <div class="wrapper">
    <div>
      <CToaster :autohide="3000">
        <template v-for="info in infoList">
          <CToast
            :key="info.message"
            :show="true"
            :header="info.header"
            :color="info.color"
          >
            {{ info.message }}.
          </CToast>
        </template>
      </CToaster>
      <CRow>
        <CCol sm="12">
          <CCard>
            <CCardHeader> <strong> Campaign </strong> Information </CCardHeader>
            <CCardBody>
              <CForm>
                <CInput label="Id" v-model="obj.id" horizontal plaintext />
                <!-- <CInput
                  label="Advertiser Id"
                  v-model="obj.advertiser_id"
                  horizontal
                  readonly
                /> -->
                <CInput
                  description="Must have advertiser, please click Search button to select."
                  label="Advertiser Name"
                  v-model="obj.advertiser.name"
                  horizontal
                  readonly
                >
                  <template #append>
                    <CButton color="primary" @click="onSearchAdvertiser()">
                      <CIcon name="cil-magnifying-glass" /> Search
                    </CButton>
                  </template>
                </CInput>
                <CInput
                  label="Campaign Name"
                  horizontal
                  autocomplete="name"
                  v-model="obj.name"
                />
                <CInput
                  description="Must have audience, please click Search button to select."
                  label="Audience"
                  horizontal
                  autocomplete="name"
                  v-model="audienceInfo"
                  readonly
                >
                  <template #append>
                    <CButton color="primary" @click="onSearchAudience()">
                      <CIcon name="cil-magnifying-glass" /> Search
                    </CButton>
                  </template>
                </CInput>
                <CInput
                  label="Total Walker"
                  horizontal
                  autocomplete="total_walker"
                  v-model="obj.total_walker"
                />
                <CSelect
                  label="Status"
                  horizontal
                  :options="['', 'New']"
                  :value.sync="obj.status"
                />
                <CRow form class="form-group">
                  <CCol tag="label" sm="3" class="col-form-label">
                    Campaign Schedule
                  </CCol>
                  <CCol sm="9">
                    <CDataTable
                      :items="obj.campaign_schedule_list"
                      :fields="campaign_schedule_fields"
                      striped
                      caption="Striped Table"
                    />
                    <CButton
                      size="sm"
                      color="primary"
                      class="ml-1"
                      @click="onAddSchedule()"
                    >
                      Add Schedule
                    </CButton>
                    <!-- <CInputCheckbox
                      v-for="item in roleList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :checked="item.checked"
                      @click="onRoleClick(item.value, $event)"
                    /> -->
                  </CCol>
                </CRow>
                <CRow form class="form-group">
                  <CCol tag="label" sm="3" class="col-form-label">
                    Campaign Images
                  </CCol>
                  <CCol sm="9">
                    <!-- <CDataTable
                      :items="obj.campaign_schedule_list"
                      :fields="campaign_schedule_fields"
                      striped
                      caption="Striped Table"
                    /> -->
                    <p>
                      <template v-for="image in obj.campaign_image_list">
                        <CImg :key="image.id" :src="image.imageUrl" />
                        <!-- <CImg
                        :src="uploadedImage"
                        class="mb-2"
                        thumbnail="true"
                      /> -->
                      </template>
                    </p>
                    <CButton
                      size="sm"
                      color="primary"
                      class="ml-1"
                      @click="onAddImage()"
                    >
                      Select Image
                    </CButton>
                    <!-- <CInputCheckbox
                      v-for="item in roleList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :checked="item.checked"
                      @click="onRoleClick(item.value, $event)"
                    /> -->
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary" @click="onSubmit"
                ><CIcon name="cil-check-circle" /> Submit</CButton
              >
              <CButton type="reset" size="sm" color="danger" @click="onReset"
                ><CIcon name="cil-ban" /> Reset</CButton
              >
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </div>
    <div>
      <!-- Modal Component -->
      <CModal
        title="Search for Audience"
        :show.sync="audienceSearchPopup"
        size="xl"
      >
        <CRow>
          <CCol sm="12">
            <CCard>
              <!-- <CCardHeader> <strong> Campaign </strong> List </CCardHeader> -->
              <CCardBody>
                <CDataTable
                  :items="audienceList"
                  :fields="audienceFieldList"
                  column-filter
                  table-filter
                  items-per-page-select
                  :items-per-page="10"
                  hover
                  sorter
                  pagination
                >
                  <template #show_details="{item, index}">
                    <td class="py-2">
                      <CButton
                        color="primary"
                        variant="outline"
                        square
                        size="sm"
                        @click="onAudienceSelected(item, index)"
                      >
                        Select
                      </CButton>
                    </td>
                  </template>
                </CDataTable>
              </CCardBody>
              <CCardFooter> </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CModal>

      <CModal
        title="Search for Advertiser"
        :show.sync="advertiserSearchPopup"
        size="xl"
      >
        <CRow>
          <CCol sm="12">
            <CCard>
              <!-- <CCardHeader> <strong> Campaign </strong> List </CCardHeader> -->
              <CCardBody>
                <CDataTable
                  :items="advertiserList"
                  :fields="advertiserFieldList"
                  column-filter
                  table-filter
                  items-per-page-select
                  :items-per-page="10"
                  hover
                  sorter
                  pagination
                >
                  <template #show_details="{item, index}">
                    <td class="py-2">
                      <CButton
                        color="primary"
                        variant="outline"
                        square
                        size="sm"
                        @click="onAdvertiserSelected(item, index)"
                      >
                        Select
                      </CButton>
                    </td>
                  </template>
                </CDataTable>
              </CCardBody>
              <CCardFooter> </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CModal>

      <CModal
        title="Add Schedule"
        :show.sync="addSchedulePopup"
        size="sm"
        @update:show="onAddConfirmation"
      >
        <CForm>
          <CInput
            label="Date"
            type="date"
            horizontal
            v-model="newSchedule.start_date"
          />
          <CInput
            label="Start Time"
            type="time"
            horizontal
            v-model="newSchedule.start_time"
          />
          <!-- <CInput
            label="End Date"
            type="date"
            horizontal
            v-model="newSchedule.end_date"
          /> -->
          <CInput
            label="End Time"
            type="time"
            horizontal
            v-model="newSchedule.end_time"
          />
        </CForm>
      </CModal>

      <CModal title="Add Image" :show.sync="addImagePopup" size="xl">
        <CRow>
          <CCol sm="12">
            <CCard>
              <!-- <CCardHeader> <strong> Campaign </strong> List </CCardHeader> -->
              <CCardBody>
                <CDataTable
                  :items="imageList"
                  :fields="imageFieldList"
                  column-filter
                  table-filter
                  items-per-page-select
                  :items-per-page="10"
                  hover
                  sorter
                  pagination
                >
                  <template #show_image="{item, index}">
                    <td class="py-2">
                      <CImg :key="item.id" :src="item.imageUrl" />
                    </td>
                  </template>
                  <template #show_details="{item, index}">
                    <td class="py-2">
                      <CButton
                        color="primary"
                        variant="outline"
                        square
                        size="sm"
                        @click="onImageSelected(item, index)"
                      >
                        Select
                      </CButton>
                    </td>
                  </template>
                </CDataTable>
              </CCardBody>
              <CCardFooter> </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CModal>
    </div>
  </div>
</template>

<script>
import TatApi from "../../lib/tatapi";
import moment from "moment";

const imageList = [];
const imageFieldList = [
  { key: "name", _style: "min-width:200px;" },
  { key: "show_image", _style: "min-width:200px;" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];

const advertiserList = [];
const advertiserFieldList = [
  { key: "name", _style: "min-width:200px;" },
  // { key: "location", _style: "min-width:200px;" },
  // { key: "id", _style: "min-width:50px" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];

const audienceList = [];
const audienceFieldList = [
  { key: "name", _style: "min-width:200px;" },
  { key: "location", _style: "min-width:200px;" },
  // { key: "id", _style: "min-width:50px" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];

const campaign_schedule_fields = [
  { key: "start_at", _style: "min-width:200px;" },
  { key: "end_at", _style: "min-width:200px;" },
  {
    key: "remove",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];

export default {
  name: "Campaign",
  data: () => {
    return {
      addImagePopup: false,
      imageList: imageList.map((item, id) => {
        return { ...item, id };
      }),
      imageFieldList,

      campaign_schedule_fields,
      addSchedulePopup: false,
      newSchedule: {
        start_date: "",
        start_time: "",
        // end_date: "",
        end_time: "",
      },
      advertiserSearchPopup: false,
      advertiserList: advertiserList.map((item, id) => {
        return { ...item, id };
      }),
      advertiserFieldList,
      audienceSearchPopup: false,
      audienceList: audienceList.map((item, id) => {
        return { ...item, id };
      }),
      audienceFieldList,
      infoList: [],
      api: new TatApi(),
      // advertiser: {},
      audienceInfo: "",
      // imageList: [
      //   {
      //     id: 1,
      //     imageUrl: "http://localhost:5005/api/ads/image/15",
      //   },
      //   {
      //     id: 2,
      //     imageUrl: "http://localhost:5005/api/ads/image/16",
      //   },
      // ],
      imageList: [],
      obj: {
        id: "",
        advertiser_id: "",
        advertiser: {
          id: "",
          name: "",
        },
        audience_id: "",
        audience: {
          id: "",
          name: "",
        },
        // audience_name: "",
        audience_location: "",
        campaign_schedule_list: [],
        campaign_image_list: [],
        // name: "",
        // profile: {
        //   id: "",
        //   email: "",
        // },
        // organizationType: {
        //   id: "",
        // },
        // isActive: "",
        // customJsonData: "",
      },
    };
  },
  mounted() {
    var self = this;
    if (self.$route.params.id == 0) self.$route.params.id = "";
    if (self.$route.params.id) {
      this.api
        .getCampaign(self.$route.params.id)
        .then((response) => {
          self.obj = response.data;
          // self.obj.audience_id = self.audienceList[index].id;
          // self.obj.audience_name = self.audienceList[index].name;
          // self.obj.audience_location = self.audienceList[index].location;
          self.audienceInfo =
            self.obj.audience.name + " at " + self.obj.audience.location;
          console.log(self.obj);
        })
        .catch(({ data }) => {
          self.toast("Error", data.message, "danger");
          // console.log(data);
        });
    } else {
      if (self.$route.params.advertiserId == 0)
        self.$route.params.advertiserId = "";

      if (self.$route.params.advertiserId) {
        self.obj.advertiser_id = self.$route.params.advertiserId;
        this.api
          .getAdvertiser(self.obj.advertiser_id)
          .then((response) => {
            self.obj.advertiser = response.data;
          })
          .catch(({ data }) => {
            self.toast("Error", data.message, "danger");
            // console.log(data);
          });
      } else {
      }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      var self = this;
      if (self.obj.id == "") {
        this.api
          .createCampaign(self.obj)
          .then((response) => {
            self.toast("Info", "Successfully add", "info");
            // self.infoList.push({ message: "Successfully add" });
            self.$router.push({ path: "/admin/campaignlist" });
          })
          .catch(({ data }) => {
            self.toast("Error", data.message, "danger");
            // console.log(data);
          });
      } else {
        this.api
          .updateCampaign(self.obj)
          .then((response) => {
            self.toast("Info", "Successfully update", "info");
            self.$router.push({ path: "/admin/campaignlist" });
          })
          .catch(({ data }) => {
            self.toast("Error", data.message, "danger");
            // console.log(data);
          });
      }
    },
    toast(header, message, color) {
      var self = this;
      self.infoList.push({
        header: header,
        message: message,
        color: color,
      });
    },
    onReset(evt) {
      evt.preventDefault();
      var self = this;
      return;
      this.obj = {};
    },
    refreshTableAudience() {
      var self = this;
      self.api
        .getAudienceList()
        .then((response) => {
          self.audienceList = response.data;
        })
        .catch(({ data }) => {
          self.toast("Error", data.message, "danger");
          // console.log(data);
        });
    },
    refreshTableAdvertiser() {
      var self = this;
      self.api
        .getAdvertiserList()
        .then((response) => {
          self.advertiserList = response.data;
        })
        .catch(({ data }) => {
          self.toast("Error", data.message, "danger");
          // console.log(data);
        });
    },
    onSearchAudience() {
      var self = this;
      self.refreshTableAudience();
      self.audienceSearchPopup = true;
    },
    onSearchAdvertiser() {
      var self = this;
      self.refreshTableAdvertiser();
      self.advertiserSearchPopup = true;
    },
    onAudienceSelected(item, index) {
      var self = this;
      self.obj.audience_id = self.audienceList[index].id;
      self.obj.audience = self.audienceList[index];
      // self.obj.audience_name = self.audienceList[index].name;
      // self.obj.audience_location = self.audienceList[index].location;
      self.audienceInfo =
        self.obj.audience.name + " at " + self.obj.audience.location;
      self.audienceSearchPopup = false;
    },
    onAdvertiserSelected(item, index) {
      var self = this;
      self.obj.advertiser_id = self.advertiserList[index].id;
      self.obj.advertiser = self.advertiserList[index];
      self.advertiserSearchPopup = false;
    },
    onImageSelected(item, index) {
      var self = this;
      if (!self.obj.campaign_image_list) {
        self.obj.campaign_image_list = [];
      }
      self.obj.campaign_image_list.push(self.imageList[index]);
      self.addImagePopup = false;
      // self.obj.advertiser_id = self.advertiserList[index].id;
      // self.obj.advertiser = self.advertiserList[index];
      // self.advertiserSearchPopup = false;
    },

    onAddSchedule() {
      var self = this;
      self.addSchedulePopup = true;
    },
    onAddImage() {
      var self = this;
      if (!self.obj.advertiser_id) {
        self.toast("Error", "Please select advertiser", "danger");
        return;
      }
      self.refreshTableAdsImage();
      self.addImagePopup = true;
    },
    refreshTableAdsImage() {
      var self = this;
      self.api
        .getAdsImageListByAdvertiser(self.obj.advertiser_id)
        // .getAdsImageList()
        .then((response) => {
          self.imageList = response.data;
          for (var i in self.imageList) {
            self.imageList[i].imageUrl = self.api.getAdsImageUrl(
              self.imageList[i].id
            );
          }
          // console.log(response.data);
        })
        .catch(({ data }) => {
          self.toast("Error", data.message, "danger");
          // console.log(data);
        });
    },
    onAddConfirmation(status, evt, accept) {
      var self = this;
      if (accept) {
        if (
          self.newSchedule.start_date != "" &&
          self.newSchedule.start_time != "" &&
          // self.newSchedule.end_date != "" &&
          self.newSchedule.end_time != ""
        ) {
          console.log(self.newSchedule);
          var start_at = moment(
            self.newSchedule.start_date + " " + self.newSchedule.start_time,
            "YYYY-MM-DD hh:mm"
          );
          var end_at = moment(
            self.newSchedule.start_date + " " + self.newSchedule.end_time,
            "YYYY-MM-DD hh:mm"
          );
          self.obj.campaign_schedule_list.push({
            start_at: start_at.format("YYYY-MM-DDTHH:mm:ss"),
            end_at: end_at.format("YYYY-MM-DDTHH:mm:ss"),
            // start_date: self.newSchedule.start_date,
            // start_time: self.newSchedule.start_time,
            // end_date: self.newSchedule.end_date,
            // end_time: self.newSchedule.end_time,
          });
        }
      }
      self.newSchedule.start_date = "";
      self.newSchedule.start_time = "";
      // self.newSchedule.end_date = "";
      self.newSchedule.end_time = "";
    },
  },
};
</script>
