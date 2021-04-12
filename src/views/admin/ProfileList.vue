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
    </div>
    <div>
      <CRow>
        <CCol sm="12">
          <CCard>
            <CCardHeader> <strong> Profile </strong> List </CCardHeader>
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
            </template>
            -->
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
                        <p class="text-muted">Role: {{ item.role }}</p>
                        <!-- <p class="text-muted">System Id : {{ item.id }}</p>
                    <p class="text-muted">System User Id: {{ item.user_id }}</p> -->
                        <!-- <p class="text-muted">
                      Org. Name: {{ item.organization.name }}
                    </p>
                    <p class="text-muted">
                      Roles:
                    </p>
                    <ul id="example-1">
                      <li v-for="item in item.roleList" :key="item.id">
                        {{ item.name }}
                      </li>
                    </ul> -->
                        <CButton
                          size="sm"
                          color="info"
                          class="ml-1"
                          @click="onAddAdvertiser(item)"
                        >
                          Add Advertiser
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
    </div>
  </div>
</template>

<script>
import TatApi from "../../lib/tatapi";

const items = [];

const fields = [
  { key: "id", _style: "min-width:100px;" },
  { key: "email", _style: "min-width:100px;" },
  { key: "name", _style: "min-width:200px;" },
  { key: "phone", _style: "min-width:100px;" },
  { key: "role", _style: "min-width:200px;" },
  { key: "created_at", _style: "min-width:200px;" },
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
  name: "ProfileList",
  data() {
    return {
      items: items.map((item, id) => {
        return { ...item, id };
      }),
      infoList: [],
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
    toast(header, message, color) {
      var self = this;
      self.infoList.push({
        header: header,
        message: message,
        color: color,
      });
    },
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
        .getProfileList()
        .then((response) => {
          self.items = response.data;
          console.log(self.items);
        })
        .catch(({ data }) => {
          self.toast("Error", data.message, "danger");
          // console.log(data);
        });
    },
    onAddAdvertiser(item) {
      var self = this;
      self.$router.push({
        path: `/admin/advertiser/0/profile/${item.id}/email/${item.email}`,
      });
    },
    onEdit(item) {
      var self = this;
      self.$router.push({
        path: `/admin/profile/${item.id}`,
      });
    },
    onDeleteConfirmation(status, evt, accept) {
      var self = this;
      if (accept) {
        this.api
          .deleteProfile(self.itemToDelete.id)
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
      this.$router.push({ path: "/admin/profile" });
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
