<template>
  <CRow>
    <CCol sm="12">
      <CCard>
        <CCardHeader> <strong> Campaign </strong> List </CCardHeader>
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
            <!-- <template #status="{item}">
              <td>
                <CBadge :color="getBadge(item.status)">
                  {{ item.status }}
                </CBadge>
              </td>
            </template> -->
            <template #audience_name="{item}">
              <td>
                {{ item.audience.name }}
              </td>
            </template>
            <template #audience_location="{item}">
              <td>
                {{ item.audience.location }}
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
                    <p class="text-muted">
                      Advertiser Id: {{ item.advertiser_id }}
                    </p>
                    <p class="text-muted">
                      Advertiser Name: {{ item.advertiser.name }}
                    </p>
                    <p class="text-muted">
                      Audience Id: {{ item.audience.id }}
                    </p>
                    <p class="text-muted">
                      Audience Name: {{ item.audience.name }}
                    </p>
                    <p class="text-muted">Campaign Name: {{ item.name }}</p>
                    <p class="text-muted">
                      Total Walker: {{ item.total_walker }}
                    </p>
                    <p class="text-muted">Status: {{ item.status }}</p>
                    <p class="text-muted">Created At: {{ item.created_at }}</p>
                    <p class="text-muted">
                      Schedule:
                    </p>
                    <ul id="example-1">
                      <li
                        v-for="item in item.campaign_schedule_list"
                        :key="item.id"
                      >
                        From {{ item.start_at }} to {{ item.end_at }}
                      </li>
                    </ul>
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
          <!-- <p>
            NOTES: To add new campaign, you must go to profile list and show
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
        Are you sure you want to delete this {{ itemToDelete.name }} ?
      </CModal>
    </CCol>
  </CRow>
</template>

<script>
import TatApi from "../../lib/tatapi";

const items = [];

const fields = [
  { key: "name", _style: "min-width:200px;" },
  { key: "audience_id", _style: "min-width:200px;" },
  { key: "audience_name", _style: "min-width:200px;" },
  { key: "audience_location", _style: "min-width:200px;" },
  { key: "total_walker", _style: "min-width:200px;" },
  // { key: "profile_id", _style: "min-width:200px;" },
  // { key: "profile_email", _style: "min-width:200px;" },
  { key: "created_at", _style: "min-width:200px;" },
  // { key: "name", _style: "min-width:200px;" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];

export default {
  name: "CampaignList",
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
      self.api.getCampaignList().then((response) => {
        self.items = response.data;
        console.log(self.items);
      });
    },
    onEdit(item) {
      var self = this;
      self.$router.push({
        path: `/admin/campaign/${item.id}`,
      });
    },
    onDeleteConfirmation(status, evt, accept) {
      var self = this;
      if (accept) {
        this.api.deleteCampaign(self.itemToDelete.id).then((response) => {
          self.refreshTable();
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
      this.$router.push({ path: "/admin/campaign" });
    },
  },
};
</script>
