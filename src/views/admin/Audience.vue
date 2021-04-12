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
          <CCardHeader> <strong> Audience </strong> Information </CCardHeader>
          <CCardBody>
            <CForm>
              <CInput label="Id" v-model="obj.id" horizontal plaintext />
              <CInput
                description="For eg. Weekdays, CNY 2014, Pesta Buku"
                label="Name"
                horizontal
                autocomplete="name"
                v-model="obj.name"
              />
              <CInput
                description="For eg. Bukit Bintang, Damansara, The Mines"
                label="Location"
                horizontal
                autocomplete="location"
                v-model="obj.location"
              />
              <CInput
                description="GPS latiude coordinate"
                label="Latitude"
                horizontal
                autocomplete="latitude"
                v-model="obj.latitude"
              />
              <CInput
                description="GPS longitude coordinate"
                label="Longitude"
                horizontal
                autocomplete="longitude"
                v-model="obj.longitude"
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
</template>

<script>
import TatApi from "../../lib/tatapi";

export default {
  name: "Audience",
  data: () => {
    return {
      infoList: [],
      organizationTypeList: [],
      api: new TatApi(),
      obj: {
        id: "",
        name: "",
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
    if (self.$route.params.id) {
      this.api
        .getAudience(self.$route.params.id)
        .then((response) => {
          self.obj = response.data;
        })
        .catch(({ data }) => {
          self.toast("Error", data.message, "danger");
          // console.log(data);
        });
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
          .createAudience(self.obj)
          .then((response) => {
            self.$router.push({ path: "/admin/audiencelist" });
          })
          .catch(({ data }) => {
            self.toast("Error", data.message, "danger");
            // console.log(data);
          });
      } else {
        this.api
          .updateAudience(self.obj)
          .then((response) => {
            self.$router.push({ path: "/admin/audiencelist" });
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
