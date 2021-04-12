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
          <CCardHeader> <strong> Business </strong> Information </CCardHeader>
          <CCardBody>
            <CForm>
              <CInput label="Id" v-model="obj.id" horizontal plaintext />
              <CInput
                description="Business Name"
                label="Name"
                horizontal
                autocomplete="name"
                v-model="obj.name"
              />
              <!-- <CSelect
                label="Organization"
                horizontal
                v-model="obj.organizationType.id"
                :value.sync="obj.organizationType.id"
                :options="organizationTypeList"
                placeholder="Please select"
              /> -->
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
  name: "Business",
  data: () => {
    return {
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
        .getBusiness(self.$route.params.id)
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
          .createBusiness(self.obj)
          .then((response) => {
            self.$router.push({ path: "/admin/businesslist" });
          })
          .catch(({ data }) => {
            self.toast("Error", data.message, "danger");
            // console.log(data);
          });
      } else {
        this.api
          .updateBusiness(self.obj)
          .then((response) => {
            self.$router.push({ path: "/admin/businesslist" });
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
  },
};
</script>
