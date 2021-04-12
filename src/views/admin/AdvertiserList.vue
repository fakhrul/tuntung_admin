<template>
  <CRow>
    <CCol sm="12">
      <CCard>
        <CCardHeader> <strong> Advertiser </strong> List </CCardHeader>
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
            <template #profile_name="{item}">
              <td>
                {{ item.profile.name }}
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
                    <p class="text-muted">Id: {{ item.id }}</p>
                    <p class="text-muted">Owner Id: {{ item.profile_id }}</p>
                    <p class="text-muted">
                      Owner Email: {{ item.profile_email }}
                    </p>
                    <p class="text-muted">Organization Name: {{ item.name }}</p>
                    <p class="text-muted">Email: {{ item.email }}</p>
                    <p class="text-muted">Phone: {{ item.phone }}</p>
                    <p class="text-muted">Address:</p>
                    <p class="text-muted">{{ item.address1 }}</p>
                    <p class="text-muted">{{ item.address2 }}</p>
                    <p class="text-muted">{{ item.address3 }}</p>
                    <p class="text-muted">City: {{ item.city }}</p>
                    <p class="text-muted">Postcode: {{ item.postcode }}</p>
                    <p class="text-muted">State: {{ item.state }}</p>
                    <p class="text-muted">Country: {{ item.country }}</p>
                    <p class="text-muted">
                      Contact Person Name: {{ item.contact_name }}
                    </p>
                    <p class="text-muted">
                      Contact Person Email: {{ item.contact_email }}
                    </p>
                    <p class="text-muted">
                      Contact Person Phone: {{ item.contact_phone }}
                    </p>
                    <CButton
                      size="sm"
                      color="info"
                      class="ml-1"
                      @click="onAddCampaign(item)"
                    >
                      Add Campaign
                    </CButton>
                    <CButton
                      size="sm"
                      color="info"
                      class="ml-1"
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
          <!-- <p>
            NOTES: To add new advertiser, you must go to profile list and show
            details.
          </p> -->
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
  // { key: "profile_id", _style: "min-width:200px;" },
  { label: "Owner Name", key: "profile_name", _style: "min-width:200px;" },
  { label: "Owner Email", key: "profile_email", _style: "min-width:200px;" },
  { key: "name", _style: "min-width:200px;" },
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
  name: "AdvertiserList",
  data() {
    return {
      items: items.map((item, id) => {
        return { ...item, id };
      }),
      fields,
      details: [],
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
    },
    refreshTable() {
      var self = this;
      self.api
        .getAdvertiserList()
        .then((response) => {
          self.items = response.data;
        })
        .catch(({ data }) => {
          self.toast("Error", data.message, "danger");
          // console.log(data);
        });
    },
    onEdit(item) {
      var self = this;
      self.$router.push({
        path: `/admin/advertiser/${item.id}`,
      });
    },
    onDeleteConfirmation(status, evt, accept) {
      var self = this;
      if (accept) {
        this.api
          .deleteAdvertiser(self.itemToDelete.id)
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
    onAddCampaign(item) {
      var self = this;
      self.$router.push({
        path: `/admin/campaign/0/advertiser/${item.id}`,
      });
    },
    addNew() {
      this.$router.push({ path: "/admin/advertiser" });
    },
  },
};
</script>
