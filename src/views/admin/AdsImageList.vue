<template>
  <CRow>
    <CCol sm="12">
      <CCard>
        <CCardHeader> <strong> AdsImage </strong> List </CCardHeader>
        <CCardBody>
          <CDataTable
            :items="items"
            :fields="fields"
            column-filter
            table-filter
            items-per-page-select
            :items-per-page="10"
            hover
            sorter
            pagination
          >
            <template #advertiser="{item}">
              <td>
                {{ item.advertiser.name }}
              </td>
            </template>
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
                  @click="toggleDetails(item, index)"
                >
                  {{ Boolean(item._toggled) ? "Hide" : "Show" }}
                </CButton>
              </td>
            </template>
            <template #details="{item}">
              <CCollapse
                :show="Boolean(item._toggled)"
                :duration="collapseDuration"
              >
                <CCardBody>
                  <CMedia :aside-image-props="{ height: 102 }">
                    <p class="text-muted">Name: {{ item.name }}</p>
                    <p>
                      <CImg
                        :src="item.imageUrl"
                        size="sm"
                        class="mb-2"
                        thumbnail
                      />
                    </p>
                    <CButton
                      size="sm"
                      color="info"
                      class=""
                      @click="onEdit(item)"
                    >
                      Edit
                    </CButton>
                    <CButton
                      size="sm"
                      color="danger"
                      class="ml-1"
                      @click="showDeleteConfirmation(item)"
                    >
                      Delete
                    </CButton>
                  </CMedia>
                </CCardBody>
              </CCollapse>
            </template>
          </CDataTable>
        </CCardBody>
        <CCardFooter>
          <CButton type="submit" size="sm" color="primary" @click="addNew"
            ><CIcon name="cil-check-circle" /> Add New</CButton
          >
        </CCardFooter>
      </CCard>
      <CModal
        title="Confirm Delete"
        color="warning"
        :show.sync="warningModal"
        @update:show="onDeleteConfirmation"
      >
        Are you sure you want to delete this {{ itemToDelete.code }} ?
      </CModal>
    </CCol>
  </CRow>
</template>

<script>
import TatApi from "../../lib/tatapi";

const items = [];

const fields = [
  { key: "id", _style: "min-width:200px;" },
  { key: "name", _style: "min-width:200px;" },
  { key: "advertiser", _style: "min-width:50px" },
  { key: "show_image", _style: "min-width:50px" },
  { key: "created_at", _style: "min-width:200px;" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];

export default {
  name: "AdsImageList",
  data() {
    return {
      items: items.map((item, id) => {
        return { ...item, id };
      }),
      fields,
      details: [],
      imageUrl: "",
      collapseDuration: 0,
      api: new TatApi(),
      warningModal: false,
      itemToDelete: {},
    };
  },
  mounted() {
    var self = this;
    self.refreshTable();
  },
  methods: {
    toggleDetails(item, index) {
      this.$set(this.items[index], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });

      // if (item._toggled) {
      //   var self = this;
      //   self.refreshImage(item.id);
      // }
    },
    refreshTable() {
      var self = this;
      self.api
        .getAdsImageList()
        .then((response) => {
          self.items = response.data;
          for (var i in self.items) {
            self.items[i].imageUrl = self.api.getAdsImageUrl(self.items[i].id);
          }
        })
        .catch(({ data }) => {
          self.toast("Error", data.message, "danger");
          // console.log(data);
        });
    },
    onEdit(item) {
      var self = this;
      self.$router.push({
        path: `/admin/image/${item.id}`,
      });
    },
    onDeleteConfirmation(status, evt, accept) {
      var self = this;
      if (accept) {
        this.api
          .deleteAdsImage(self.itemToDelete.id)
          .then((response) => {
            self.refreshTable();
          })
          .catch(({ data }) => {
            self.toast("Error", data.message, "danger");
            // console.log(data);
          });
      }
      self.itemToDelete = {};
    },
    showDeleteConfirmation(item) {
      var self = this;
      self.itemToDelete = item;
      self.warningModal = true;
    },
    addNew() {
      this.$router.push({ path: "/admin/image" });
    },
  },
};
</script>
