<template>
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
          <CCardHeader> <strong> Profile </strong> Update </CCardHeader>
          <CCardBody>
            <CForm>
              <CInput label="Id" v-model="obj.id" horizontal plaintext />
              <CInput
                description="Profile Name"
                label="Name"
                horizontal
                autocomplete="name"
                v-model="obj.name"
              />
              <CInput
                description="Profile Email"
                label="Email"
                horizontal
                autocomplete="email"
                v-model="obj.email"
              />
              <CRow form class="form-group">
                <CCol tag="label" sm="3" class="col-form-label">
                  Reset Password?
                </CCol>
                <CCol sm="9">
                  <CSwitch
                    class="mr-1"
                    color="primary"
                    :checked.sync="isResetPassword"
                    :disabled="isDisableResetPassword"
                  />
                </CCol>
              </CRow>
              <CInput
                description="Please specifiy your new password"
                label="Password"
                horizontal
                autocomplete="password"
                v-model="password"
                v-if="isResetPassword"
              />
              <CInput
                description="Profile Phone"
                label="Phone"
                horizontal
                autocomplete="phone"
                v-model="obj.phone"
              />
              <CInput
                description="Address 1"
                label="Address 1"
                horizontal
                autocomplete="address1"
                v-model="obj.address1"
              />
              <CInput
                description="Address 2"
                label="Address 2"
                horizontal
                autocomplete="address2"
                v-model="obj.address2"
              />
              <CInput
                description="Address 3"
                label="Address 3"
                horizontal
                autocomplete="address3"
                v-model="obj.address3"
              />
              <CInput
                description="City"
                label="City"
                horizontal
                autocomplete="city"
                v-model="obj.city"
              />
              <CInput
                description="Postcode"
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
              <CSelect
                label="Role"
                horizontal
                :options="['normal', 'admin']"
                :value.sync="obj.role"
              />
              <!-- <CRow form class="form-group">
                <CCol tag="label" sm="3" class="col-form-label">
                  Organization Type
                </CCol>
                <CCol sm="9">
                  <CInputCheckbox
                    v-for="item in roleList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :checked="item.checked"
                    @click="onRoleClick(item.value, $event)"
                  />
                </CCol>
              </CRow> -->
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
</template>

<script>
import TatApi from "../../lib/tatapi";

export default {
  name: "Profile",
  data: () => {
    return {
      // organizationList: [],
      // roleList: [],
      infoList: [],
      api: new TatApi(),
      password: "",
      isResetPassword: false,
      isDisableResetPassword: false,
      obj: {
        id: "",
        // name: "",
        email: "",
        password: "",
        // phone: "",
        // // organization: {
        // //   id: "",
        // // },
        // // roleList: [],
        // isActive: "",
        // customJsonData: "",
      },
    };
  },
  mounted() {
    var self = this;
    // self.refreshOrganization();
    // self.refreshRole();
    if (self.$route.params.id) {
      this.api
        .getProfile(self.$route.params.id)
        .then((response) => {
          self.obj = response.data;
          console.log(self.obj);
          // self.api.getRoleList().then((response) => {
          //   for (var i in response.data) {
          //     var isAvailable = self.containsObject(
          //       response.data[i].id,
          //       self.obj.roleList
          //     );
          //     self.roleList.push({
          //       value: response.data[i].id,
          //       label: response.data[i].name,
          //       checked: isAvailable,
          //     });
          //   }
          // });
        })
        .catch(({ data }) => {
          self.toast("Error", data.message, "danger");
          // console.log(data);
        });
    } else {
      self.isResetPassword = true;
      self.isDisableResetPassword = true;
      self.password = "tuntung@123";
      // self.api.getRoleList().then((response) => {
      //   for (var i in response.data) {
      //     self.roleList.push({
      //       value: response.data[i].id,
      //       label: response.data[i].name,
      //       checked: false,
      //     });
      //   }
      // });
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      var self = this;
      if (self.isResetPassword && self.password != "") {
        self.obj.password = self.password;
      }

      if (self.obj.id == "") {
        this.api
          .createProfile(self.obj)
          .then((response) => {
            self.obj = {};
            self.$router.push({ path: "/admin/profilelist" });
          })
          .catch(({ data }) => {
            self.toast("Error", data.message, "danger");
            // console.log(data);
          });
      } else {
        this.api
          .updateProfile(self.obj)
          .then((response) => {
            self.obj = {};
            self.$router.push({ path: "/admin/profilelist" });
          })
          .catch(({ data }) => {
            self.toast("Error", data.message, "danger");
            // console.log(data);
          });
      }
    },
    onReset(evt) {
      evt.preventDefault();
      this.obj = {};
    },
    toast(header, message, color) {
      var self = this;
      self.infoList.push({
        header: header,
        message: message,
        color: color,
      });
    },
  },
};
</script>
