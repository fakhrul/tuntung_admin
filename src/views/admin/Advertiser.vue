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
            <CCardHeader>
              <strong> Advertiser </strong> Information
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CInput label="Id" v-model="obj.id" horizontal plaintext />
                <!-- <CInput
                label="Owner Id"
                v-model="obj.profile_id"
                horizontal
                plaintext
              />
              <CInput
                label="Owner Email"
                v-model="obj.profile_email"
                horizontal
                plaintext
              /> -->
                <CInput
                  description="Must have owner, please click Search button to select."
                  label="Owner"
                  v-model="obj.profile.email"
                  horizontal
                  readonly
                >
                  <template #append>
                    <CButton color="primary" @click="onSearchProfile()">
                      <CIcon name="cil-magnifying-glass" /> Search
                    </CButton>
                  </template>
                </CInput>
                <CInput
                  description="Organization, Company, Branding Name"
                  label="Name"
                  horizontal
                  autocomplete="name"
                  v-model="obj.name"
                />
                <CInput
                  description="Must be email format for eg. abc@email.com"
                  label="Email"
                  horizontal
                  autocomplete="email"
                  v-model="obj.email"
                />
                <CInput
                  description="Numbers Only"
                  label="Phone"
                  horizontal
                  autocomplete="phone"
                  v-model="obj.phone"
                />
                <CInput
                  label="Address 1"
                  horizontal
                  autocomplete="address1"
                  v-model="obj.address1"
                />
                <CInput
                  label="Address 2"
                  horizontal
                  autocomplete="address2"
                  v-model="obj.address2"
                />
                <CInput
                  label="Address 3"
                  horizontal
                  autocomplete="address3"
                  v-model="obj.address3"
                />
                <CInput
                  label="City"
                  horizontal
                  autocomplete="city"
                  v-model="obj.city"
                />
                <CInput
                  description="Numbers Only"
                  label="Postcode"
                  horizontal
                  autocomplete="postcode"
                  v-model="obj.postcode"
                />
                <CSelect
                  label="State"
                  horizontal
                  :options="[
                    '',
                    'Johor',
                    'Kedah',
                    'Kelantan',
                    'Melaka',
                    'Negeri Sembilan',
                    'Pahang',
                    'Pulau Pinang',
                    'Perak',
                    'Perlis',
                    'Sabah',
                    'Sarawak',
                    'Selangor',
                    'Terengganu',
                    'Kuala Lumpur',
                    'Labuan',
                    'Putrajaya',
                  ]"
                  :value.sync="obj.state"
                />
                <CSelect
                  label="Country"
                  horizontal
                  :options="['', 'Malaysia']"
                  :value.sync="obj.country"
                />
                <CInput
                  label="Contact Person Name"
                  horizontal
                  autocomplete="contact_name"
                  v-model="obj.contact_name"
                />
                <CInput
                  description="Numbers Only"
                  label="Contact Person Phone"
                  horizontal
                  autocomplete="contact_phone"
                  v-model="obj.contact_phone"
                />
                <CInput
                  label="Contact Person Email"
                  horizontal
                  autocomplete="contact_email"
                  v-model="obj.contact_email"
                />
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
      <CModal
        title="Search for Profile"
        :show.sync="profileSearchPopup"
        size="xl"
      >
        <CRow>
          <CCol sm="12">
            <CCard>
              <!-- <CCardHeader> <strong> Campaign </strong> List </CCardHeader> -->
              <CCardBody>
                <CDataTable
                  :items="profileList"
                  :fields="profileFieldList"
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
                        @click="onProfileSelected(item, index)"
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

const profileList = [];
const profileFieldList = [
  { key: "id", _style: "min-width:50px" },
  { key: "name", _style: "min-width:200px;" },
  { key: "email", _style: "min-width:200px;" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];

export default {
  name: "Advertiser",
  data: () => {
    return {
      profileSearchPopup: false,
      profileList: profileList.map((item, id) => {
        return { ...item, id };
      }),
      profileFieldList,
      infoList: [],
      api: new TatApi(),
      obj: {
        id: "",
        profile_id: "",
        profile_email: "",
        profile: {
          id: "",
          name: "",
          email: "",
        },
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
    // self.refreshOrganizationType();
    console.log(self.$route.params);
    if (self.$route.params.id == 0) self.$route.params.id = "";
    if (self.$route.params.id) {
      this.api
        .getAdvertiser(self.$route.params.id)
        .then((response) => {
          self.obj = response.data;
        })
        .catch(({ data }) => {
          self.toast("Error", data.message, "danger");
          // console.log(data);
        });
    } else {
      if (self.$route.params.profileId == 0) self.$route.params.profileId = "";

      if (self.$route.params.profileId) {
        self.obj.profile_id = self.$route.params.profileId;
        this.api
          .getProfile(self.obj.profile_id)
          .then((response) => {
            self.obj.profile = response.data;
            self.obj.profile_email = self.obj.profile.email;
          })
          .catch(({ data }) => {
            self.toast("Error", data.message, "danger");
            // console.log(data);
          });
      } else {
      }

      // self.obj.profile_id = self.$route.params.profileId;
      // self.obj.profile_email = self.$route.params.profileEmail;
    }
  },
  methods: {
    // refreshOrganizationType() {
    //   var self = this;
    //   self.api.getOrganizationTypeList().then((response) => {
    //     for (var i in response.data) {
    //       self.organizationTypeList.push({
    //         value: response.data[i].id,
    //         label: response.data[i].name,
    //       });
    //     }
    //   });
    // },
    onSubmit(evt) {
      evt.preventDefault();
      var self = this;
      if (self.obj.id == "") {
        this.api
          .createAdvertiser(self.obj)
          .then((response) => {
            self.toast("Info", "Successfully add", "info");
            // self.infoList.push({ message: "Successfully add" });
            self.$router.push({ path: "/admin/advertiserlist" });
          })
          .catch(({ data }) => {
            self.toast("Error", data.message, "danger");
            // console.log(data);
          });
      } else {
        this.api
          .updateAdvertiser(self.obj)
          .then((response) => {
            self.toast("Info", "Successfully update", "info");
            self.$router.push({ path: "/admin/advertiserlist" });
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
    onSearchProfile() {
      var self = this;
      self.refreshTableProfile();
      self.profileSearchPopup = true;
    },
    onProfileSelected(item, index) {
      var self = this;
      self.obj.profile_id = self.profileList[index].id;
      self.obj.profile_email = self.profileList[index].email;
      self.obj.profile = self.profileList[index];
      self.profileSearchPopup = false;
    },
    refreshTableProfile() {
      var self = this;
      self.api
        .getProfileList()
        .then((response) => {
          self.profileList = response.data;
        })
        .catch(({ data }) => {
          self.toast("Error", data.message, "danger");
          // console.log(data);
        });
    },
  },
};
</script>
