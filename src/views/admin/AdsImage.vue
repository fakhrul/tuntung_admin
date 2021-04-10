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
            <CCardHeader> <strong> AdsImage </strong> Information </CCardHeader>
            <CCardBody>
              <CForm>
                <CInput label="Id" v-model="obj.id" horizontal plaintext />
                <CInput
                  description="AdsImage Name"
                  label="Name"
                  horizontal
                  autocomplete="name"
                  v-model="obj.name"
                />
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
                <CInputFile
                  label="Image File"
                  @change="onFileChange"
                  horizontal
                  accept="image/x-png,image/gif,image/jpeg"
                />
                <CRow form class="form-group">
                  <CCol tag="label" sm="3" class="col-form-label">
                    Image Preview
                  </CCol>
                  <CCol sm="9">
                    <CImg :src="uploadedImage" class="mb-2" thumbnail="true" />
                  </CCol>
                </CRow>
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
    <div>
      <!-- Modal Component -->
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
    </div>
  </div>
</template>

<script>
import TatApi from "../../lib/tatapi";

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

export default {
  name: "AdsImage",
  data: () => {
    return {
      advertiserSearchPopup: false,
      advertiserList: advertiserList.map((item, id) => {
        return { ...item, id };
      }),
      advertiserFieldList,

      infoList: [],
      uploadedImage: "",
      organizationTypeList: [],
      api: new TatApi(),
      obj: {
        id: "",
        name: "",
        advertiser_id: "",
        advertiser: {
          id: "",
          name: "",
        },
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
      this.api.getAdsImage(self.$route.params.id).then((response) => {
        self.obj = response.data;
      });
    }
  },
  methods: {
    onFileChange(e) {
      var self = this;
      // var files = e.target.files || e.dataTransfer.files;
      self.createImage(e[0]);
    },
    //View uploaded image
    createImage(file) {
      var self = this;
      let reader = new FileReader();
      reader.onload = (e) => {
        self.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    //Upload image to server
    // onUploadImage() {
    //   var params = new FormData();
    //   params.append("image", this.uploadedImage);
    //   //I am posting the data converted to FormData using Axios to Flask.
    //   axios.post(`${API_URL}/classification`, params).then(function(response) {
    //     console.log(response);
    //   });
    // },
    onSubmit(evt) {
      evt.preventDefault();
      var self = this;
      self.obj.image = self.uploadedImage;
      if (self.obj.id == "") {
        this.api
          .createAdsImage(self.obj)
          .then((response) => {
            self.$router.push({ path: "/admin/imagelist" });
          })
          .catch(({ data }) => {
            self.toast("Error", data.message, "danger");
            // console.log(data);
          });
      } else {
        this.api.updateAdsImage(self.obj).then((response) => {
          self.$router.push({ path: "/admin/imagelist" });
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
    onSearchAdvertiser() {
      var self = this;
      self.refreshTableAdvertiser();
      self.advertiserSearchPopup = true;
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
    onAdvertiserSelected(item, index) {
      var self = this;
      self.obj.advertiser_id = self.advertiserList[index].id;
      self.obj.advertiser = self.advertiserList[index];
      self.advertiserSearchPopup = false;
    },
  },
};
</script>
